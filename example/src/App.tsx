import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'

// const SOCKET_URL = '164.92.136.142:4026'

const App = () => {

  return (
    <VolkenoReactMessenger
      user={{ }}
      token={ '' }
      apiBaseUrl={ '' }
      setApiPostEndpoint={ '' }
      setApiListUsersEndpoint={ '' }
      setApiConversationUserEndpoint={ '' }

      // user={user}
      // token={token}
      // apiBaseUrl={ApiBaseUrl}
      // setApiPostEndpoint={'/api/messages/'}
      // setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
      // setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
      setStyle='dag'
      isMultiList={true}
      setFirstListLabel ='Admin'
      // setSecondListLabel ='Medecins'
      // setSecondListUsersEndpoint={'/api/medecins'}
    />
  )
}

export default App
