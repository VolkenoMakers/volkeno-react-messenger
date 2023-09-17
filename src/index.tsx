import * as React from 'react'
import styles from './styles.module.css'
import { Chat, ChatData, IUser } from './chatType'
import moment from 'moment'
import { usersList } from './data';
import Modal from 'react-modal';

interface Props {
  title?: string
  data: any
  me: IUser
}

export const VolkenoReactMessenger = ({
  title = 'Messagerie',
  data,
  me
}: Props) => {
  const userId = me?.id

  const [filteredChat, setFilteredChat] = React.useState<ChatData[]>([])
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null)
  const [selectedChat, setSelectedChat] = React.useState<ChatData | null>(null)
  const [conversationID, setConversationID] = React.useState<number | null>(
    null
  )

  const [conversation, setConversation] = React.useState<any>()
  const [modalNewChat, setModalNewChat] = React.useState<boolean>(false);

  React.useEffect(() => {
    setConversation(data)
  }, [])

  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    setFilteredChat(conversation)
  }, [conversation])

  React.useEffect(() => {
    let newCount = 0
    if (filteredChat?.length) {
      filteredChat.forEach((item) => {
        newCount += item?.messages?.filter(
          (el) => el?.recever?.id === userId && el?.is_read === false
        )?.length
      })
    }
    setCount(newCount)
    console.log(count)
  }, [filteredChat])

  React.useEffect(() => {
    if (selectedUser) {
      setSelectedChat(
        conversation.find((l: any) => l.user.id === selectedUser.id) || null
      )
    } else {
      setSelectedChat(null)
    }
  }, [selectedUser, conversation])

function openModalNewChat(e: any) {
  e.preventDefault();
  setModalNewChat(true);
}
  return (
    <div className={styles.containerPage}>
      <div className={styles.containerMessenger}>
        <div className={styles.containerSectionDiscussion}>
          <div className={styles.headerSectionDiscussion}>
            <div className={styles.contentTitleDiscussion}>
              <p className={styles.titreMessagesBloc}>{title}</p>
            </div>
            <div className={styles.containerBtnAddNewMessage}>
              <button className={styles.btnAddNewMessage}  onClick={openModalNewChat}>
                <i className="fa-solid fa-plus"></i>
              </button>
              <NewChatModal
                  modalNewChat={modalNewChat}
                  setModalNewChat={setModalNewChat}
                />
            </div>
          </div>
          <div className={styles.blocSearchMessage}>
            <form>
              <div className={styles.customPosRelative}>
                <input
                  className={styles.formControlSearch}
                  type='search'
                  placeholder='Rechercher'
                />
                <button
                  type='submit'
                  value='search'
                  className={styles.btnSearchIcon}
                >
                  <i className='fa fa-search' aria-hidden='true'></i>
                </button>
              </div>
            </form>
          </div>
          <ul className={styles.listGroupMessage}>
            {conversation &&
              conversation?.map((chat: any) => (
                <Sommaire
                  active={selectedChat === chat}
                  item={chat}
                  onClick={() => {
                    setConversationID(chat?.id)
                    setSelectedUser(chat?.user)
                  }}
                  key={chat?.user?.id}
                  conversationID={conversationID}
                />
              ))}
          </ul>
          <div className={styles.noViewDesktop}>
            <div className={styles.detailMessageMobile}>
              <DetailsMessageMobile
                user={selectedUser}
                me={me}
                chat={selectedChat}
                allConversation={conversation}
                conversationID={conversationID}
                setConversation={setConversation}
                setSelectedChat={setSelectedChat}
              />
            </div>
          </div>
        </div>
        <DetailsMessageTabsAdmin
          user={selectedUser}
          me={me}
          chat={selectedChat}
          allConversation={conversation}
          conversationID={conversationID}
          setConversation={setConversation}
          setSelectedChat={setSelectedChat}
        />
      </div>
    </div>
  )
}

