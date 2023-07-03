const mongoose = require('mongoose')
const moment = require('moment')

var Resource = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  licenses: [{ type: mongoose.Types.ObjectId, required: true, ref: 'License' }],
  duration: {
    amount: Number,
    unit: String
  },
  creationDate: { type: Date, required: true, default: moment() }
})

Resource.method('isMyOwner', function(user) {
  var ObjectId = new mongoose.Types.ObjectId(user)
  if (ObjectId.equals(this.owner)) return true
  else return false
})

Resource.method('isMyLicense', function(license) {
  var ObjectId = new mongoose.Types.ObjectId(license)
  var filter = this.licenses.filter(objId => objId.equals(ObjectId))
  console.log(filter)
  return filter.length != 0 ? true : false
})

module.exports = mongoose.model('Resource', Resource)
