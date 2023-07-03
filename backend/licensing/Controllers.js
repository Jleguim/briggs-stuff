const moment = require('moment')

const License = require('../models/License.model')

module.exports.getLicensesCreatedByMe = async function(req, res) {
  const licenses = await License.find({ seller: req._user._id })
  res.send(licenses)
}

// module.exports.createLicense = async function(req, res) {
//   var options = req.body
//   if (Object.keys(options).length == 0) {
//     options = { amount: 1, unit: 'month' }
//   }

//   var license = await License.create({
//     seller: req._user._id,
//     expireAfter: moment.duration(options.amount, options.unit),
//     isActive: false,
//     creationDate: moment()
//   })

//   res.send(license)
// }

// module.exports.deleteLicense = async function(req, res) {
//   var user = req._user
//   var license = await License.findById(req.query.key)
//   if (!license) return res.status(400).send({ err: 'License not found' })

//   if (!license.isMySeller(user)) return res.status(403).send({ err: 'You do not own this license' })

//   await License.findByIdAndDelete(req.query.key)
//   res.sendStatus(200)
// }

module.exports.activateLicense = async function(req, res) {
  var key = req.query.key
  var license = await License.findById(key)
  if (!license) return res.status(404).send({ err: 'Invalid license' })

  if (license.isActive) return res.status(403).send({ err: 'Already active' })

  license.activate()
  await license.save()

  res.sendStatus(200)
}

module.exports.renewLicense = async function(req, res) {
  var key = req.query.key
  var license = await License.findById(key)
  if (!license) return res.status(404).send({ err: 'Invalid license' })

  license.activate()
  await license.save()

  res.sendStatus(200)
}

module.exports.validateLicense = async function(req, res) {
  var key = req.query.key
  var license = await License.findById(key)
  if (!license) return res.status(404).send({ err: 'Invalid license' })

  if (!license.isActive) return res.status(403).send({ err: 'License not active' })
  if (license.isExpired) return res.status(403).send({ err: 'License expired' })

  res.sendStatus(200)
}
