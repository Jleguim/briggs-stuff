async function main() {
  var userData = await window.discord.getUserData()
  // document.body.innerText = JSON.stringify(userData, 0, 3)

  if (!userData.global_name) userData.global_name = `${userData.username}#${userData.discriminator}`

  var userImg = document.getElementById('userImg')
  userImg.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
  userImg.alt = `${userData.global_name}'s avatar`

  var userInfo = document.getElementById('userInfo')
  userInfo.innerText = `${userData.global_name} (${userData.id})`
}

main()
