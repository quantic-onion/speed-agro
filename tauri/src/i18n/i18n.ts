import { LineNumber } from '@/types/general.type';

const i18nText = {
  'date': 'Fecha',
  // descargas
  '[PLC_Ppal]HMI_SP_Lts_Descargar': '',
  '::[PLC_Ppal]Program:MainProgram.PV_Tiempo_Descarga[1]': '',
  '::[PLC_Ppal]Program:MainProgram.PV_Tiempo_Descarga[0]': '',
  '[PLC_Ppal]Carga_TK_Destino': '',
  '::[PLC_Ppal]Program:MainProgram.PV_Tiempo_Descarga[2]': '',
  // ENVASADORA
  '[PLC_Ppal]Reg_Envasadora_2[00].Cta_Produccion': 'Botellas dosificadas',
  '[PLC_Ppal]Reg_Envasadora_2[00].Vel_Promedio': 'Vel Prom (Env/Hora)',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Marcha': 'Tiempo de marcha',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Operadora': 'Paradas por operador',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Lavado': 'Paradas por emergencia',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Nivel_Prod': 'Paradas por Bajo nivel prod',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Derrame': 'Paradas por derrame',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Falla': 'Paradas por falla de máquina',
  // TAPADORA
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Tapadas': 'Botellas tapadas',
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Descarte': 'Botellas descartadas',
  '[PLC_Ppal]Reg_Tapadora[00].Bot_Mal_Tapadas': 'Botellas mal tapadas',
  '[PLC_Ppal]Reg_Tapadora[00].T_Marcha': 'Tiempo de marcha ', // this space at the end is due the key is duplicate
  '[PLC_Ppal]Reg_Tapadora[00].T_Parada_Falla': 'Paradas por falla de máquina ', // this space at the end is due the key is duplicate
  // ENCAJONADO
  '[PLC_Ppal]Reg_Encajonado[00].Encajonado_L1': 'Cajas producidas',
  '[PLC_Ppal]Reg_Encajonado[00].Encajonado_L2': 'Cajas producidas',
  '[PLC_Ppal]Reg_Encajonado[00].Descarte_L1': 'Cajas descartadas',
  '[PLC_Ppal]Reg_Encajonado[00].Descarte_L2': 'Cajas descartadas',
  // PALETIZADO
  '[PLC_Ppal]Reg_Paletizado[00].Cajas_L1': 'Cajas Paletizadas',
  '[PLC_Ppal]Reg_Paletizado[00].Cajas_L2': 'Cajas Paletizadas',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Nacional_L1': 'Paleta Dest. Nacional',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Nacional_L2': 'Paleta Dest. Nacional',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Exportacion_L1': 'Paleta Dest. Internacional',
  '[PLC_Ppal]Reg_Paletizado[00].Palet_Exportacion_L2': 'Paleta Dest. Internacional',
  // BIDONES
  'Reg_Envasadora_1.Receta_Bidones_1': 'Bidones Receta 1',
  'Reg_Envasadora_1.Receta_Bidones_2': 'Bidones Receta 2',
  'Reg_Envasadora_1.Receta_Bidones_3': 'Bidones Receta 3',
  'Reg_Envasadora_1.Receta_Bidones_4': 'Bidones Receta 4',
  'Reg_Envasadora_1.Receta_Bidones_5': 'Bidones Receta 5',
  'Reg_Envasadora_1.Receta_Bidones_6': 'Bidones Receta 6',
  'Reg_Envasadora_1.Receta_Bidones_7': 'Bidones Receta 7',
  'Reg_Envasadora_1.Receta_Bidones_8': 'Bidones Receta 8',
  'Reg_Envasadora_1.Receta_Bidones_9': 'Bidones Receta 9',
  'Reg_Envasadora_1.Receta_Bidones_10': 'Bidones Receta 10',
  'Reg_Envasadora_1.T_Marcha': 'Tiempo de marcha  ', // this spaces at the end is due the key is duplicate
  'Reg_Envasadora_1.T_Falla': 'Tiempo en falla  ', // this spaces at the end is due the key is duplicate
  'Reg_Envasadora_1.Bidones_Tapados': 'Bidones tapados',
  // FORMULADOR
  'step': 'Paso',
  'product': 'Producto',
  'duration': 'Durac.',
  'sp': 'SP',
  'pv': 'PV',
  'lote_name': 'Lote',
  'lote_quantity': ' ',
  'queue_name': 'Cola',
  'queue_quantity': '  ',
} as const;

export type i18nTextTranslations = (typeof i18nText)[keyof typeof i18nText];

export function i18n(key: keyof typeof i18nText) {
  const translation = i18nText[key];
  if (!translation) throw new Error('MISSING I18N KEY: ' + key);
  return translation;
}

export function parseKey(key: string, line: LineNumber) {
  if (key.endsWith('[0]') || key.endsWith('[1]') || key.endsWith('[2]')) {
    return key.substring(0, key.length - 3);
  }
  if (key.startsWith(`[PLC_Ppal]Totalizador_F${line}`)) key = key.replace(`F${line}`, '');
  if (key.startsWith(`[PLC_Ppal]Rotulo_F${line}`)) key = key.replace(`F${line}`, '');
  if (key.startsWith(`[PLC_Ppal]RecetaUltima_TK_F${line}`)) key = key.replace(`F${line}`, '');
  if (key.startsWith(`[PLC_Ppal]Lote_F${line}`)) key = key.replace(`F${line}`, '');
  return key;
}

export const separatedHourMinuteAndSecond = [
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Marcha',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Operadora',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Lavado',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Nivel_Prod',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Derrame',
  '[PLC_Ppal]Reg_Envasadora_2[00].T_Parada_Falla',
  '[PLC_Ppal]Reg_Tapadora[00].T_Marcha',
  '[PLC_Ppal]Reg_Tapadora[00].T_Parada_Falla',
];
