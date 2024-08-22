// import axios from 'axios'
import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

// // const SOCKET_URL = '164.92.136.142:4026'

// // yad
// const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRldkB2b2xrZW5vLmNvbSIsImV4cCI6MTk1NDMyMjM3OSwiZW1haWwiOiJkZXZAdm9sa2Vuby5jb20iLCJvcmlnX2lhdCI6MTY5NTEyMjM3OX0.hRkniFxpbFI33T8Df21zKKyDRoCIzzhwATsLKAGG0zk' /* provide the token */
// // const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6InB5dGhvbmZvcmplYWdlckBnbWFpbC5jb20iLCJleHAiOjE5ODM1Mjg3MDUsImVtYWlsIjoicHl0aG9uZm9yamVhZ2VyQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNzI0MzI4NzA1fQ.ugj0-lbG_aW-uFKgUT1VIvxgdNlSUHqN7eWAMq5I5Gk' /* praticien */
// // const token =
// //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2FwcC9lbi9sb2dpbiIsImlhdCI6MTcyMzQ5NzcxMSwiZXhwIjoxNzIzNTAxMzExLCJuYmYiOjE3MjM0OTc3MTEsImp0aSI6InppWm1sUnF2b2J5aDE2UDciLCJzdWIiOiIxNzIzMjA1OTIzQzJLN1IzOTgyNDg0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.-Ak7TWOPaYvigYQLzP2rxTkUd5bmaX86xa_pmNs-uBM' /* provide the token */

// // // yad
// const ApiBaseUrl = 'https://yaay-ak-doom-api.volkeno-engineering.click'
// // const ApiBaseUrl = 'http://127.0.0.1:8000/api/v1/app/fr/'

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
  //     .get(ApiBaseUrl + '/api/auth/me', config)
  //     // .get(ApiBaseUrl + 'me', config)
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
      socketUrl={''}

      // user={user}
      // token={token}
      // apiBaseUrl={ApiBaseUrl}
      // // yad
      // setApiPostEndpoint={'/api/messages/'}
      // // setApiPostEndpoint={'messages'}
      // // yad
      // setApiListUsersEndpoint={'/api/medecins/?limit=1000'}
      // // setApiListUsersEndpoint={'students/'}
      // // yad
      // setApiConversationUserEndpoint={`/api/user/${user?.slug}/conversations/`}
      // // setApiConversationUserEndpoint={`conversations-by-user/${user?.user_id}`}
      // setStyle='yad'
      // isMultiList={false}
      // // setFirstListLabel='Étudiants'
      // dataStructure='old'
      // // setSecondListLabel ='Helpers'
      // // setSecondListUsersEndpoint={'user/helpers/'}
      // socketUrl={'http://localhost:443'}
      // // socketUrl={'https://socket-dag.volkeno.com'}
    />
  )
}

export default App
