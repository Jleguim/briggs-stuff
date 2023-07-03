const moment = require('moment')

const Resource = require('../models/Resource.model')
const License = require('../models/License.model')

module.exports.getResourcesCreatedByMe = async function(req, res) {
  var user = req._user
  const resources = await Resource.find({ owner: user._id })
    .populate('owner', '-_id -access_token -refresh_token -resources')
    .populate('licenses', '-_id -resource -seller')

  res.send(resources)
}

module.exports.createResource = async function(req, res) {
  var user = req._user
  var options = req.body
  if (Object.keys(options).length == 0) {
    options = { duration: { amount: 1, unit: 'month' } }
  }

  var resource = await Resource.create({
    owner: user.id,
    licenses: [],
    duration: options.duration,
    creationDate: moment()
  })

  user.resources.push(resource._id)
  await user.save()

  res.send(resource)
}

module.exports.deleteResource = async function(req, res) {
  var user = req._user
  var resource = await Resource.findById(req.params.resourceId)
  if (!resource) return res.status(400).send({ err: 'Resource not found' })

  if (!resource.isMyOwner(user)) return res.status(403).send({ err: 'You do not own this resource' })

  await Resource.findByIdAndDelete(req.params.resourceId)
  res.sendStatus(200)
}

module.exports.createLicense = async function(req, res) {
  var resource = await Resource.findById(req.params.resourceId)
  if (!resource) return res.status(400).send({ err: 'Resource not found' })

  if (!resource.isMyOwner(req._user)) {
    return res.status(403).send({ err: 'You do not own this resource' })
  }

  var license = await License.create({
    resource: resource._id,
    seller: resource.owner,
    expireAfter: moment.duration(resource.duration.amount, resource.duration.unit),
    isActive: false,
    creationDate: moment()
  })

  resource.licenses.push(license._id)
  await resource.save()

  res.send(license)
}

module.exports.deleteLicense = async function(req, res) {
  var resource = await Resource.findById(req.params.resourceId)
  if (!resource) return res.status(400).send({ err: 'Resource not found' })

  if (!resource.isMyOwner(req._user)) {
    return res.status(403).send({ err: 'You do not own this resource' })
  }

  if (!resource.isMyLicense(req.params.key)) {
    return res.status(403).send({ err: 'This licenses is not of this resource' })
  }

  resource.licenses = resource.licenses.filter(objId => !objId.equals(req.params.key))
  await resource.save()
  await License.findByIdAndDelete(req.params.key)
  res.sendStatus(200)
}
