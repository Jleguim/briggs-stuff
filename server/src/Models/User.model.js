const mongoose = require('mongoose')
const moment = require('moment')

var userDefinition = {
  email: { type: String, unique: true },
  creationDate: { type: Date, default: moment() },
}

var User = new mongoose.Schema(userDefinition, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})

module.exports = mongoose.model('User', User)
