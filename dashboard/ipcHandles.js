const { ipcMain } = require('electron')

const WindowManager = require('./WindowManager')
const API = require('./api/index')
const Storage = require('./Storage')

ipcMain.handle('getUserData', API.discord.getUserData)
ipcMain.handle('refresh_token', API.auth.refresh_token)

ipcMain.handle('createDiscordWindow', function(ev) {
  var url =
    'https://discord.com/api/oauth2/authorize?client_id=843306464302071818&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Fdiscord%2Fredirect&response_type=code&scope=identify'

  var childOptions = {
    width: 510,
    height: 700,
    resizable: false
    // frame: false,
    // titleBarStyle: 'hidden'
  }

  var discordWindow = WindowManager.createChildWindow(url, true, childOptions)
  discordWindow.removeMenu()

  // discordWindow.on('resize', ev => {
  //   var [width, height] = discordWindow.getSize()
  //   console.log(`w: ${width}, h: ${height}`)
  // })

  // https://stackoverflow.com/a/38341608/10259845
  discordWindow.webContents.on('will-navigate', async function(ev, url) {
    var queryParams = new URL(url).searchParams
    var code = queryParams.get('code')

    var tokenData = await API.auth.exchange_code(code)
    if (!tokenData) return discordWindow.loadURL(url)

    Storage.set('access_token', tokenData.access_token)
    Storage.set('refresh_token', tokenData.refresh_token)

    discordWindow.close()
    discordWindow.getParentWindow().webContents.send('discordWindowClosed')
  })
})
