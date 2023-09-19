import React, { useEffect } from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import axios from 'axios'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRldkB2b2xrZW5vLmNvbSIsImV4cCI6MTk1NDMyMjM3OSwiZW1haWwiOiJkZXZAdm9sa2Vuby5jb20iLCJvcmlnX2lhdCI6MTY5NTEyMjM3OX0.hRkniFxpbFI33T8Df21zKKyDRoCIzzhwATsLKAGG0zk' /* provide the token */
const ApiBaseUrl = 'https://yaay-ak-doom-api.volkeno-engineering.click'

const App = () => {
  const socket =
    'https://yaay-ak-doom-socket.withvolkeno.com' /* initialize your socket */

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const [showProfil, setShowProfil] = React.useState(true)
  const [user, setUser] = React.useState(null)
  const [conversationsUser, setConversationsUser] = React.useState(null)
  const [userList, setUserList] = React.useState(null)

  useEffect(() => {
    axios
      .get(ApiBaseUrl + '/api/auth/me', config)
      .then((response) => {
        const userData = response.data.data
        setUser(userData)

        if (userData) {
          axios
            .get(
              ApiBaseUrl + `/api/user/${userData.slug}/conversations/`,
              config
            )
            .then((response) => {
              const conversationsData = response.data.results
              setConversationsUser(conversationsData)
            })
            .catch((error) => {
              console.error('Error:', error)
            })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  useEffect(() => {
    axios
      .get(ApiBaseUrl + '/api/medecins/?limit=1000', config)
      .then((response) => {
        const listUserData = response.data.results
        setUserList(listUserData)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  console.log(user)
  console.log(conversationsUser)

  return (
    <VolkenoReactMessenger
      user={user}
      socket={socket}
      token={token}
      conversationsUser={conversationsUser}
      showProfil={showProfil}
      setShowProfil={setShowProfil}
      // onSendMessage={onSendMessage}
      // onTyping={onTyping}
      // onChooseConversation={onChooseConversation}
      ApiBaseUrl={ApiBaseUrl}
      config={config}
      userList={userList}
    />
  )
}

export default App
