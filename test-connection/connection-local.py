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



# HARDCODED
database = 'Datos_Envasado'
min_date = '2024-01-01'
max_date = '2024-12-12'
print(run_query(database, min_date, max_date))