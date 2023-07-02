const FILEDIRPATH = process.env.APPDATA + '\\Briggs\\'
const FILEPATH = FILEDIRPATH + '\\License'

const fs = require('fs')

function promptForLicense() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    readline.question('License key: ', key => {
      resolve(key)
      readline.close()
    })
  })
}

module.exports.saveLicenseFile = function(key) {
  if (!fs.existsSync(FILEDIRPATH)) {
    fs.mkdirSync(FILEDIRPATH)
  }

  fs.writeFileSync(FILEPATH, key)
}

module.exports.getLicense = async function() {
  if (!fs.existsSync(FILEPATH)) {
    return await promptForLicense()
  }

  return fs.readFileSync(FILEPATH, { encoding: 'utf-8' })
}

module.exports.deleteLicenseFile = function() {
  if (fs.existsSync(FILEPATH)) {
    fs.rmSync(FILEPATH)
  }
}
