const DISCORD_CLIENT_ID = '843306464302071818'
const TWITCH_CLIENT_ID = 'xemkufelkfepv4fm6yr9jkci135gbt'

const AuthServices = {
  twitch: {
    elementId: 'twitchLgnBtn',
    url: `https://id.twitch.tv/oauth2/authorize`,
    client_id: 'xemkufelkfepv4fm6yr9jkci135gbt',
    redirect_uri: encodeURI(window.location.origin + '/auth/twitch'),
    scope: ['user:read:email'],
    response_type: 'code',
  },
  discord: {
    elementId: 'discordLgnBtn',
    url: `https://discord.com/oauth2/authorize`,
    client_id: '843306464302071818',
    redirect_uri: encodeURI(window.location.origin + '/auth/discord'),
    scope: ['identify'],
    response_type: 'code',
  },
}

for (const ServiceName in AuthServices) {
  let AuthData = AuthServices[ServiceName]
  let btnElement = document.getElementById(AuthData.elementId)

  let redirectUrl = new URL(AuthData.url)
  redirectUrl.searchParams.set('client_id', AuthData.client_id)
  redirectUrl.searchParams.set('redirect_uri', AuthData.redirect_uri)
  redirectUrl.searchParams.set('scope', AuthData.scope.join(' '))
  redirectUrl.searchParams.set('response_type', AuthData.response_type)

  btnElement.addEventListener('click', function () {
    if (document.cookies['jwt']) return window.open('/dashboard', '_self')
    let options = 'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    window.open(redirectUrl, '_self', options)
  })
}
