const mongoose = require('mongoose')
const moment = require('moment')

var resourceDefinition = {
  name: { type: String },
  owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: moment() },
}

var Resource = new mongoose.Schema(resourceDefinition, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})

Resource.virtual('licenses', {
  ref: 'License',
  localField: '_id',
  foreignField: 'resource',
})

module.exports = mongoose.model('Resource', Resource)
