class OAuthService {
  constructor({ buttonId, url, client_id, redirectPath, scope, response_type, name }) {
    this.buttonId = buttonId
    this.url = url
    this.client_id = client_id
    this.redirectPath = redirectPath
    this.scope = scope
    this.response_type = response_type
    this.name = name
  }

  async authentiate() {
    let params = new URL(window.location).searchParams
    let authUrl = new URL(document.api + this.redirectPath)
    authUrl.searchParams.set('code', params.get('code'))
    authUrl.searchParams.set('uri', window.location.href.slice(0, -window.location.search.length))

    var authRes = await fetch(authUrl)
    let jwt = await authRes.text()
    let maxAge = 60 * 60 * 24 * 3
    document.cookie = `jwt=${jwt};path=/;max-age=${maxAge}`

    window.open('/dashboard', '_self')
  }

  setupButton() {
    let btn = document.getElementById(this.buttonId)
    let authUrl = new URL(this.url)
    authUrl.searchParams.set('client_id', this.client_id)
    authUrl.searchParams.set('redirect_uri', encodeURI(window.location.origin + this.redirectPath))
    authUrl.searchParams.set('scope', this.scope.join(' '))
    authUrl.searchParams.set('response_type', this.response_type)

    btn.addEventListener('click', function () {
      if (document.cookies['jwt']) return window.open('/dashboard', '_self')
      let options = 'location=yes,height=570,width=520,scrollbars=yes,status=yes'
      window.open(authUrl, '_self', options)
    })
  }
}

const DiscordOAuthService = new OAuthService({
  name: 'Discord',
  buttonId: 'discordLgnBtn',
  url: 'https://discord.com/oauth2/authorize',
  client_id: '843306464302071818',
  redirectPath: '/auth/discord',
  scope: ['identify', 'email'],
  response_type: 'code',
})

const TwitchOAuthService = new OAuthService({
  name: 'Twitch',
  buttonId: 'twitchLgnBtn',
  url: `https://id.twitch.tv/oauth2/authorize`,
  client_id: 'xemkufelkfepv4fm6yr9jkci135gbt',
  redirectPath: '/auth/twitch',
  scope: ['user:read:email'],
  response_type: 'code',
})
