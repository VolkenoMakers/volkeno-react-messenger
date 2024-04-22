# volkeno-react-messenger

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/volkeno-react-messenger.svg)](https://www.npmjs.com/package/volkeno-react-messenger) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save volkeno-react-messenger
```

## Usage

```tsx
import React, { Component } from 'react'

import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'

class Example extends Component {
  render() {
    return (
      <VolkenoReactMessenger
        socketUrl={socketUrl}
        user={user}
        token={token}
        conversationsUser={conversationsUser}
        ApiBaseUrl={ApiBaseUrl}
        userList={userList}
     />
    )
  }
}
```


## Configuration - Props

**Props require**

| Property                 |   Type   | Default | Description                                                                              |
| ------------------------ | :------: | :-----: | ---------------------------------------------------------------------------------------- |
| socketUrl                | string   |  true   | Provide socket url.                                                                      |
| user                     | object   |  true   | Provide logged in user data                                                              |
| token                    | string   |  true   | Provide logged in user token                                                             |
| conversationsUser        | array    |  true   | provide the list of user conversations                                                   |
| ApiBaseUrl               | string   |  true   | Provide api base url                                                                     |
| userList                 |  array   |    -    | Provide the list of users .                                                              |

## License

MIT © [Papaul-msibiii](https://github.com/Papaul-msibiii)
