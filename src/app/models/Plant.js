const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const bcryptjs = require("bcryptjs");
const Plant = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Plant.pre("save", async function(next) {
  if (!this.isModified("token")) {
    if (this.token === undefined) {
      this.token = await bcryptjs.hash(this.owner + Date.now, 8);
    } else {
      return next();
    }
  }
});

Plant.plugin(mongoosePaginate);

module.exports = mongoose.model("Plant", Plant);
