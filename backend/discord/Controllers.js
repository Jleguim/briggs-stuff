const api = require('./ApiCalls')

module.exports.redirect = async function(req, res) {
  res.sendStatus(200)
}

module.exports.exchange_code = async function(req, res) {
  const accessResponse = await api.exchange_code(req.query.code, req.redirect_uri)
  if (accessResponse.status == 200) return res.send(accessResponse.body)

  res.status(401).send(accessResponse.body)
}

module.exports.refresh_token = async function(req, res) {
  const refreshResponse = await api.refresh_token(req.query.refresh_token)
  if (refreshResponse.status == 200) return res.send(refreshResponse.body)

  res.send(refreshResponse.body)
}

module.exports.revoke_token = async function(req, res) {
  const revokeResponse = await api.revoke_token(req.query.access_token)
  if (revokeResponse.status == 200) return res.sendStatus(200)

  res.send(revokeResponse.body)
}
