import { invoke } from '@tauri-apps/api/tauri';
// helpers
import { downloadHelper } from '@/helpers/download.helper';
// types
import { ReportType } from '@/types/general.type';
import { DatabaseResponse } from '@/types/general.type';
type GetParams = {
  minDate: string;
  maxDate: string;
}

function getDatabaseName(reportType: ReportType) {
  if (reportType === 'descargas') return 'Descarga';
  if (reportType === 'envasado') return 'Datos_Envasado';
  if (reportType === 'formulador') return 'Datos_TKs';
  return '';
}

export const apiHelpers = {
  async getAndDownload(reportType: ReportType, params: GetParams, fileName: string) {
    try {
      const database = getDatabaseName(reportType);
      const apiParams = {
        database,
        minDate: params.minDate,
        maxDate: params.maxDate,
      }
      const response = await invoke('fetch_data', apiParams) as DatabaseResponse;
      downloadHelper.excel(response, fileName);
    } catch (error) {
      alert(error);
      console.error('Error al llamar a la función de Tauri:', error);
    }
  },
};
