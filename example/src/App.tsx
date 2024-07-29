// import axios from 'axios'
import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'

// // const SOCKET_URL = '164.92.136.142:4026'

// // yad
// // const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRldkB2b2xrZW5vLmNvbSIsImV4cCI6MTk1NDMyMjM3OSwiZW1haWwiOiJkZXZAdm9sa2Vuby5jb20iLCJvcmlnX2lhdCI6MTY5NTEyMjM3OX0.hRkniFxpbFI33T8Df21zKKyDRoCIzzhwATsLKAGG0zk' /* provide the token */
// const token =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2FwcC9lbi9sb2dpbiIsImlhdCI6MTcyMjI1MzY1NCwiZXhwIjoxNzIyMjU3MjU0LCJuYmYiOjE3MjIyNTM2NTQsImp0aSI6Iml5VEE4RGJaZ1JsWmVWQ0IiLCJzdWIiOiIxNzIyMjUzNjMxSFlGTEc1NDQwMDE0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.0oboR8LROTgmnLH6fhRCSB3eRZzfzmT_JRyhNtlcOSg' /* provide the token */

// // // yad
// // // const ApiBaseUrl = 'https://yaay-ak-doom-api.volkeno-engineering.click'
// const ApiBaseUrl = 'http://127.0.0.1:8000/api/v1/app/fr/'

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }
const App = () => {
  // const [user, setUser] = React.useState<any>(null)

  // React.useEffect(() => {
  //   axios
  //     // yad
  //     // .get(ApiBaseUrl + '/api/auth/me', config)
  //     .get(ApiBaseUrl + 'me', config)
  //     .then((response) => {
  //       const userData = response.data.data
  //       setUser(userData)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }, [])

  return (
    <VolkenoReactMessenger
      user={{}}
      token={''}
      apiBaseUrl={''}
      setApiPostEndpoint={''}
      setApiListUsersEndpoint={''}
      setApiConversationUserEndpoint={''}

      // user={user}
      // token={token}
      // apiBaseUrl={ApiBaseUrl}
      // // yad
      // // setApiPostEndpoint={'/api/messages/'}
      // setApiPostEndpoint={'messages'}
      // // yad
      // // setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
      // setApiListUsersEndpoint={'students/'}
      // // yad
      // // setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
      // setApiConversationUserEndpoint={`conversations-by-user/${user?.user_id}`}
      // setStyle='dag'
      // isMultiList={true}
      // setFirstListLabel='Étudiants'
      // dataStructure='new'
      // setSecondListLabel ='Helpers'
      // setSecondListUsersEndpoint={'user/helpers/'}
    />
  )
}

export default App
