function logger(req, res, next) {
  console.log(`Recieved a ${req.method} request @ ${req.path}`)
  next()
}

module.exports = logger
