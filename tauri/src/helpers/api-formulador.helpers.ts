import { DatabaseResponse, LineNumberFormulador } from '@/types/general.type';
import { connectDatabase, GetParams } from './api.helpers';
import { i18n } from '@/i18n/i18n';


class FormuladorDbItem {
  value = 0;
  date = '';
  tag_index = '';
  tag_name = '';

  constructor(rawData: any) {
    this.value = rawData[0] !== 'None' ? rawData[0] : '';
    this.tag_index = rawData[1];
    this.tag_name = rawData[2];
    this.date = rawData[3];
  }
}

export const apiFormuladorHelpers = {
  async getReportData(params: GetParams, line: LineNumberFormulador) {
    const database = `Datos_F0${line}`;
    const rawDataItems1 = await connectDatabase(database, 'FloatTable', params)
    const rawDataItems2 = await connectDatabase(database, 'StringTable', params)
    const dataItems = [
      // @ts-ignore
      ...rawDataItems1.map((item) => new FormuladorDbItem(item)),
      // @ts-ignore
      ...rawDataItems2.map((item) => new FormuladorDbItem(item)),
    ];
    console.log('dataItems', dataItems);
    const records = parseReportData(line, dataItems);
    console.log('records', records);
    return records;
  },
};

function parseReportData(line: LineNumberFormulador, dataItems: DatabaseResponse) {
  if (!dataItems.length) return [];
  const records = [];
  for (let i = 0; i < 20; i++) {
    const newRecord = parseFormuladorData(line, i, dataItems);
    records.push(newRecord);
  }
  return records;
}

export function parseFormuladorData(line: LineNumberFormulador, i: number, dataItems: DatabaseResponse) {
  const index = `${i}`.padStart(2, '0');
  console.log('TAG TO FIND', `[PLC_Ppal]Totalizador_F${line}[0${index}]`);
  const loteWeight = dataItems.find((item) => item.tag_name === `[PLC_Ppal]Totalizador_F${line}[${index}]`)?.value || 0;
  const queueWeight = 0;
  return {
    [i18n('step')]: i + 1,
    [i18n('product')]: dataItems.find((item) => item.tag_name === `[PLC_Ppal]Rotulo_F${line}[${index}]`)?.value || 'Sin rótulo',
    [i18n('pv')]: (loteWeight + queueWeight) || '',
    [i18n('lote_name')]: dataItems.find((item) => item.tag_name === `[PLC_Ppal]Lote_F${line}[${index}]`)?.value || '',
    [i18n('lote_quantity')]: loteWeight || '',
    [i18n('queue_name')]: '',
    [i18n('queue_quantity')]: queueWeight || '',
  };
}