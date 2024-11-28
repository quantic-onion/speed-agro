import { LineNumberEnvasado } from '@/types/general.type';
import { i18nTextTranslations } from '@/i18n/i18n';

// ENVASADO
const keysEnvasadoLine1 = [
  'Reg_Envasadora_1.Receta_Bidones_1',
  'Reg_Envasadora_1.Receta_Bidones_2',
  'Reg_Envasadora_1.Receta_Bidones_3',
  'Reg_Envasadora_1.Receta_Bidones_4',
  'Reg_Envasadora_1.Receta_Bidones_5',
  'Reg_Envasadora_1.Receta_Bidones_6',
  'Reg_Envasadora_1.Receta_Bidones_7',
  'Reg_Envasadora_1.Receta_Bidones_8',
  'Reg_Envasadora_1.Receta_Bidones_9',
  'Reg_Envasadora_1.Receta_Bidones_10',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Marcha',
  'Reg_Envasadora_1.T_Falla',
  'Reg_Envasadora_1.Bidones_Tapados',
] as const;
const keysEnvasadoLine2 = [
  // envasadora
  '[PLC_Ppal]Reg_Envasadora_2[00].Cta_Produccion',
  '[PLC_Ppal]Reg_Envasadora_2[00].Vel_Promedio',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Marcha',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Operadora',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Lavado',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Nivel_Prod',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Derrame',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Falla',
  // tapadora
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Tapadas',
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Descarte',
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Mal_Tapadas',
  '[PLC_Ppal]Reg_Tapadora[00].T_Marcha',
  '[PLC_Ppal]Reg_Tapadora[00].T_Parada_Falla',
  // encajonado
  '[PLC_Ppal]Reg_Encajonado[00].Encajonado_L1',
  '[PLC_Ppal]Reg_Encajonado[00].Descarte_L1',
  // paletizado
  '[PLC_Ppal]Reg_Paletizado[00].Cajas_L1',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Nacional_L1',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Exportacion_L1',
] as const;
const keysEnvasadoLine3 = [
  // encajonado
  '[PLC_Ppal]Reg_Encajonado[00].Encajonado_L2',
  '[PLC_Ppal]Reg_Encajonado[00].Descarte_L2',
  // paletizado
  '[PLC_Ppal]Reg_Paletizado[00].Cajas_L2',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Nacional_L2',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Exportacion_L2',
] as const;

export type KeysOfRecordEnvasado = typeof keysEnvasadoLine1[number] | typeof keysEnvasadoLine2[number] | typeof keysEnvasadoLine1[number];
export type RecordEnvasado = {
  [key in i18nTextTranslations]?: number | string;
};

export function getReportKeysDatosEnvasado(line: LineNumberEnvasado) {
  if (line === 1) return [...keysEnvasadoLine1];
  if (line === 2) return [...keysEnvasadoLine2];
  if (line === 3) return [...keysEnvasadoLine3];
  return [];
}




// FORMULADOR
const keysFormulador = [
  'step',
  'product',
  'duration',
  'sp',
  'pv',
  'lote_name',
  'lote_quantity',
  'queue_name',
  'queue_quantity',
] as const;

export type KeysOfRecordFormulador = typeof keysFormulador[number];
export type RecordFormulador = {
  [key in keyof KeysOfRecordFormulador]: number;
};
export function getReportColumnsFormulador() {
  return keysFormulador;
}
