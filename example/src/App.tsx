import React from 'react'

import { VolkenoReactMessenger } from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import { recever, sender, usersList } from './data';
const App = () => {
  return (
  <VolkenoReactMessenger 
      titlePage="Messages" 
      StatutConnect="En ligne" 
      usersList={usersList}
      sender={sender}
      recever={recever}
      date="08h10PM"
  />)
}

export default App
