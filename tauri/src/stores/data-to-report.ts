import { defineStore } from 'pinia'
// types
import type { LineNumber, ReportType } from '@/types/general.type';
import type { Descarga } from '@/types/descarga.model';
import type { Envasado } from '@/types/envasado.model';
import type { Formulador } from '@/types/formulador.model';

type InstanceSettings = {
  host: string;
  port: number;
  instance: string;
  user: string;
  pass: string;
};

interface State {
  selectedLineNumber: LineNumber;
  selectedReportType: ReportType;
  loadingQuantity: number;
  consumos: Descarga[];
  envasado: Envasado[];
  formulador: Formulador[];
  instanceSettings: InstanceSettings;
}

const defaultInstanceSettings: InstanceSettings = {
  // LOCALHOST
  // host: 'LICHA-PC',
  // port: 1433,
  // instance: 'SQLEXPRESS',
  // user: 'licha',
  // pass: 'ZjWH4EtCdHK&amp;lFPRfqp#MKd',
  // PRODUCTION
  host: 'SERVER-PRO',
  port: 1433,
  instance: 'SQLEXPRESS',
  user: 'produccion',
  pass: 'marinascada',
}

export const useDataToReport = defineStore({
  id: 'data-to-report',

  state: (): State => ({
    selectedLineNumber: 1,
    selectedReportType: 'envasado',
    loadingQuantity: 0,
    consumos: [],
    envasado: [],
    formulador: [],
    instanceSettings: { ...defaultInstanceSettings },
  }),

  getters: {
    isLoading(): boolean {
      return !!this.loadingQuantity;
    },
  },

  actions: {
    updateInstanceSettings(newSettings: InstanceSettings) {
      this.instanceSettings = newSettings;
    },
    resetToDefaultInstanceSettings() {
      this.instanceSettings = { ...defaultInstanceSettings };
    },
    async setDescargas() {
      this.loadingQuantity += 1;
      // const res = await apiHelpers.testConnection('descargas');
      // this.descargas = res;
      this.loadingQuantity -= 1;
    },
    async setEnvasado() {
      this.loadingQuantity += 1;
      // const res = await apiHelpers.testConnection('envasado')
      // this.envasado = res;
      this.loadingQuantity -= 1;
    },
    async setFormulador() {
      this.loadingQuantity += 1;
      // const res = await apiHelpers.testConnection('formulador')
      // this.formulador = res;
      this.loadingQuantity -= 1;
    },
    setEverything() {
      this.setDescargas();
      this.setEnvasado();
      this.setFormulador();
    },
    setReportType(reportType: ReportType) {
      this.selectedReportType = reportType;
    },
    setLineNumber(lineNumber: LineNumber) {
      this.selectedLineNumber = lineNumber;
    },
  },

});
