module.exports.getCurrentUser = async function (req, res) {
  var r = await req.api.getCurrentUser()
  res.send(r)
}
