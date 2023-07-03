# briggs-stuff
A bunch of stuff you shouldn't be looking at, but here we are.

## Backend
Api that gives life to everything here, lol.
### Configuration
```env
# enviroment variables (.env)
PORT=1337
MONGO_URL=mongodb://localhost:27017/myCollection

# Discord application stuff
CLIENT_SECRET=supersecret
CLIENT_ID=12345
```
```js
// backend/discord/Midlleware.js line 18
scope: ['identify'], // Specify the scopes you need
```


## Dashboard
Basically a dashboard that let's you manage the licenses you're giving out.
### Configuration
```js
// dashboard/ipcHandles.js line 12
var url = 'https://discord.com/api/oauth2/authorize?client_id=12345' // OAuth2 link

// dashboard/api/Auth.js line 4
const ApiUri = 'https://myawesomeapi.gov/' // Change this to your api endpoint
```

## Licenser
You're making something for a client and you don't want to send them the source code and feel like if you send them an exe they'll use it for the end of time? Yeah me neither.
### Configuration
```js
// licenser/ApiCalls.js line 3
const APIURL = 'https://myawesomeapi.gov/' // Change this to your api endpoint
```
`scripts` and `assets` are both lists of globs.
```json
// licenser/package.json line 19
"pkg": {
  "scripts": [],
  "assets": [],
  "outputPath": "out/",
  "targets": ["node16-win-x64"] 
}
```