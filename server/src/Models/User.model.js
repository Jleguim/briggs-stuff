const mongoose = require('mongoose')
const moment = require('moment')

var User = new mongoose.Schema({
  discord_id: { type: String },
  // licenses: [{ type: mongoose.Types.ObjectId, ref: 'license' }],
  resources: [{ type: mongoose.Types.ObjectId, ref: 'Resource' }],
  creationDate: { type: Date, default: moment() }
})

module.exports = mongoose.model('User', User)
