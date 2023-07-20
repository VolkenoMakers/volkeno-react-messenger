import React from 'react'

import { VolkenoReactMessenger } from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import Avatar from "./assets/avatar.png"

const App = () => {
  return (
  <VolkenoReactMessenger 
      titlePage="Messages" 
      avatar={Avatar} 
      name="Esther Howard" 
      date="8:10 PM" 
      text="Lorem ipsum dolor sit amet consectetur. Cursus magna mollis." 
      StatutConnect="En ligne" 
      messageRecevied="Creation Ipsum is simply dummy text of the printing and
      typesetting industry."
      timeMessageReceved="09:04 PM"
      textMessageSend="Creation Ipsum is simply dummy text of the printing and typesetting
      industry."
      StatutMessageDelivered="Delivered"
  />)
}

export default App
