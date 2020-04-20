
const { ML_URL } = process.env
const axios = require('axios')

const { getMonthW } = require('../utils/Date')
const { _friendleyResponse } = require('./../utils/InsightsUtils')

class InsightsController {
  async tgetPlanInsights(req, res) {
    const { data: plantData } = req.body

    const ins = {
      insumo: 'cebolinha',
      mes: getMonthW(plantData.createdAt),
      tempMax: 20,
      tempMin: 18,
      tempRel: plantData.temperature,
      umiRel: ((plantData.groundHumidity + plantData.airHumidity) / 2),
      aparencia: 'amarelada'
    }
    console.log(ins)

    const { data } = await axios.post(`${ ML_URL }/api/analisar`, [
      ins
    ])

    const fRes = await _friendleyResponse(data)
    console.log(fRes)

    return res.json({ ...fRes })
  }
}

module.exports = new InsightsController()
