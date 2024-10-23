const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'produccion',
    password: 'marinascada',
    server: 'SERVER-PRO\\SQLEXPRESS',
    database: 'Datos_Envasado',
    options: {
        trustServerCertificate: true // Deshabilitar la verificación de SSL
    }
};

// Función para conectar y realizar una consulta
async function connectAndQuery() {
    try {
        // Conectar a la base de datos
        let pool = await sql.connect(config);
        console.log("Conexión exitosa");

        // Realizar una consulta
        let result = await pool.request().query('SELECT @@version');
        console.log(result.recordset);

        // Cerrar la conexión
        await pool.close();
    } catch (err) {
        console.error('Error al conectar:', err);
    }
}

// Ejecutar la función
connectAndQuery();