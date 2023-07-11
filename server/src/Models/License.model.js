const mongoose = require('mongoose')
const moment = require('moment')

var licenseDefinition = {
  name: { type: String },
  resource: { type: mongoose.Types.ObjectId, ref: 'Resource', required: true },
  creationDate: { type: Date, default: moment() },
}

var License = new mongoose.Schema(licenseDefinition, {
  id: false,
})

module.exports = mongoose.model('License', License)
