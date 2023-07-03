# briggs-stuff
A bunch of stuff you shouldn't be looking at, but here we are.

## Licenser
You're making something for a client and you don't want to send them the source code and feel like if you send them an exe they'll use it for the end of time? Yeah me neither.
### Configuration
This actually needs the backend so have that in mind.
```js
// licenser/ApiCalls.js
const APIURL = 'localhost:1337/' // Change this to the url of your backend
```
```json
// licenser/package.json
  "pkg": {
    "scripts": [], // glob list of the scripts that are dinamically required
    "assets": [], // glob list of assests (html and such)
    "outputPath": "out/",
    "targets": ["node16-win-x64"] 
  }
```