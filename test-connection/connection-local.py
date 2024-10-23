import pyodbc

# SETTINGS LICHA
server = 'LICHA-PC'
username = 'licha'
password = 'ZjWH4EtCdHK'
# SETTINGS SPEED AGRO
server = 'SERVER-PRO\\SQLEXPRESS'
username = 'produccion'
password = 'marinascada'

# HARDCODED
database = 'Datos_Envasado'
min_date = '2024-01-01'
max_date = '2024-12-12'

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

# Establecer la conexión
conn = None
try:
    conn = pyodbc.connect(connection_string)
    # Realizar operaciones con la base de datos
    cursor = conn.cursor()
    cursor.execute(query)
    row = cursor.fetchone()
    while row:
        print(row)
        row = cursor.fetchone()

    # Cerrar la conexión
    conn.close()
except Exception as e:
    print(f"Error al conectar: {e}")


