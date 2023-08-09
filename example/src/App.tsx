import React, { useEffect, useState } from 'react'
import { VolkenoReactMessenger } from 'volkeno-react-messenger'
import 'volkeno-react-messenger/dist/index.css'
import { chatData, useAddChatMutation, user } from './data'

const App = () => {
  const [conversation, setConversation] = useState<any>();

  useEffect(() => {
    setConversation(chatData);
  }, [])
  
  return (
    <VolkenoReactMessenger
      titlePage='Messages'
      me={user}
      chatData={conversation}
      setConversation={setConversation}
      AddChat={useAddChatMutation}
    />
  )
}

export default App
