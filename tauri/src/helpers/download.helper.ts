import ExcelJS from 'exceljs';
// types
import { LineNumber, ReportType } from '@/types/general.type';

type DataToExcel = any[];

export const downloadHelper = {
  async excel(rows: DataToExcel, reportType: ReportType, fileName: string, lineNumber: LineNumber) {
    if (!rows.length) {
      alert('No hay datos para descargar en ese periodo');
      return;
    }
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');
    const columns = Object.keys(rows[0]);
    // Agregar encabezados individuales
    setColumnTitles(worksheet, columns);
    // Agregar datos
    setRowsData(worksheet, columns, rows);
    // Ajustar el ancho de las columnas automáticamente
    setColumnsWidth(worksheet, columns, rows);
    // Agregar encabezados combinados
    setMainTitles(worksheet, reportType, lineNumber);
    // Guardar el archivo
    saveFile(workbook, fileName);
  },
}

function setColumnTitles(worksheet: ExcelJS.Worksheet, columns: string[]) {
  columns.forEach((col, index) => {
    worksheet.getCell(2, index + 1).value = col;
    worksheet.getCell(2, index + 1).alignment = { horizontal: 'center' };
  });
}
function setRowsData(worksheet: ExcelJS.Worksheet, columns: string[], rows: DataToExcel) {
  rows.forEach((row, rowIndex) => {
    columns.forEach((col, colIndex) => {
      const cell = worksheet.getCell(rowIndex + 3, colIndex + 1);
      cell.value = row[col];
      cell.alignment = { horizontal: 'center' };
    });
  });
}
function setColumnsWidth(worksheet: ExcelJS.Worksheet, columns: string[], rows: DataToExcel) {
  worksheet.columns = columns.map((col) => ({
    header: col,
    key: col,
    width: Math.max(col.length, ...rows.map((row) => (row[col] || '').toString().length)) + 2,
  }));
}
function setMainTitles(worksheet: ExcelJS.Worksheet, reportType: ReportType, lineNumber: LineNumber) {
  if (reportType === 'envasado') {
    worksheet.getCell('A1').value = `Envasado L${lineNumber}`;
    if (lineNumber === 1) {
      worksheet.mergeCells('B1:M1');
      worksheet.getCell('B1').value = 'ENVASADORA BIDONES';
      worksheet.getCell('N1').value = 'TAPADORA';
    }
    if (lineNumber === 2) {
      worksheet.mergeCells('B1:I1');
      worksheet.getCell('B1').value = 'ENVASADO';
      worksheet.mergeCells('J1:N1');
      worksheet.getCell('J1').value = 'TAPADORA';
      worksheet.mergeCells('O1:P1');
      worksheet.getCell('O1').value = 'ENCAJONADO';
      worksheet.mergeCells('Q1:S1');
      worksheet.getCell('Q1').value = 'PALETIZADO';
    }
    if (lineNumber === 3) {
      worksheet.mergeCells('B1:C1');
      worksheet.getCell('B1').value = 'ENCAJONADO';
      worksheet.mergeCells('D1:F1');
      worksheet.getCell('D1').value = 'PALETIZADO';
    }
  }
  if (reportType === 'formulador') {
    worksheet.getCell('A1').value = `ELABORACIÓN FORMULADOR ${lineNumber}`;
    worksheet.mergeCells('A1:G1');
    worksheet.mergeCells('D2:E2');
    worksheet.mergeCells('F2:G2');
  }

  // Centrar los encabezados
  ['A1', 'B1', 'D1', 'J1', 'N1', 'O1', 'Q1'].forEach((cell) => {
    worksheet.getCell(cell).alignment = { horizontal: 'center' };
  });
}

async function saveFile(workbook: ExcelJS.Workbook, fileName: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
}