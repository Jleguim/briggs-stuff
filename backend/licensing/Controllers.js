const moment = require('moment')
const License = require('./License.model')
const { default: mongoose } = require('mongoose')

module.exports.generate = async function(req, res) {
  var license = await License.create({ options: req.body })
  res.send({ key: license._id })
}

module.exports.activate = async function(req, res) {
  var key = req.body.key /** , hardwareId = something*/
  if (mongoose.isValidObjectId(key) == false && key !== undefined) {
    return res.status(400).send({
      status: '400 Bad Request',
      err: 'License is not valid',
      code: 1
    })
  }

  var license = await License.findOne({ _id: key })
  if (!license) {
    return res.status(401).send({
      status: '401 Unauthorized',
      err: 'License is not valid',
      code: 1
    })
  }

  // Set new dates
  var options = license.options
  license.expiryDate = moment().add(options.durationAmount, options.durationUnit).toDate()
  license.activationDate = moment().toDate()
  await license.save()
  // ----

  res.status(200).send({ status: '200 OK', message: 'Activated license' })
}

module.exports.validate = async function(req, res) {
  var key = req.body.key /** , hardwareId = something*/
  if (mongoose.isValidObjectId(key) == false && key !== undefined) {
    return res.status(400).send({
      status: '400 Bad Request',
      err: 'License is not valid',
      code: 1
    })
  }

  var license = await License.findOne({ _id: key })
  if (!license) {
    return res.status(401).send({
      status: '401 Unauthorized',
      err: 'License is not valid',
      code: 1
    })
  }

  if (license.expiryDate == undefined) {
    return res.status(403).send({
      status: '403 Forbidden',
      err: 'License is not activated, contact the seller.',
      code: 2
    })
  }

  var now = moment()
  var expiryMoment = moment(license.expiryDate)

  if (now.isSameOrAfter(expiryMoment)) {
    return res.status(403).send({
      status: '403 Forbidden',
      err: 'License is expired, contact the seller.',
      code: 3
    })
  }

  res.status(200).send({ status: '200 OK', message: 'License is valid.' })
}
