import * as XLSX from 'xlsx';
// types
import { DatabaseResponse } from '@/types/general.type';

function prepareData(data: DatabaseResponse) {
  return data.map((item) => ({
    'Cantidad': item.total,
    'Descripción': item.tag_name
  }));
}

export const downloadHelper = {
  excel(data: DatabaseResponse, fileName: string) {    
    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();
    
    // Convertir JSON a una hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(prepareData(data));
    
    // Añadir la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    
    // Exportar el libro de trabajo a un archivo Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}