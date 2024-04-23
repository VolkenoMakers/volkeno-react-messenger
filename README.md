# volkeno-react-messenger

> The 'volkeno-react-messenger' module is a powerful and flexible messaging solution designed specifically for Volkeno's internal needs. Seamlessly integrating with Volkeno's internal data structure, this module provides a smooth and intuitive messaging experience for users.

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
        user={user}
        token={token}
        ApiBaseUrl={ApiBaseUrl}
        setApiPostEndpoint={'/api/messages/'}
        setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
        setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
        socketUrl={SOCKET_URL}
     />
    )
  }
}
```


## Configuration - Props

**Props require**

| Property                        |   Type   | Default | Description                                                                       |
| ------------------------------- | :------: | :-----: | --------------------------------------------------------------------------------- |
| user                            |  object  |  true   | Provide logged in user data                                                       |
| token                           |  string  |  true   | Provide logged in user token                                                      |
| ApiBaseUrl                      |  string  |  true   | Provide api base url                                                              |
| setApiPostEndpoint              |  string  |  true   | Provide the endpoint to post messages                                             |
| setApiListUsersEndpoint         |  string  |  true   | Provide the endpoint for users list                                               |
| setApiConversationUserEndpoint  |  string  |  true   | Provide the endpoint for user conversations                                       |
| socketUrl                       |  string  |  true   | Provide socket url                                                                |
| title                           |  string  |  false  | Set the name of the chat                                                          |
| newMessageTitle                 |  string  |  false  | Set the name of new discussion modal                                              |

## License

MIT © [Papaul-msibiii](https://github.com/Papaul-msibiii)
