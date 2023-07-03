const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('windowManager', {
  createDiscordWindow: () => ipcRenderer.invoke('createDiscordWindow'),
  handleDiscordWindowClosed: cb => ipcRenderer.on('discordWindowClosed', cb)
})

contextBridge.exposeInMainWorld('api', {
  discord: {
    getUserData: () => ipcRenderer.invoke('getUserData')
  },
  auth: {
    refresh_token: () => ipcRenderer.invoke('refresh_token'),
    revoke_token: () => ipcRenderer.invoke('revoke_token')
  }
})
