import pyodbc

# Definir los parámetros de conexión
server = 'SERVER-PRO\\SQLEXPRESS'
database = 'Datos_Envasado'
username = 'produccion'
password = 'marinascada'

# Crear la cadena de conexión
connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password};TrustServerCertificate=yes'
# Establecer la conexión
try:
    conn = pyodbc.connect(connection_string)
    print("Conexión exitosa")
except Exception as e:
    print(f"Error al conectar: {e}")

# Realizar operaciones con la base de datos
cursor = conn.cursor()
cursor.execute("SELECT @@version;")
row = cursor.fetchone()
while row:
    print(row)
    row = cursor.fetchone()

# Cerrar la conexión
conn.close()

