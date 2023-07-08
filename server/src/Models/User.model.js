const mongoose = require('mongoose')
const moment = require('moment')

var User = new mongoose.Schema({
  discord_id: String,
  creationDate: { type: Date, required: true, default: moment() }
})

module.exports = mongoose.model('User', User)
