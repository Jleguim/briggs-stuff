const moment = require('moment')
const License = require('./License.model')

module.exports.create = async function(req, res) {
  if (req.body == {} || req.body.amount == undefined || req.body.unit == undefined) {
    return res.status(400).send({
      status: '400 Bad Request',
      err: 'Invalid body',
      code: 1
    })
  }

  var options = req.body
  var license = new License({})
  license.creationDate = moment()
  license.expireAfter = moment.duration(options.amount, options.unit)
  license.resource = options.resource || 'My resource'
  await license.save()

  res.send({ key: license._id })
}

module.exports.activate = async function(req, res) {
  var license = req.license

  license.startCountdown()
  await license.save()

  res.status(200).send({ status: '200 OK', message: 'Activated license' })
}

module.exports.validate = async function(req, res) {
  var license = req.license

  if (!license.isActive) {
    return res.status(403).send({
      status: '403 Forbidden',
      err: 'License is not activated, contact the seller.',
      code: 2
    })
  }

  if (license.isExpired) {
    return res.status(403).send({
      status: '403 Forbidden',
      err: 'License is expired, contact the seller.',
      code: 3
    })
  }

  res.status(200).send({ status: '200 OK', message: 'License is valid.' })
}

module.exports.getAll = async function(req, res) {
  var licenses = await License.find({})
  res.status(200).send(licenses || {})
}

module.exports.renew = async function(req, res) {
  var license = req.license

  license.startCountdown()
  await license.save()

  res.status(200).send({ status: '200 OK', message: 'Renewed license' })
}

module.exports.terminate = async function(req, res) {
  await License.deleteOne({ _id: req.license._id })
  res.status(200).send({ status: '200 OK', message: 'Terminated license' })
}
