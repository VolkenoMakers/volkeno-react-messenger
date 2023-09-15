import React from 'react'
import { VolkenoReactMessenger } from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import { chatData, user } from './data'

const App = () => {
 
  return (
    <VolkenoReactMessenger
      me={user}
      data={chatData}
    />
  )
}

export default App
