import * as React from 'react'
import styles from './styles.module.css'
import { Chat, ChatData, IUser } from './chatType'
import moment from 'moment'

interface Props {
  titlePage: string
  chatData: any
  me: IUser
  AddChat: any
  setConversation: any
}

export const VolkenoReactMessenger = ({
  titlePage,
  chatData,
  me,
  AddChat,
  setConversation
}: Props) => {
  // const userId = useAppSelector((s) => s.user.user?.id);
  const userId = me?.id

  // const [isSuccess, setIsSuccess] = React.useState<boolean>(true);
  const [filteredChat, setFilteredChat] = React.useState<ChatData[]>([])
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null)
  // const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedChat, setSelectedChat] = React.useState<ChatData | null>(null)
  const [conversationID, setConversationID] = React.useState<number | null>(
    null
  )
  // const sUser = useLocationState<IUser>(null);

  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    // if (isSuccess) {
    setFilteredChat(chatData)
    // }
  }, [
    chatData
    // isSuccess
  ])

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

  // React.useEffect(() => {
  //   if (!selectedUser) {
  //     if (sUser && userId !== sUser?.id) {
  //       setSelectedUser(sUser);
  //     } else {
  //       if (chatData?.length > 0) {
  //         setSelectedUser(chatData[0].user);
  //       }
  //     }
  //   }
  // }, [sUser, chatData, selectedUser, userId]);
  React.useEffect(() => {
    if (selectedUser) {
      setSelectedChat(
        chatData.find((l: any) => l.user.id === selectedUser.id) || null
      )
    } else {
      setSelectedChat(null)
    }
  }, [selectedUser, chatData])
  return (
    <div className={styles.containerPage}>
      <div className={styles.containerMessenger}>
        <div className={styles.containerSectionDiscussion}>
          <div className={styles.contentTitleDiscussion}>
            <p className={styles.titreMessagesBloc}>{titlePage}</p>
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
            {chatData &&
              chatData?.map((chat: any) => (
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
                // user={user}
                chat={selectedChat}
              />
            </div>
          </div>
        </div>
        <DetailsMessageTabsAdmin
          user={selectedUser}
          me={me}
          chat={selectedChat}
          allConversation={chatData}
          AddChat={AddChat}
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
  active,
  conversationID
}: {
  item: ChatData
  onClick: () => any
  active: boolean
  conversationID: any
}) {
  console.log(conversationID)
  const send = item?.lastMessage?.sender?.id !== item?.user?.id
  const receive = item?.lastMessage?.recever?.id !== item?.user?.id
  const [notRead, setNotRead] = React.useState([{}])
  React.useEffect(() => {
    setNotRead(item?.messages?.filter((itm) => itm?.is_read === false))
  }, [item?.messages])
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
                    {item?.lastMessage?.content?.slice(0, 30)}
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
                {/* <div className="">
                         <span className={`${styles.statutMessageTabsTraite}`}>
                         <i className="fa-solid fa-check-double"></i>
                         </span>
                       </div> */}
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
  AddChat,
  conversationID,
  allConversation,
  setConversation,
  setSelectedChat
}: {
  chat: ChatData | null
  user: IUser | null
  me: IUser
  AddChat: any
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
        AddChat={AddChat}
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
  user
}: {
  chat: ChatData | null
  user: IUser | null
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
        {/* <div>Pas de discussion ouverte</div> */}
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
      <div className={styles.containerChatInput}>
        <form>
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
                        name='reponse'
                        placeholder='Type your message here...'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.customBtnChatContainer}>
                <div className={styles.emoji}>
                  <i className='fa-regular fa-face-smile'></i>
                </div>
                <button type='submit' className={styles.btnSendMessageTabs}>
                  <i className='fa-solid fa-paper-plane'></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
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
        {/* <FiAlertCircle style={{ fontSize: 24 }} /> */}
        <h4>{message}</h4>
      </div>
    </div>
  )
}

function ChatInput({
  userId,
  AddChat,
  me,
  conversationID,
  conversation,
  allConversation,
  setConversation,
  setSelectedChat
}: {
  userId: number
  AddChat: any
  me: IUser
  conversationID: any
  conversation: any
  allConversation: any
  setConversation: any
  setSelectedChat: any
}) {
  // const user = useAppSelector((s) => s.user.user);
  // const addChat
  //   // , { isLoading, isError, isSuccess }
  //  = AddChat();
  console.log('setSelectedChat', setSelectedChat)
  const [message, setMessage] = React.useState('')
  // React.useEffect(() => {
  //   if (isError) {
  //     Swal.fire({
  //       icon: "error",
  //       iconColor: Color.themeColor,
  //       confirmButtonColor: Color.themeColor,
  //       title: "Message non envoyé",
  //     });
  //   }
  // }, [isError]);
  // React.useEffect(() => {
  //   if (isSuccess) {
  //     setMessage("");
  //   }
  // }, [isSuccess]);
  const onSubmit = React.useCallback(() => {
    if (message?.trim()?.length > 1) {
      AddChat({
        content: message,
        recever: userId,
        sender: me?.id,
        conversationID: conversationID
      })

      console.log('message', message)
      console.log('receverId', userId)
      console.log('senderId', me?.id)
      console.log('conversationID', conversationID)
      // let allMessages = conversation?.messages;
      // let lastMessageId = allMessages[allMessages?.length - 1]?.id;
      // let newMessage = {
      //   content: message,
      //   recever: userId,
      //   sender: me?.id,
      //   conversationID: conversationID

      // }

      let newMessage = {
        id: 10,
        content: message,
        date: '09:04 PM',
        type: 'send',
        sender: {
          id: me?.id
        },
        avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`
      }
      let index = allConversation.findIndex(
        ({ id }: any) => id === conversationID
      )

      conversation.messages.push(newMessage)
      // allConversation[index] = {
      //   ...allConversation[index]?.messages,
      //   ...conversation.messages,
      // };
      setConversation(allConversation)
      setSelectedChat(conversation.messages)
      console.log('conversation.messages', conversation.messages)
      console.log('index', index)
      setMessage('')
    }
  }, [
    message,
    // user,
    me,
    userId
  ])
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
              {/* {!isLoading && ( */}
              <button type='submit' className={styles.btnSendMessageTabs}>
                <i className='fa-solid fa-paper-plane'></i>
              </button>
              {/* )} */}
              {/* {isLoading && (
                  <button
                    disabled
                    type="button"
                    className={styles.btnSendMessageTabs}
                  >
                    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                  </button>
                )} */}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
