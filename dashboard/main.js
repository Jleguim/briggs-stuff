const { app } = require('electron')
const path = require('path')

const WindowManager = require('./WindowManager')
const Storage = require('./Storage')
const API = require('./api/index')

app.once('ready', async () => {
  require('./ipcHandles')
  Storage.load()

  WindowManager.createMainWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './public/js/preload.js')
    }
  })

  if (!Storage.get('refresh_token') || !Storage.get('access_token')) {
    // Need an access_token dummy! prompt login
    // No way of getting a new refresh_token, prompt login
    return WindowManager.changeMainWindowView('./public/views/login.html')
  }

  // Try refreshing the access_token
  var tokenData = await API.auth.refresh_token()
  if (!tokenData.access_token) {
    // Error, prompt login
    return WindowManager.changeMainWindowView('./public/views/login.html')
  }

  Storage.set('access_token', tokenData.access_token)
  Storage.set('refresh_token', tokenData.refresh_token)

  WindowManager.changeMainWindowView('./public/views/dashboard.html')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', function(ev) {
  ev.preventDefault()
  Storage.save()
  app.exit()
})