function Sommaire({
  item,
  onClick,
  active
}: // conversationID
{
  item: ChatData
  onClick: () => any
  active: boolean
  conversationID: any
}) {
  // console.log(conversationID)
  const send = item?.lastMessage?.sender?.id !== item?.user?.id
  const receive = item?.lastMessage?.recever?.id !== item?.user?.id
  const [notRead, setNotRead] = React.useState([{}])
  React.useEffect(() => {
    setNotRead(item?.messages?.filter((itm) => itm?.is_read === false))
  }, [item?.messages])

  var lastIndice = item?.messages.length - 1
  return (
    <li
      onClick={onClick}
      className={`${styles.listGroupItemMeessage} ${active && styles.active} `}
    >
      <div>
        <div className={styles.blocProfilContact}>
          <div className={styles.containerListMessageItem}>
            <div>
              <img
                src={item?.user?.avatar}
                className={styles.imgMessgeContact}
                alt='image profil contact'
              />
            </div>
            <div className={styles.contentTextMessageList}>
              <div className={styles.containerHeaderMessageList}>
                <p className={styles.nomContact}>
                  {item?.user?.prenom} {item?.user?.nom}
                </p>
                <p className={styles.timeMessageContact}>
                  {moment(item?.lastMessage?.created_at).calendar()}
                </p>
              </div>
              <div className={styles.blocMessageContact}>
                <div className=''>
                  <p className={styles.contenuMessageContact}>
                    {item?.messages[lastIndice]?.content?.slice(0, 20)}
                  </p>
                </div>
                <div className=''>
                  {receive && notRead?.length > 0 && (
                    <span>
                      <span className='statutMessageTabsNonLu'>
                        {notRead?.length}
                      </span>
                    </span>
                  )}
                  {send && (
                    <span className=''>
                      <span
                        className={
                          notRead?.length === 0
                            ? styles.statutMessageTabsTraite
                            : styles.statutMessageTabsNonTraite
                        }
                      >
                        <i className='fa-solid fa-check-double'></i>
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function DetailsMessageTabsAdmin({
  chat,
  user,
  me,
  conversationID,
  allConversation,
  setConversation,
  setSelectedChat
}: {
  chat: ChatData | null
  user: IUser | null
  me: IUser

  conversationID: any
  allConversation: any
  setConversation: any
  setSelectedChat: any
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight
      })
    }
  }, [ref.current, chat?.messages])

  if (!user)
    return (
      <div className={styles.dtailsMessagesTabsComponent}>
        <AlertInfo message='Pas de discussion ouverte' />
      </div>
    )

  return (
    <div className={styles.containerDetailMessage}>
      <div className={styles.containerSectionHeaderDetailMessage}>
        <div className={styles.contentImgProfil}>
          <img
            src={user?.avatar}
            className={styles.imgReceivedMsg}
            alt='profil image'
          />
        </div>
        <div className={styles.contentTextUserConnectMessage}>
          <div className={styles.msgUserInfosContainer}>
            <div className={styles.contentMsgUserName}>
              <p className={styles.profilDetailMessage}>
                {user?.prenom} {user?.nom}
              </p>
            </div>
            <div
              className={`${styles.blocUserDisconnectTime} ${styles.msgUserLastonline}`}
            >
              <p className={styles.textDisconnectTime}>En ligne</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blocDetails}>
        {chat?.messages?.map((message) => {
          if (message?.sender?.id === user?.id) {
            return <Message item={message} key={message?.id} />
          }
          return <Response item={message} key={message?.id} />
        })}
      </div>
      <ChatInput
        userId={user?.id}
        me={me}
        conversationID={conversationID}
        conversation={chat}
        allConversation={allConversation}
        setConversation={setConversation}
        setSelectedChat={setSelectedChat}
      />
    </div>
  )
}

function DetailsMessageMobile({
  chat,
  user,
  me,
  conversationID,
  allConversation,
  setConversation,
  setSelectedChat
}: {
  chat: ChatData | null
  user: IUser | null
  me: IUser

  conversationID: any
  allConversation: any
  setConversation: any
  setSelectedChat: any
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight
        })
      }
    }, 500)
  }, [ref.current, chat])
  if (!user)
    return (
      <div className={styles.detailsMessagesMobile}>
        <AlertInfo message='Pas de discussion ouverte' />
      </div>
    )

  return (
    <div className={styles.containerDetailMessageMobile}>
      <div className={styles.containerSectionHeaderDetailMessage}>
        <div className={styles.contentImgProfil}>
          <img
            src={user?.avatar}
            className={styles.imgReceivedMsg}
            alt='profil detail message'
          />
        </div>
        <div className={styles.contentTextUserConnectMessage}>
          <div className={styles.msgUserInfosContainer}>
            <div className={styles.contentMsgUserName}>
              <p className={styles.profilDetailMessage}>
                {user?.prenom} {user?.nom}
              </p>
            </div>
            <div
              className={`${styles.blocUserDisconnectTime} ${styles.msgUserLastonline}`}
            >
              <p className={styles.textDisconnectTime}>En ligne</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blocDetails}>
        {chat?.messages?.map((message) => {
          if (message?.sender?.id === user?.id) {
            return <Message item={message} key={message?.id} />
          }
          return <Response item={message} key={message?.id} />
        })}
      </div>

      <ChatInput
        userId={user?.id}
        me={me}
        conversationID={conversationID}
        conversation={chat}
        allConversation={allConversation}
        setConversation={setConversation}
        setSelectedChat={setSelectedChat}
      />
    </div>
  )
}

