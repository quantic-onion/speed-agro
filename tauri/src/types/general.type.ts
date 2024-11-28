export type ReportType = 'consumos' | 'envasado' | 'formulador';
export type TsDate = string;
export type TsDatetime = string;
export type ConstructorParams<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K; }[keyof T]>;

export type LineNumberEnvasado = 1 | 2 | 3;
export type LineNumberFormulador = 1 | 2 | 3 | 4;
export type LineNumber = LineNumberEnvasado | LineNumberFormulador;

export type DatabaseResponseItem = {
  value: number;
  tag_index: number;
  tag_name: string;
  date: TsDate;
}
export type DatabaseResponse = DatabaseResponseItem[];

export class GeneralRecord {
  id = 0;
	DateAndTime: TsDatetime | null = null;
	Millitm = 0;
	TagIndex = 0;
	Val = '';
	Status = '';
	Marker = '';

  constructor(params: ConstructorParams<GeneralRecord>) {
    const keys = Object.keys(params) as (Exclude<keyof typeof GeneralRecord, 'prototype'>)[];
    keys.forEach((key) => {
      this[key] = params[key];
    });
  }
}