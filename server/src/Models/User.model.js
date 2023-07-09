const mongoose = require('mongoose')
const moment = require('moment')

var userDefinition = {
  discord_id: { type: String },
  creationDate: { type: Date, default: moment() }
}

var User = new mongoose.Schema(userDefinition, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false
})

User.virtual('resources', {
  ref: 'Resource',
  localField: '_id',
  foreignField: 'owner'
})

module.exports = mongoose.model('User', User)
