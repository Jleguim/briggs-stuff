const Resource = require('../Models/Resource.model')
const License = require('../Models/License.model')
const User = require('../Models/User.model')

const api = require('../api')

module.exports.resource = {
  create: async function (req, res) {
    try {
      var resource = await Resource.create({
        name: 'My resource',
        owner: req.user._id,
      })
      res.send(resource)
    } catch (err) {
      res.sendStatus(401)
      console.log(err)
    }
  },
  getOne: async function (req, res) {
    try {
      var resource = await Resource.findById(req.params.resourceId)
      if (!resource) return res.sendStatus(404)
      res.send(resource)
    } catch (err) {
      res.sendStatus(401)
      console.log(err)
    }
  },
  getAll: async function (req, res) {
    try {
      var resources = await Resource.find({ owner: req.user._id })
      res.send(resources)
    } catch (err) {
      res.sendStatus(401)
      console.log(err)
    }
  },
  update: async function (req, res) {
    try {
      var resource = await Resource.findById(req.params.resourceId)
      if (!resource) return res.sendStatus(404)

      var userObjectId = new mongoose.Types.ObjectId(req.user._id)
      if (!userObjectId.equals(resource.owner)) return res.sendStatus(403)

      // validate req.body first and then
      await resource.updateOne(req.body)
      resource = await Resource.findById(resource._id)

      res.send(resource)
    } catch (err) {
      res.sendStatus(401)
      console.log(err)
    }
  },
}

module.exports.license = {
  create: async function (req, res) {},
  getOne: async function (req, res) {},
  getAll: async function (req, res) {},
  update: async function (req, res) {},
}

module.exports.discord = {
  identify: async function (req, res) {
    try {
      var access_token = req.jwt.tokens.access_token
      var response = await api.identify(access_token)
      console.log(access_token)
      res.send(response.body)
    } catch (err) {
      res.sendStatus(401)
      console.log(err)
    }
  },
}
