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

| Property                        |   Type   | Required | Value |  Default | Description                                                            |
| ------------------------------- | :------: | :------: | :---: | :------: | ---------------------------------------------------------------------- |
| user                            |  object  |  true    |   -   |    { }   | Provide logged in user data                                            |
| token                           |  string  |  true    |   -   |    ' '   | Provide logged in user token                                           |
| apiBaseUrl                      |  string  |  true    |   -   |    ' '   | Provide api base url                                                   |
| setApiPostEndpoint              |  string  |  false   |   -   |    '/api/messages'   | Provide the endpoint to post messages                      |
| setApiListUsersEndpoint         |  string  |  true    |   -   |    ' '   | Provide an endpoint for the first list or list of all users the user can chat with     |
| setApiConversationUserEndpoint  |  string  |  true    |   -   |    ' '   | Provide the endpoint for the user's list of all conversations          |
<!-- | socketUrl                       |  string  |  true    |    '164.92.136.142:4026'   | Provide socket url                                   | -->

**Other props**

| Property                        |   Type   | Required | Value |  Default | Description                                                            |
| ------------------------------- | :------: | :------: | :---: | :------: | ---------------------------------------------------------------------- |
| title                           |  string  |  false   |   -   |    'Messagerie'   | Set the name of the chat                                      |
| newMessageTitle                 |  string  |  false   |   -   |    'Nouvelle discussion'   | Set the name of new discussion modal                 |
| setStyle                        |  string  |  false   | 'yad' \| 'dag' |    'yad'  | Set the messaging style                                       |
| isMultiList                     |  boolean |  false   |   -   |    'false'   | Define whether the list of users for chat is multiple or not       |
| setSecondListUsersEndpoint      |  string  |  false   |   -   |    ' '   | Provide an endpoint for the second list the user can chat with         |
| setFirstListLabel               |  string  |  false   |   -   |    'Liste utilisateurs'   | Set label for first user list                         |
| setSecondListLabel              |  string  |  false   |   -   |    'Liste utilisateur 2'   | Set label for second user list                       |

## Styles

**Some attribute for custom css**

| Attribute ('yad' \| 'dag')     |  Target  | Description                                                                                      |
| ------------------------------ | :------: | ------------------------------------------------------------------------------------------------ |
| ._3oISP \| _Ib6zq              | Text block of messages send | To be used to customize the style of the block for messages sent by the user  |
| ._N0eEV \| _3PC7-              | Text block of received messages | Use to customize the style of the block for messages received by the user |
| ._3-4mn \| _2RbgV              | Input textarea | Use to customize the style of the textarea input                                           |
| ._3rDVm \| _3kpUp              | Input search | Use to customize the style of the conversations input search                                 |
| ._yBqpy \| _13Qr-              | Button new conversation | Use to customize the style of the add new conversation button                     |
| ._3sqmx \| _300kl              | Conversation item | Use to customize the style of conversation items (list-group-item)                      |
| ._3nSUg \| _2o4zq              | Conversation (user name) | Use to customize the username style in conversation item                         |
| ._P9G0Y \| _35Req              | Conversation (time) | Use to customize the style of the sending date in conversation item                   |
| ._1RfSY \| _1RfSY              | Conversation (last message preview) | Use to customize the style of the preview of the last message in conversation item |
| ._1wrfJ                        | Modal (user item) | To be used to customize the style of the user list of the new discussion modal          |

**Troubleshoot**

After installing the module, you may notice a style problem regarding the active conversation. This is due to the default style of bootstrap | react bootstrap.
Add these lines of css code to your index.css file and that should solve the problem :)

Yad style

```css
._3sqmx {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
._3sqmx.active,
._3sqmx:hover {
  background-color: #F5F6FD;
  border-color: #F5F6FD;
  color: #102844;
  cursor: pointer !important;
}
```

Dag style

```css
._300kl {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
._300kl.active,
._300kl:hover {
  background-color: #00C2CB1A;
  border: none;
  color: #1D2026;
  cursor: pointer !important;
}
```

## License

MIT © [Papaul-msibiii](https://github.com/Papaul-msibiii)
