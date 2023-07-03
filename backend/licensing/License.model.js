const mongoose = require('mongoose')
const moment = require('moment')

var License = new mongoose.Schema({
  expirationDate: { type: Date, required: false },
  expireAfter: { type: Number, required: true, default: moment.duration(1, 'month') },
  activationDate: { type: Date, required: false },
  isActive: { type: Boolean, required: true, default: false },
  creationDate: { type: Date, required: true, default: moment() },
  resource: { type: String, required: true, default: 'My resource' }
})

License.virtual('isExpired').get(function() {
  var expirationDate = moment(this.expirationDate)
  return moment().isSameOrAfter(expirationDate)
})

License.method('startCountdown', function() {
  this.isActive = true
  this.activationDate = moment()
  this.expirationDate = moment().add(this.expireAfter, 'ms')
})

module.exports = mongoose.model('License', License)
