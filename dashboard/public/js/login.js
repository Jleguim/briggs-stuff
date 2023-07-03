var loginDiscordBtn = document.getElementById('loginDiscordBtn')

loginDiscordBtn.addEventListener('click', function() {
  window.windowManager.createDiscordWindow()
})

window.windowManager.handleDiscordWindowClosed(function() {
  // console.log('Finished')
  window.location.replace('dashboard.html')
})

// window.addEventListener('DOMContentLoaded', main)
