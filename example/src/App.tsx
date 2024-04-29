import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import axios from 'axios'

// const SOCKET_URL = '164.92.136.142:4026'

const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRldkB2b2xrZW5vLmNvbSIsImV4cCI6MTk1NDMyMjM3OSwiZW1haWwiOiJkZXZAdm9sa2Vuby5jb20iLCJvcmlnX2lhdCI6MTY5NTEyMjM3OX0.hRkniFxpbFI33T8Df21zKKyDRoCIzzhwATsLKAGG0zk' /* provide the token */
const ApiBaseUrl = 'https://yaay-ak-doom-api.volkeno-engineering.click'
const App = () => {
  const [user, setUser] = React.useState<any>({})
  console.log('user', user)
   const config = {
     headers: {
       Authorization: `Bearer ${token}`
     }
   }
   // const socket = io(SOCKET_URL)
   React.useEffect(() => {
     axios
       .get(ApiBaseUrl + '/api/auth/me', config)
       .then((response) => {
         const userData = response.data.data
         setUser(userData)
       })
       .catch((error) => {
         console.error('Error:', error)
       })
   }, [config])
  return (
    <VolkenoReactMessenger
      // user={{ }}
      // token={ '' }
      // apiBaseUrl={ '' }
      // setApiPostEndpoint={ '' }
      // setApiListUsersEndpoint={ '' }
      // setApiConversationUserEndpoint={ '' }
      // socketUrl={SOCKET_URL}
      user={user}
      token={token}
      apiBaseUrl={ApiBaseUrl}
      setApiPostEndpoint={'/api/messages/'}
      setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
      setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
      // socketUrl={SOCKET_URL}
    />
  )
}

export default App
