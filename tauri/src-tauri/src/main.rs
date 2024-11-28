// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use pyo3::prelude::*;

#[pyfunction]
fn get_database_data(query: String) -> PyResult<String> {
    Python::with_gil(|py| {
        let py_module = PyModule::from_code(
            py,
            r#"
import pyodbc
import json

# SETTINGS LICHA
# server = 'LICHA-PC'
# username = 'licha'
# password = 'ZjWH4EtCdHK'
# SETTINGS SPEED AGRO
server = 'SERVER-PRO\\SQLEXPRESS'
username = 'produccion'
password = 'marinascada'


# Establecer la conexión
def run_query(query):
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
            # result.append(row)
            item = {}
            for n in range(len(row)):
                item[n] = str(row[n])
            result.append(item)
            # result.append({
            #     "value": row[0],
            #     "tag_index": row[1],
            #     "tag_name": row[2],
            #     "date": str(row[3]),
            # })
            row = cursor.fetchone()
        # Cerrar la conexión
        conn.close()
    except Exception as e:
        print(f"Error al conectar: {e}")
        return e
    # return
    return str(json.dumps(result))
            "#,
            "",
            "",
        )?;

        let run_query = py_module.getattr("run_query")?;
        let result = run_query.call1((query,))?;
        Ok(result.to_string())
    })
}

#[tauri::command]
fn fetch_data(query: String) -> String {
    // Attempt to call the Python function and log errors if any
    match get_database_data(query) {
        Ok(res) => res,
        Err(e) => {
            // Log the error message
            println!("PYTHON ERROR: {:?}", e);
            format!("PYTHON_ERROR: {}", e) // Fallback to 0 in case of error
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
