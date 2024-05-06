# volkeno-react-messenger

> The 'volkeno-react-messenger' module is a powerful and flexible messaging solution designed specifically for Volkeno's internal needs. Seamlessly integrating with Volkeno's internal data structure, this module provides a smooth and intuitive messaging experience for users.

[![NPM](https://img.shields.io/npm/v/volkeno-react-messenger.svg)](https://www.npmjs.com/package/volkeno-react-messenger) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save volkeno-react-messenger
```

## Usage

```tsx
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'

class Example extends Component {
  render() {
    return (
      <VolkenoReactMessenger
        user={user}
        token={'token'}
        apiBaseUrl={'api_base_url'}
        setApiPostEndpoint={'/api/messages'}
        setApiListUsersEndpoint={'/api/List_user_url'}
        setApiConversationUserEndpoint={'/api/List_conversation_user_url'}
     />
    )
  }
}
```


## Configuration - Props

**Props require**

| Property                        |   Type   | Required |  Default | Description                                                            |
| ------------------------------- | :------: | :------: | :------: | ---------------------------------------------------------------------- |
| user                            |  object  |  true    |    { }   | Provide logged in user data                                            |
| token                           |  string  |  true    |    ' '   | Provide logged in user token                                           |
| apiBaseUrl                      |  string  |  true    |    ' '   | Provide api base url                                                   |
| setApiPostEndpoint              |  string  |  false   |    '/api/messages'   | Provide the endpoint to post messages                      |
| setApiListUsersEndpoint         |  string  |  true    |    ' '   | Provide an endpoint for the first list or list of all users the user can chat with              |
| setApiConversationUserEndpoint  |  string  |  true    |    ' '   | Provide the endpoint for the user's list of all conversations          |
<!-- | socketUrl                       |  string  |  true    |    '164.92.136.142:4026'   | Provide socket url                                   | -->

**Other props**

| Property                        |   Type   | Required |  Default | Description                                                            |
| ------------------------------- | :------: | :------: | :------: | ---------------------------------------------------------------------- |
| title                           |  string  |  false   |    'Messagerie'   | Set the name of the chat                                      |
| newMessageTitle                 |  string  |  false   |    'Nouvelle discussion'   | Set the name of new discussion modal                 |
| setStyle                        |  string  |  false   |    'yad'   | Set the messaging style                                              |
| isMultiList                     |  boolean |  false   |    'false'   | Define whether the list of users for chat is multiple or not       |
| setSecondListUsersEndpoint      |  string  |  false   |    ' '   | Provide an endpoint for the second list the user can chat with              |
| setFirstListLabel               |  string  |  false   |    'Liste utilisateurs'   | Set label for first user list                             |
| setSecondListLabel              |  string  |  false   |    'Liste utilisateur 2'   | Set label for second user list                            |

## Styles

**Some attribute for custom css**

| Attribute                       |  Target  | Description                                                                                  |
| ------------------------------- | :------: | -------------------------------------------------------------------------------------------- |
| ._3oISP                         |          |                                                                                              |
| ._N0eEV                         |          |                                                                                              |
| ._3-4mn                         |          |                                                                                              |
| ._3rDVm                         |          |                                                                                              |
| ._2uoEp                         |          |                                                                                              |
| ._3nSUg                         |          |                                                                                              |
| ._P9G0Y                         |          |                                                                                              |
| ._1RfSY                         |          |                                                                                              |
| ._3sqmx                         |          |                                                                                              |

## License

MIT © [Papaul-msibiii](https://github.com/Papaul-msibiii)
