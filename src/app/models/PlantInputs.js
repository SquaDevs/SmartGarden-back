const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const PlantInput = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.Array,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  plants: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    }]
  }

})

PlantInput.plugin(mongoosePaginate)

module.exports = mongoose.model('PlantInput', PlantInput)
