const mongoose = require('mongoose')
const License = require('./License.model')

module.exports.getLicense = async function(req, res, next) {
  var key = req.body.key /** , hardwareId = something*/
  if (mongoose.isValidObjectId(key) == false && key !== undefined) {
    return res.status(400).send({
      status: '400 Bad Request',
      err: 'License is not valid',
      code: 1
    })
  }

  var license = await License.findOne({ _id: req.body.key })
  if (!license) {
    return res.status(401).send({
      status: '401 Unauthorized',
      err: 'License is not valid',
      code: 1
    })
  }

  req.license = license
  next()
}
