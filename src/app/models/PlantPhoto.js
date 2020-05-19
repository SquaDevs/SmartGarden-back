const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PlantPhoto = mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  photo: {
    type: Buffer,
    contentType: String
    // required: true
  },
  name: String,
  size: Number,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PlantPhoto.plugin(mongoosePaginate)

module.exports = mongoose.model('PlantPhoto', PlantPhoto)
