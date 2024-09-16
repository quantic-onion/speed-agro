// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use futures::stream::StreamExt;
use tiberius::{AuthMethod, Config, Client};
use tokio::net::TcpStream;
use tokio_util::compat::TokioAsyncWriteCompatExt;

#[tauri::command]
async fn greet(name: String) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

#[tauri::command]
async fn fetch_data() -> Result<Vec<i16>, String> {
    // Configure the connection to SQL Server using Windows Authentication
    let mut config = Config::new();
    config.host("Licha-PC");  // Localhost since you are connecting to a local instance
    config.port(1433);         // Default SQL Server port
    config.instance_name("SQLEXPRESS"); // Your SQL Server Express instance name

    config.authentication(AuthMethod::Integrated);
    config.trust_cert();       // Trust certificate for secure connection
    
    // The database to connect to
    // config.database("Datos_Envasado");

    // Establish the TCP connection
    let tcp = TcpStream::connect(config.get_addr()).await.map_err(|e| format!("Failed to connect: {}", e))?;
    let tcp = tcp.compat_write();

    // Create the client
    let mut client = Client::connect(config, tcp).await.map_err(|e| format!("Failed to create client: {}", e))?;

    // The query you want to run
    let query = "SELECT TOP (10) [Millitm] FROM [Datos_Envasado].[dbo].[FloatTable]";
    // let query = "SELECT name FROM sys.databases;";
    // let query = "SELECT [permission_name] FROM sys.fn_my_permissions(NULL, 'SERVER');";
    // let query = "SELECT @@SERVERNAME;";

    // Execute the query and collect results
    let mut stream = client.simple_query(query).await.map_err(|e| format!("Failed to execute query: {}", e))?;
    let mut results = Vec::new();

    // Collect the first 10 rows (if available)
    while let Some(item) = stream.next().await {
        match item {
            Ok(tiberius::QueryItem::Row(row)) => {
                // Extract the value from the first column (index 0)
                if let Some(value) = row.try_get::<i16, _>(0).map_err(|e| format!("Error getting value: {}", e))? {
                    results.push(value);
                    // results.push(value.to_string());
                }
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

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_numbers, fetch_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
