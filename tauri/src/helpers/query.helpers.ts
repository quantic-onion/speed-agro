export type Table = 'FloatTable' | 'StringTable';

export const queryHelpers = {
  createQuery(database: string, table: Table, minDate: string, maxDate: string) {
    return `SELECT TOP (1000)
      ${getQuerySelect(table)}
      FROM [${database}].[dbo].[${table}]
      INNER JOIN [${database}].[dbo].[TagTable] ON [TagTable].[TagIndex] = [${table}].[TagIndex]
      WHERE
          CAST([DateAndTime] AS DATE) >= '${minDate}'
          AND CAST([DateAndTime] AS DATE) <= '${maxDate}'
      ${getQueryGroupBy(table)}
      ORDER BY CAST([DateAndTime] AS DATE) DESC`
  },
};

function getQuerySelect(table: Table) {
  if (table === 'StringTable') {
    return `
      [${table}].[Val] AS 'Value'
      ,[TagTable].[TagIndex]
      ,[TagTable].[TagName]
      ,CAST([DateAndTime] AS DATE) AS Date
    `;
  }
  return `
    SUM([Val]) AS 'Value'
    ,[TagTable].[TagIndex]
    ,[TagTable].[TagName]
    ,CAST([DateAndTime] AS DATE) AS Date
  `;
}
function getQueryGroupBy(table: Table) {
  if (table === 'StringTable') return '';
  return `
    GROUP BY
    CAST([DateAndTime] AS DATE),
    [TagTable].[TagName],
    [TagTable].[TagIndex]`
  ;
}