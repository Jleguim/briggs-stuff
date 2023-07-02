const mongoose = require('mongoose')

var License = new mongoose.Schema({
  expiryDate: { type: Date, required: false },
  activationDate: { type: Date, required: false },
  creationDate: { type: Date, required: true, default: new Date() },
  options: {
    durationAmount: { type: Number, required: true, default: 1 },
    durationUnit: { type: String, required: true, default: 'month' }
  }
})

module.exports = mongoose.model('License', License)
