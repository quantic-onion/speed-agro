// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate mysql;
use mysql::*;
use mysql::prelude::*;
use serde::Serialize;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

#[derive(Debug, PartialEq, Eq, Serialize, FromRow)] // Deriva la trait FromRow
struct Record {
    id: i32,
    date_and_time: String, // Use String to store the datetime as a string, or use NaiveDateTime if you want to parse it.
    millitm: i32,
    tag_index: i32,
    val: String,
    status: String,
    marker: String,
}

#[tauri::command]
fn test_db() -> Result<Vec<Record>, String> { // Cambia el tipo de error a String
    // Define la URL de conexión a la base de datos
    let url = "mysql://root:root@localhost:3306/speed_agro";

    // Crea una conexión pool
    let pool = Pool::new(url).map_err(|e| e.to_string())?;

    // Obtén una conexión del pool
    let mut conn = pool.get_conn().map_err(|e| e.to_string())?;

    let rows: Vec<Row> = conn.query(r"SELECT * FROM descargas").map_err(|e| e.to_string())?;

    let descargas: Vec<Record> = rows.into_iter().map(|row| {
        Record {
            id: row.get("id").unwrap_or_default(),
            date_and_time: row.get("DateAndTime").unwrap_or_default(),
            millitm: row.get("Millitm").unwrap_or_default(),
            tag_index: row.get("TagIndex").unwrap_or_default(),
            val: row.get("Val").unwrap_or_default(),
            status: row.get("Status").unwrap_or_default(),
            marker: row.get("Marker").unwrap_or_default(),
        }
    }).collect();

    Ok(descargas)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_numbers, test_db])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}