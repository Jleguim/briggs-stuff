const mongoose = require('mongoose')
const moment = require('moment')

var Resource = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: moment() }
})

module.exports = mongoose.model('Resource', Resource)