function Message({ item }: { item: Chat }) {
  return (
    <div className={styles.receivedMsgItem}>
      <div className={styles.conatinerReceivedMsgItem}>
        <div className={styles.contentImgReceivedMsgItem}>
          {item?.avatar && (
            <img
              src={item?.avatar}
              className={styles.imgReceivedMsg}
              alt='image profil contact'
            />
          )}
        </div>
        <div className={styles.containerTextMessageRecu}>
          <div className={styles.blocMessageRecu}>
            <div className={styles.textMessageRecu}>{item?.content}</div>
          </div>
          <span className={styles.timeDetailMessage}>
            {moment(item?.created_at).calendar()}
          </span>
        </div>
      </div>
    </div>
  )
}

function Response({ item }: { item: Chat }) {
  return (
    <div className={styles.blocReponse}>
      <div className={styles.sendingMsgItem}>
        <div className={styles.blocMessageEnvoyer}>
          <div className={styles.textMessageEnvoyer}>{item?.content}</div>
        </div>
        <div className={styles.contentStatutMessageDelivered}>
          <span className={styles.timeDetailMessage}>
            {moment(item?.created_at).calendar()}
          </span>
        </div>
      </div>
    </div>
  )
}

type PropsType = {
  message: string
}
export function AlertInfo({ message }: PropsType) {
  return (
    <div className='px-3'>
      <div className={styles.messengerAlert} role='alert'>
        <h4>{message}</h4>
      </div>
    </div>
  )
}

