import { defineStore } from 'pinia'
// types
import type { ReportType } from '@/types/general.type';
import type { Descarga } from '@/types/descarga.model';
import type { Envasado } from '@/types/envasado.model';
import type { Formulador } from '@/types/formulador.model';
// helpers
import { apiHelpers } from '@/helpers/api.helpers';

interface State {
  selectedReportType: ReportType;
  loadingQuantity: number;
  descargas: Descarga[];
  envasado: Envasado[];
  formulador: Formulador[];
}

export const useDataToReport = defineStore({
  id: 'data-to-report',

  state: (): State => ({
    selectedReportType: 'descargas',
    loadingQuantity: 0,
    descargas: [],
    envasado: [],
    formulador: [],
  }),

  getters: {
    isLoading(): boolean {
      return !!this.loadingQuantity;
    },
  },

  actions: {
    async setDescargas() {
      this.loadingQuantity += 1;
      const res = await apiHelpers.get('descargas');
      this.descargas = res;
      this.loadingQuantity -= 1;
    },
    async setEnvasado() {
      this.loadingQuantity += 1;
      const res = await apiHelpers.get('envasado')
      this.envasado = res;
      this.loadingQuantity -= 1;
    },
    async setFormulador() {
      this.loadingQuantity += 1;
      const res = await apiHelpers.get('formulador')
      this.formulador = res;
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
  },

});
