const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('discord', {
  createWindow: () => ipcRenderer.invoke('createDiscordWindow'),
  handleWindowClosed: cb => ipcRenderer.on('discordWindowClosed', cb),
  getUserData: () => ipcRenderer.invoke('getUserData')
})
