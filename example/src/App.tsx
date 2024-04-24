import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import { ApiBaseUrl, chatData, token } from './data'

const SOCKET_URL = '164.92.136.142:4026'

const App = () => {

  return (
    <VolkenoReactMessenger
      user={chatData}
      token={ token }
      ApiBaseUrl={ApiBaseUrl}
      setApiPostEndpoint={ 'api/conversations' }
      setApiListUsersEndpoint={ 'api/users' }
      setApiConversationUserEndpoint={ 'api/conversations' }
      socketUrl={SOCKET_URL}
    />
  )
}

export default App
