var loginDiscordBtn = document.getElementById('loginDiscordBtn')

loginDiscordBtn.addEventListener('click', function() {
  window.discord.createWindow()
})

window.discord.handleWindowClosed(function() {
  // console.log('Finished')
  window.location.replace('dashboard.html')
})

// window.addEventListener('DOMContentLoaded', main)
