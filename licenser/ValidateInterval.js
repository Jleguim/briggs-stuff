const fs = require('./LicenseFile')
const api = require('./ApiCalls')

setInterval(async () => {
  var licenseKey = await fs.getLicense()
  var validateRequest = await api.validate(licenseKey)

  if (validateRequest.status != 200) {
    console.log('License expired, contact the seller')
    process.exit(0)
  }
}, 1000 * 60 * 6)
