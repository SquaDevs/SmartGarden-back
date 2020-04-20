
module.exports = {

  _friendleyResponse: async (data, lang = 'pt') => {
    const response = {
      en: {
        stRisco: {
          baixo: '',
          medio: '',
          alto: ''
        },
        stUmi: {
          baixo: '',
          medio: '',
          alto: ''
        },
        stTemp: {
          baixo: '',
          medio: '',
          alto: ''
        }
      },
      pt: {
        stRisco: {
          medio: 'Estou bem,  mas vem me ver hj , preciso de algo ',
          baixo: 'Esta td bem comigo',
          alto: 'Não me sinto bem , preciso de cuidados '
        },
        stUmi: {
          medio: 'Hoje o ar é o ideal',
          baixo: 'O ar esta seco hoje',
          alto: 'O ar esta humido hoje'
        },
        stTemp: {
          medio: 'Temp perfeita por aqui',
          baixo: 'Está frio por aqui',
          alto: 'Muito calor por aqui'
        }
      }

    }

    // <SubDescription>{plant.stRisco &&`  Risco: ${endum.risco[plant.stRisco]}`}</SubDescription>
    // < SubDescription > { plant.stTemp && ` Temperatura: ${endum.temp[plant.stTemp]}` }</SubDescription>
    // <SubDescription>{plant.stUmi && ` Humidade: ${endum.hum[plant.stUmi]}`}</SubDescription>

    return {
      stRisco: response[lang].stRisco[data.stRisco],
      stUmi: response[lang].stUmi[data.stUmi],
      stTemp: response[lang].stTemp[data.stTemp]

    }
  }
}
