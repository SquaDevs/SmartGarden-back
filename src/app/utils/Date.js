const month = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

module.exports = {

  getMonthW: (dateIsoForm) => {
    const d = new Date(dateIsoForm)

    return month[d.getMonth()]
  }

}
