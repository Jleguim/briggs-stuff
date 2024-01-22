const mongoose = require('mongoose')
const moment = require('moment')

var userDefinition = {
  email: { type: String, unique: true },
  oauth: {
    twitch: {
      access_token: { type: String },
      refresh_token: { type: String },
      expires_in: { type: Number },
      id: { type: String },
    },
    discord: {
      access_token: { type: String },
      refresh_token: { type: String },
      expires_in: { type: Number },
      id: { type: String },
    },
  },
  creationDate: { type: Date, default: moment() },
}

var User = new mongoose.Schema(userDefinition, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})

module.exports = mongoose.model('User', User)
