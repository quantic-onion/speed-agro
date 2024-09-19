export type ReportType = 'descargas' | 'envasado' | 'formulador';
export type TsDatetime = string;
export type ConstructorParams<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K; }[keyof T]>;


export type DatabaseResponseItem = {
  total: number;
  tag_index: number;
  tag_name: string;
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