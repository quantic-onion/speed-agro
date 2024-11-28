import { storeToRefs } from 'pinia';
import { invoke } from '@tauri-apps/api/tauri';
// helpers
import { downloadHelper } from '@/helpers/download.helper';
import { apiEnvasadoHelpers } from '@/helpers/api-envasado.helpers';
import { apiFormuladorHelpers } from './api-formulador.helpers';
import { queryHelpers } from './query.helpers';
// types
import { ReportType } from '@/types/general.type';
// stores
import { useDataToReport } from '@/stores/data-to-report';
// i18n
import { separatedHourMinuteAndSecond } from '@/i18n/i18n';
import { Table } from '@/helpers/query.helpers'
export type GetParams = {
  minDate: string;
  maxDate: string;
}

export const apiHelpers = {
  async downloadReport(reportType: ReportType, params: GetParams, fileName: string) {
    const { selectedLineNumber } = storeToRefs(useDataToReport());
    try {
      // @ts-ignore
      let result = [];
      console.log('reportType', reportType);
      // @ts-ignore
      if (reportType === 'envasado') result = await apiEnvasadoHelpers.getReportData(params, selectedLineNumber.value);
      if (reportType === 'formulador') result = await apiFormuladorHelpers.getReportData(params, selectedLineNumber.value);
    // @ts-ignore
      downloadHelper.excel(result, reportType, fileName, selectedLineNumber.value);
    } catch (err) {
      console.log('JS ERROR', err);
    }
  },
};

export async function connectDatabase(database: string, table: Table, params: GetParams) {
  let jsonString = '';
  try {
    const query = queryHelpers.createQuery(database, table, params.minDate, params.maxDate)
    console.log('query', query);
    jsonString = await invoke('fetch_data', { query });
    return JSON.parse(jsonString);
  } catch (error) {
    alert('ERROR: ' + error + '.\n\nJSON: ' + jsonString);
    console.error('Error al llamar a la función de Tauri:', error);
  }
}

export function parseValueFromDb(key: string, dataItems: { [key: string]: any }): number | string {
  if (!key || !dataItems) return 0;
  if (separatedHourMinuteAndSecond.includes(key)) return getHourMinAndSecondsByRegister(key, dataItems);
  // @ts-ignore
  return dataItems[key];
}
function getHourMinAndSecondsByRegister(key: string, data: any) {
  if (key === '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Operadora') {
    console.log('DATA', data);
  }
  let hours = data[`${key}[2]`];
  let minutes = data[`${key}[1]`];
  let seconds = data[`${key}[0]`];
  if (seconds >= 60) {
    seconds = seconds % 60;
    minutes += Math.floor(seconds / 60);
  }
  if (minutes >= 60) {
    minutes = minutes % 60;
    hours += Math.floor(minutes / 60);
  }
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);
  minutes = `${minutes}`.padStart(2, '0');
  seconds = `${seconds}`.padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
