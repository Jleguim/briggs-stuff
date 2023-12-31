const mongoose = require('mongoose')
const moment = require('moment')

var License = new mongoose.Schema({
  resource: { type: mongoose.Types.ObjectId, required: true, ref: 'Resource' },
  seller: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },

  expirationDate: { type: Date, required: false },
  expireAfter: { type: Number, required: true, default: moment.duration(1, 'month') },
  activationDate: { type: Date, required: false },
  isActive: { type: Boolean, required: true, default: false },

  creationDate: { type: Date, required: true, default: moment() }
})

License.method('isMySeller', function(user) {
  var ObjectId = new mongoose.Types.ObjectId(user)
  if (ObjectId.equals(this.seller)) return true
  else return false
})

License.virtual('isExpired').get(function() {
  var expirationDate = moment(this.expirationDate)
  return moment().isSameOrAfter(expirationDate)
})

License.method('activate', function() {
  this.isActive = true
  this.activationDate = moment()
  this.expirationDate = moment().add(this.expireAfter, 'ms')
})

module.exports = mongoose.model('License', License)
