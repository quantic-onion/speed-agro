import { invoke } from '@tauri-apps/api/tauri';
import { storeToRefs } from 'pinia';
// helpers
import { downloadHelper } from '@/helpers/download.helper';
// types
import { ReportType } from '@/types/general.type';
import { DatabaseResponse } from '@/types/general.type';
// stores
import { useDataToReport } from '@/stores/data-to-report';

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
      // const { instanceSettings } = storeToRefs(useDataToReport());
      const database = getDatabaseName(reportType);
      const apiParams = {
        // ...instanceSettings.value,
        database,
        minDate: params.minDate,
        maxDate: params.maxDate,
      }
      // if (!apiParams.port) apiParams.port = 0;
      // const response = await invoke('fetch_data', apiParams) as DatabaseResponse;
      console.log('apiParams', apiParams);
      const jsonString: string = await invoke('fetch_data', apiParams);
      const response = JSON.parse(jsonString);
      console.log('DATABASE DATA:', response)
      downloadHelper.excel(response, fileName);
    } catch (error) {
      alert(error);
      console.error('Error al llamar a la función de Tauri:', error);
    }
  },
};