function ChatInput({
  userId,
  me,
  conversationID,
  conversation,
  allConversation,
  setConversation,
  setSelectedChat
}: {
  userId: number

  me: IUser
  conversationID: any
  conversation: any
  allConversation: any
  setConversation: any
  setSelectedChat: any
}) {
  const [message, setMessage] = React.useState('')

  const AddChat = (data: any) => console.log('message envoyer', data)

  const onSubmit = async () => {
    if (message?.trim()?.length > 0) {
      // Envoyez le message à votre API via AddChat si nécessaire
      await AddChat({
        content: message,
        recever: userId,
        sender: me?.id,
        conversationID: conversationID
      })

      const newMessage = {
        id: conversation.messages.length + 1, // Générez un ID unique pour le nouveau message
        content: message,
        date: new Date().toLocaleTimeString(), // Utilisez une date réelle
        type: 'send',
        sender: {
          id: me?.id
        },
        avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`
      }

      // Mettez à jour l'état local de la conversation
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, newMessage]
      }

      // Mettez à jour l'état local de toutes les conversations
      const updatedAllConversations = allConversation.map((c: any) => {
        if (c.id === conversationID) {
          return updatedConversation
        }
        return c
      })

      setConversation(updatedAllConversations)
      setSelectedChat(updatedConversation.messages)

      // Réinitialisez le champ de message
      setMessage('')
    }
  }

  return (
    <div className={styles.containerChatInput}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className={styles.leftFooter}>
          <div className={styles.leftFooterContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <div className={styles.containerDisplayInputMessage}>
                  <span className={styles.share}>
                    <i className='fa-solid fa-link img-icon-chat'></i>
                  </span>
                  <div className={styles.containerTextarea}>
                    <textarea
                      className={styles.textarreaMessageCustomChat}
                      rows={1}
                      value={message}
                      required
                      onChange={(e) => setMessage(e.target.value)}
                      name='reponse'
                      placeholder='Type your message here...'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.customBtnChatContainer}>
              <div className={styles.emoji}>
                <i className='fa-regular fa-face-smile' id='mytextarea'></i>
              </div>
              <button type='submit' className={styles.btnSendMessageTabs}>
                <i className='fa-solid fa-paper-plane'></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

// function ChatInput({
//   userId,
//   AddChat,
//   me,
//   conversationID,
//   conversation,
//   allConversation,
//   setConversation,
//   setSelectedChat
// }: {
//   userId: number
//   AddChat: any
//   me: IUser
//   conversationID: any
//   conversation: any
//   allConversation: any
//   setConversation: any
//   setSelectedChat: any
// }) {
//   console.log('setSelectedChat', setSelectedChat)
//   const [message, setMessage] = React.useState('')

//   const onSubmit = React.useCallback(() => {
//     if (message?.trim()?.length > 1) {
//       AddChat({
//         content: message,
//         recever: userId,
//         sender: me?.id,
//         conversationID: conversationID
//       })

//       console.log('message', message)
//       console.log('receverId', userId)
//       console.log('senderId', me?.id)
//       console.log('conversationID', conversationID)
//       // let allMessages = conversation?.messages;
//       // let lastMessageId = allMessages[allMessages?.length - 1]?.id;
//       // let newMessage = {
//       //   content: message,
//       //   recever: userId,
//       //   sender: me?.id,
//       //   conversationID: conversationID

//       // }

//       let newMessage = {
//         id: 10,
//         content: message,
//         date: '09:04 PM',
//         type: 'send',
//         sender: {
//           id: me?.id
//         },
//         avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`
//       }
//       let index = allConversation.findIndex(
//         ({ id }: any) => id === conversationID
//       )

//       conversation.messages.push(newMessage)
//       // allConversation[index] = {
//       //   ...allConversation[index]?.messages,
//       //   ...conversation.messages,
//       // };
//       setConversation(allConversation)
//       setSelectedChat(conversation.messages)
//       console.log('conversation.messages', conversation.messages)
//       console.log('index', index)
//       setMessage('')
//     }
//   }, [
//     message,
//     // user,
//     me,
//     userId
//   ])

//   return (
//     <div className={styles.containerChatInput}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//           onSubmit()
//         }}
//       >
//         <div className={styles.leftFooter}>
//           <div className={styles.leftFooterContainer}>
//             <div className={styles.inputGroup}>
//               <div className={styles.inputContainer}>
//                 <div className={styles.containerDisplayInputMessage}>
//                   <span className={styles.share}>
//                     <i className='fa-solid fa-link img-icon-chat'></i>
//                   </span>
//                   <div className={styles.containerTextarea}>
//                     <textarea
//                       className={styles.textarreaMessageCustomChat}
//                       rows={1}
//                       value={message}
//                       required
//                       onChange={(e) => setMessage(e.target.value)}
//                       name='reponse'
//                       placeholder='Type your message here...'
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.customBtnChatContainer}>
//               <div className={styles.emoji}>
//                 <i className='fa-regular fa-face-smile' id='mytextarea'></i>
//               </div>
//               <button type='submit' className={styles.btnSendMessageTabs}>
//                 <i className='fa-solid fa-paper-plane'></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

function NewChatModal  ({ modalNewChat, setModalNewChat}:{ modalNewChat: boolean, setModalNewChat:any } ) {

 
  function closeModalNewChat() {
    setModalNewChat(false);
  }


  return (
    <Modal
      isOpen={modalNewChat}
      onRequestClose={closeModalNewChat}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
      id="contentModal"
    >
      <div className={styles.modalHeader}>
        <h5 className={styles.modalTitle}>
          Nouvelle discussion
        </h5>
         <button
            className={styles.authSubmitAnnuler}
            type="button"
            onClick={closeModalNewChat}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
      </div>
      {/* <div className="content-btn-send-message flex-r">
        <button className="btn btn-send-message-modal disabled">Suivant</button>
      </div> */}
      <div className="pt-3">
        <div className={styles.formSearchUserContainer}>
          <input
            type="text"
            className={styles.formSearchUser}
            placeholder="Rechercher des personnes"
          />
          <i className='fa fa-search' aria-hidden='true'
            style={{
              color: "#919EAB",
              fontSize: 22,
              position: "absolute",
              top: "25%",
              left: "2%",
            }}
          ></i>
        </div>
      </div>
     <div className={styles.containerListUsersMessages}>
       <ul className={styles.userForSendMessageContainer}>
          {usersList?.map((item: any) => (

            <li
            className={styles.userForSendMessage}
            key={item.id} 
            >
              <button
                  className={styles.BtnRedirectNewMessage}
                >
                  <div className={styles.containerRedirectNewMessage}>
                    <div>
                      <img
                        src={item?.avatar}
                        alt="user-avatar"
                        className={styles.imgProfilUserMessage}
                      />
                    </div>
                    <div className={styles.userForSendMessageInfos}>
                      <h3>{item?.name} {item?.lastName}</h3>
                      <h4>Online - Last seen, 2.02pm</h4>
                    </div>
                  </div>
                </button>
            </li>
          ))}
        </ul>
     </div>
    </Modal>
  );
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height:"80%",
    zIndex: 99999,
    overflow: "hidden",
  },
};