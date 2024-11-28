// types
import { DatabaseResponse, TsDate, LineNumberEnvasado } from '@/types/general.type';
import { getReportKeysDatosEnvasado, RecordEnvasado } from '@/helpers/report.helpers';
import { i18n, parseKey } from '@/i18n/i18n';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';
import { connectDatabase, GetParams, parseValueFromDb } from '@/helpers/api.helpers';


class EnvasadoDbItem {
  value = 0;
  date = '';
  tag_index = '';
  tag_name = '';

  constructor(rawData: any) {
    this.value= rawData[0];
    this.tag_index= rawData[1];
    this.tag_name= rawData[2];
    this.date= rawData[3];
  }
}

export const apiEnvasadoHelpers = {
  async getReportData(params: GetParams, line: LineNumberEnvasado) {
    const database = line === 1 ? 'Datos_TKs' : 'Datos_Envasado';
    const rawDataItems = await connectDatabase(database, 'FloatTable', params);
      // @ts-ignore
    const dataItems = rawDataItems.map((item) => new EnvasadoDbItem(item));
    const filteredDataItems = filterDataItems(line, dataItems);
    const records = getRecordsByDay(line, filteredDataItems);
    console.log('records', records);
    return records;
  },
};

function getRecordsByDay(line: LineNumberEnvasado, dataItems: DatabaseResponse) {
  const records: RecordEnvasado[] = [];
  const allDates = [...new Set(dataItems.map((item) => item.date))];
  const allowedKeys = getReportKeysDatosEnvasado(line);
  allDates.forEach((date) => {
    const allDataItemsForDate = getDataItemsByDate(dataItems, date);
    const newRecord: RecordEnvasado = { [i18n('date')]: dateHelpers.presentDate(date) };
    allowedKeys.forEach((key) => {
      newRecord[i18n(key)] = parseValueFromDb(key, allDataItemsForDate) || 0;
    });
    records.push(newRecord);
  });
  return records;
}
function getDataItemsByDate(dataItems: DatabaseResponse, date: TsDate) {
  const dataItemsFiltered = dataItems.filter((item) => item.date === date);
  const result: { [key: string]: number; } = {};
  dataItemsFiltered.forEach((item) => {
    // @ts-ignore
    result[item.tag_name] = item.value;
  });
  return result;
}
function filterDataItems(line: LineNumberEnvasado, dataItems: DatabaseResponse) {
  const allowedKeys = getReportKeysDatosEnvasado(line);
  return dataItems.filter((item) => {
    const tagName = parseKey(item.tag_name, line);
    return (allowedKeys as string[]).includes(tagName);
  });
}
