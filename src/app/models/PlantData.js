const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PlantData = mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  temperature: {
    type: Number
  },
  airHumidity: {
    type: Number
  },
  groundHumidity: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PlantData.plugin(mongoosePaginate)

module.exports = mongoose.model('PlantData', PlantData)
