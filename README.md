# Funfunz JSON Data Connector

[![Discord][discord-badge]][discord]
[![Build Status][actions-badge]][actions]
[![codecov][codecov-badge]][codecov]
![node][node]
[![npm version][npm-badge]][npm]
[![PRs Welcome][prs-badge]][prs]
[![GitHub][license-badge]][license]


## Features

This connector use a JSON file for each entity to storage its entries.


## Configuration

* `folderPath`: absolute path of the folder where this connector should read/write JSON files


### Example

```typescript
const config = {
  connectors: {
    mainDatabase: {
      type: '@funfunz/json-data-connector',
      config: {
        folderPath: path.join(__dirname, '..', 'storage') 
      },
    }
  }
}
const funfunz = new Funfunz({ config, ... })
```


[discord-badge]: https://img.shields.io/discord/774439225520554004?logo=discord
[discord]: https://discord.gg/HwZ7zMJKwg

[actions-badge]: https://github.com/funfunz/json-data-connector/workflows/Node.js%20CI/badge.svg
[actions]: https://github.com/Funfunz/json-data-connector/actions

[codecov-badge]: https://codecov.io/gh/Funfunz/json-data-connector/branch/main/graph/badge.svg
[codecov]: https://codecov.io/gh/Funfunz/json-data-connector

[node]: https://img.shields.io/node/v/funfunz.svg

[npm-badge]: https://badge.fury.io/js/funfunz.svg
[npm]: https://badge.fury.io/js/funfunz

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com

[license-badge]: https://img.shields.io/github/license/JWebCoder/funfunz.svg
[license]: https://github.com/JWebCoder/funfunz/blob/master/LICENSE
