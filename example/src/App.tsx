import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import axios from 'axios'
import { ApiBaseUrl } from './data'
// const SOCKET_URL = '164.92.136.142:4026'

const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRldkB2b2xrZW5vLmNvbSIsImV4cCI6MTk1NDMyMjM3OSwiZW1haWwiOiJkZXZAdm9sa2Vuby5jb20iLCJvcmlnX2lhdCI6MTY5NTEyMjM3OX0.hRkniFxpbFI33T8Df21zKKyDRoCIzzhwATsLKAGG0zk'

const App = () => {
  const [user, setUser] = React.useState<any>({})
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

      user={user}
      token={token}
      apiBaseUrl={ApiBaseUrl}
      setApiPostEndpoint={'/api/messages/'}
      setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
      setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
      isMultiUserType={true}
      setSecondListUsersEndpoint={'/api/medecins'}
      setFirstListLabel ='Admin'
      setSecondListLabel ='Medecins'
    />
  )
}

export default App
