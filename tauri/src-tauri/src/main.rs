// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use pyo3::prelude::*;

#[pyfunction]
fn get_database_data(database: String, min_date: String, max_date: String) -> PyResult<String> {
    Python::with_gil(|py| {
        let py_module = PyModule::from_code(
            py,
            r#"
import pyodbc
import json

# SETTINGS LICHA
server = 'LICHA-PC'
username = 'licha'
password = 'ZjWH4EtCdHK'
# SETTINGS SPEED AGRO
# server = 'SERVER-PRO\\SQLEXPRESS'
# username = 'produccion'
# password = 'marinascada'


# Establecer la conexión
def run_query(database, min_date, max_date):
    # HARDCODED
    # database = 'Datos_Envasado'
    # min_date = '2024-01-01'
    # max_date = '2024-12-12'

    query = f"""
    SELECT TOP (1000)
        SUM([Val]) AS 'Total'
        ,[TagTable].[TagIndex]
        ,[TagTable].[TagName]
    FROM [{database}].[dbo].[FloatTable]
    INNER JOIN [{database}].[dbo].[TagTable] ON [TagTable].[TagIndex] = [FloatTable].[TagIndex]
    WHERE
        CAST([DateAndTime] AS DATE) >= '{min_date}'
        AND CAST([DateAndTime] AS DATE) <= '{max_date}'
    GROUP BY [TagTable].[TagName], [TagTable].[TagIndex]
    ORDER BY Total DESC
    """

    connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};UID={username};PWD={password};TrustServerCertificate=yes'

    conn = None
    result = []
    try:
        conn = pyodbc.connect(connection_string)
        # Realizar operaciones con la base de datos
        cursor = conn.cursor()
        cursor.execute(query)
        row = cursor.fetchone()
        while row:
            # print("ROW", row)
            result.append({
                "total": row[0],
                "tag_index": row[1],
                "tag_name": row[2],
            })
            row = cursor.fetchone()
        # Cerrar la conexión
        conn.close()
    except Exception as e:
        print(f"Error al conectar: {e}")
    # return
    return str(json.dumps(result))
            "#,
            "",
            "",
        )?;

        let run_query = py_module.getattr("run_query")?;
        let result = run_query.call1((database, min_date, max_date))?;
        Ok(result.to_string())
    })
}

#[tauri::command]
fn fetch_data(
    // host: String,
    // port: u16,
    // instance: String,
    // user: String,
    // pass: String,
    database: String,
    min_date: String,
    max_date: String,
) -> String {
    // Attempt to call the Python function and log errors if any
    match get_database_data(database, min_date, max_date) {
        Ok(res) => res,
        Err(e) => {
            // Log the error message
            println!("PYTHON ERROR: {:?}", e);
            "[]".to_string() // Fallback to 0 in case of error
        }
    }
}


#[tokio::main]
async fn main() {
    // Initialize the Python interpreter for multi-threaded use
    pyo3::prepare_freethreaded_python();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
