type DateDiference = {
  date?: string;
  months?: number;
  days?: number;
}

export const dateHelpers = {
  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  },
  getDate(params?: DateDiference) {
    // initial date
    const newDate = params?.date ? new Date(params.date) : new Date();
    // months
    if (params?.months) {
      newDate.setMonth(newDate.getMonth() - params.months);
    }
    // days
    if (params?.days) {
      newDate.setDate(newDate.getDate() + params.days);
    }
    return this.formatDate(newDate);
  },
  getMonth(params?: DateDiference) {
    const date = new Date(this.getDate(params));
    return date.getMonth() + 1;
  },
  getYear(params?: DateDiference) {
    const date = new Date(this.getDate(params));
    return date.getFullYear();
  }
};
