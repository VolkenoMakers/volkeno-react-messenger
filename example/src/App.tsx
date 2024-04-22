import React from 'react'
import VolkenoReactMessenger from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
const SOCKET_URL = '164.92.136.142:4026'

const App = () => {

  return (
    <VolkenoReactMessenger
      socketUrl={SOCKET_URL}
      user={{}}
      token={''}
      conversationsUser={[]}
      ApiBaseUrl={''}
      userList={[]}
    />
  )
}

export default App
