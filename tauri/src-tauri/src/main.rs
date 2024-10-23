// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use futures::stream::StreamExt;
use tiberius::{AuthMethod, Config, Client};
use tokio::net::TcpStream;
use tokio_util::compat::TokioAsyncWriteCompatExt;
use std::collections::HashMap;
use serde::Serialize;
use pyo3::prelude::*;
use pyo3::wrap_pyfunction;
use tauri::command;

#[tauri::command]
async fn greet(name: String) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

#[derive(Debug, Serialize)]
struct DataItem {
    total: f64,
    tag_index: i16,
    tag_name: String,
}

#[tauri::command]
async fn fetch_data(
    host: String,
    port: u16,
    instance: String,
    user: String,
    pass: String,
    database: String,
    min_date: String,
    max_date: String,
) -> Result<Vec<DataItem>, String> {
    // Configure the connection to SQL Server using Windows Authentication
    // let mut config = Config::new();

    // LOCAHOST
    // config.host("Localhost");
    // config.instance_name("SQLEXPRESS");
    // config.authentication(AuthMethod::Integrated);

    // LICHA
    // config.host("LICHA-PC");
    // config.instance_name("SQLEXPRESS");
    // config.authentication(AuthMethod::sql_server("licha", "ZjWH4EtCdHK&amp;lFPRfqp#MKd___"));

    // SPEED AGRO
    // config.host("SERVER-PRO"); // or 192.168.0.47
    // config.instance_name("SQLEXPRESS");
    // config.authentication(AuthMethod::sql_server("produccion", "marinascada"));

    // DYNAMIC
    // config.host(host);
    // config.instance_name(instance);
    // config.authentication(AuthMethod::sql_server(user, pass));

    // every connection
    // config.port(1433);
    // config.trust_cert();
    
    
    let CONN_STR_PORT = "server=tcp:SERVER-PRO\\SQLEXPRESS,1433;database=Datos_Envasado;user id=produccion;password=marinascada;TrustServerCertificate=true";
    // let CONN_STR_PORT = "server=tcp:SERVER-PRO\\SQLEXPRESS,1433;database=Datos_Envasado;IntegratedSecurity=true;TrustServerCertificate=true";
    // let CONN_STR_PORT = "server=tcp:LICHA-PC\\SQLEXPRESS,1433;database=Datos_Envasado;IntegratedSecurity=true;TrustServerCertificate=true";

    let config = Config::from_ado_string(&CONN_STR_PORT).map_err(|e| e.to_string())?;
    // let config = Config::from_ado_string(&CONN_STR_PORT)?;
    // Establish the TCP connection
    // let connection_string = config.get_addr();
    // let connection_string = "SERVER-PRO\\SQLEXPRESS:1433";
    // let tcp = TcpStream::connect(config.get_addr()).await.map_err(|e| format!("Failed to connect: {} - {}", connection_string, e))?;
    
    let tcp = TcpStream::connect(config.get_addr()).await.map_err(|e| format!("Failed to connect: {}", e))?;
    let tcp = tcp.compat_write();

    // Create the client
    let mut client = Client::connect(config, tcp).await.map_err(|e| format!("Failed to create client: {}", e))?;

    // The query you want to run
    let query = format!(r#"
        SELECT TOP (1000)
            SUM([Val]) AS 'Total'
            ,[TagTable].[TagIndex]
            ,[TagTable].[TagName]
        FROM [{}].[dbo].[FloatTable]
        INNER JOIN [{}].[dbo].[TagTable] ON [TagTable].[TagIndex] = [FloatTable].[TagIndex]
        WHERE
            CAST([DateAndTime] AS DATE) >= '{}'
            AND CAST([DateAndTime] AS DATE) <= '{}'
        GROUP BY [TagTable].[TagName], [TagTable].[TagIndex]
        ORDER BY Total DESC
    "#, database, database, min_date, max_date);

    // Execute the query and collect results
    let mut stream = client.simple_query(query).await.map_err(|e| format!("Failed to execute query: {}", e))?;
    let mut results = Vec::new();

    // Collect the first 10 rows (if available)
    while let Some(item) = stream.next().await {
        match item {
            Ok(tiberius::QueryItem::Row(row)) => {
                // Crear un HashMap para cada fila
                // let mut map = HashMap::new();
                
                // Extraer los valores de las columnas y añadirlos al HashMap
                let total: f64 = row.try_get::<f64, _>(0)
                    .map_err(|e| format!("Error al obtener Total: {}", e))?
                    .unwrap_or_default(); // Maneja el caso donde sea None
                let tag_index: i16 = row.try_get::<i16, _>(1)
                    .map_err(|e| format!("Error al obtener TagIndex: {}", e))?
                    .unwrap_or_default(); // Maneja el caso donde sea None
                let tag_name: &str = row.try_get::<&str, _>(2)
                    .map_err(|e| format!("Error al obtener TagName: {}", e))?
                    .unwrap_or_default(); // Maneja el caso donde sea None

                // Agregar los valores al HashMap con los nombres de las columnas como claves
                // map.insert("Millitm".to_string(), millitm);
                // map.insert("Val".to_string(), val);

                let data_item = DataItem {
                    total: total,
                    tag_index: tag_index,
                    tag_name: tag_name.to_string(),
                };

                // Añadir el HashMap al resultado
                results.push(data_item);
            }
            Ok(_) => {
                // Handle any other possible QueryItem, such as Metadata
            }
            Err(e) => {
                return Err(format!("Error fetching row: {}", e));
            }
        }
    }

    Ok(results)
}


#[pyfunction]
fn get_random_number_from_python() -> PyResult<i32> {
    Python::with_gil(|py| {
        let py_module = PyModule::from_code(
            py,
            r#"
import random

def get_random_number():
    return random.randint(1, 100)
            "#,
            "",
            "",
        )?;

        let get_random_number = py_module.getattr("get_random_number")?;
        let result = get_random_number.call0()?.extract::<i32>()?;
        Ok(result)
    })
}

#[tauri::command]
fn generate_random_number() -> i32 {
    // Attempt to call the Python function and log errors if any
    match get_random_number_from_python() {
        Ok(number) => number,
        Err(e) => {
            // Log the error message
            println!("PYTHON ERROR: {:?}", e);
            3333 // Fallback to 0 in case of error
        }
    }
}

// #[tauri::command]
// fn add_numbers(a: i32, b: i32) -> i32 {
//     a + b
// }

#[tokio::main]
async fn main() {
    // Initialize the Python interpreter for multi-threaded use
    pyo3::prepare_freethreaded_python();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_numbers, fetch_data, generate_random_number])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
