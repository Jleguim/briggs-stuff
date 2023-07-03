async function main() {
  var userData = await window.api.discord.getUserData()
  // document.body.innerText = JSON.stringify(userData, 0, 3)

  if (!userData.global_name) userData.global_name = `${userData.username}#${userData.discriminator}`

  var userImg = document.getElementById('userImg')
  userImg.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
  userImg.alt = `${userData.global_name}'s avatar`

  var userInfo = document.getElementById('userInfo')
  userInfo.innerText = `${userData.global_name} (${userData.id})`

  var logoutBtn = document.getElementById('logoutBtn')
  logoutBtn.addEventListener('click', async function() {
    await window.api.auth.revoke_token()
    window.location.replace('login.html')
  })
}

main()
