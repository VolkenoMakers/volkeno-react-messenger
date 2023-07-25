import React from 'react'
import { VolkenoReactMessenger } from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import { chatData, recever, sender, user, usersList } from './data'

const App = () => {
  return (
    <VolkenoReactMessenger
      titlePage='Messages'
      StatutConnect='En ligne'
      usersList={usersList}
      user={user}
      sender={sender}
      recever={recever}
      chatData={chatData}
    />
  )
}

export default App
