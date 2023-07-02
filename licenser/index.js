const fs = require('./LicenseFile')
const api = require('./ApiCalls')

function run() {
  // Run license checking interval
  require('./ValidateInterval')
  // Run licensed program
  require('./awesome-code/index')
}

async function main() {
  var licenseKey = await fs.getLicense()

  var validateRequest = await api.validate(licenseKey)
  var body = validateRequest.body

  // 1: invalid, 2: not active, 3: expired
  if (body.code == 1 || body.code == 3) {
    console.log(body.err)
    return fs.deleteLicenseFile()
  }

  if (body.code == 2) {
    console.log('License is not activated, activating now...')
    return await activateLicense(licenseKey)
  }

  console.log('License validated')
  fs.saveLicenseFile(licenseKey)
  run()
}

async function activateLicense(licenseKey) {
  var activateRequest = await api.activate(licenseKey)
  var body = activateRequest.body

  if (body.code == 1) {
    // 1: invalid
    console.log(body.err)
    return fs.deleteLicenseFile()
  }

  console.log('License validated')
  fs.saveLicenseFile(licenseKey)
  run()
}

main().catch(err => {
  throw err
})
