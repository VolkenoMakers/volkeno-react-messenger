import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'

const SOCKET_URL = '164.92.136.142:4026'

const App = () => {

  return (
    <VolkenoReactMessenger
      user={{ }}
      token={ '' }
      ApiBaseUrl={ '' }
      setApiPostEndpoint={ '' }
      setApiListUsersEndpoint={ '' }
      setApiConversationUserEndpoint={ '' }
      socketUrl={SOCKET_URL}
    />
  )
}

export default App
