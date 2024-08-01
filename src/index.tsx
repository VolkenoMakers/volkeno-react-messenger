/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import axios, { AxiosRequestConfig } from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'
import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import {
  formatDateHour,
  getAvatar,
  getUserPseudo,
  truncateCaractere
} from './Utils'
import PropTypes from 'prop-types'
import { AiFillPlusCircle } from 'react-icons/ai'
import { HiPlus } from 'react-icons/hi2'
import { BsCheck2All } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { Form, ListGroup } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select'
import { AlertInfo } from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faLink } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'

interface IVolkenoReactMessenger {
  user: any
  token: string | undefined | null
  apiBaseUrl: string
  setApiPostEndpoint: string
  setApiListUsersEndpoint: string
  setApiConversationUserEndpoint: string
  title?: string
  newMessageTitle?: string
  setStyle?: 'yad' | 'dag'
  isMultiList?: boolean
  setSecondListUsersEndpoint?: string
  setFirstListLabel?: string
  setSecondListLabel?: string
  dataStructure?: 'old' | 'new'
}
const VolkenoReactMessenger = ({
  user,
  token,
  apiBaseUrl,
  setApiPostEndpoint = '/api/messages',
  setApiListUsersEndpoint,
  setApiConversationUserEndpoint,
  title = 'Messagerie',
  newMessageTitle = 'Nouvelle discussion',
  setStyle = 'yad',
  isMultiList = false,
  setSecondListUsersEndpoint,
  setFirstListLabel = 'Liste utilisateurs',
  setSecondListLabel = 'Liste utilisateur 2',
  dataStructure = 'old'
}: IVolkenoReactMessenger) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } as AxiosRequestConfig
  const [socket, setSocket] = React.useState<any>(null)
  const [onlineUsers, setOnlineUsers] = React.useState<any>([])

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const newSocket = io(
      process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001'
    )
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  const [showProfil, setShowProfil] = React.useState(true)
  const [modalNewChat, setModalNewChat] = React.useState<boolean>(false)
  const [modalNewChatDag, setModalNewChatDag] = React.useState<boolean>(false)
  const [listUser, setListUser] = React.useState(null)
  const [secondListUser, setSecondListUser] = React.useState(null)
  const [listToShow, setListToShow] = React.useState(listUser)
  const [listlabel, setListLabel] = React.useState(setFirstListLabel)
  const [conversations, setConversations] = React.useState<any>([])
  const [receiver, setReceiver] = React.useState<any>(null)
  const [conversationActive, setConversationActive] = React.useState<any>(null)
  const [message, setMessage] = React.useState('')
  const [messageDag, setMessageDag] = React.useState('')
  const [messages, setMessages] = React.useState<any>([])
  const [sendingMessage, setSendingMessage] = React.useState(false)
  const [sendingMessageDag, setSendingMessageDag] = React.useState(false)
  const [disableBtn, setDisableBtn] = React.useState(true)
  // const [text, setText] = useState('')
  // const [typingStatus, setTypingStatus] = React.useState<any>('')
  const lastMessageRef = React.useRef<any>(null)
  console.log('receiver', receiver)
  const isStyleYad = (setStyle: string) => {
    return setStyle === 'yad'
  }

  const isStyleDag = (setStyle: string) => {
    return setStyle === 'dag'
  }

  const [newMessage, setNewMessage] = React.useState<any>(null)

  // add online users
  React.useEffect(() => {
    if (socket === null) return
    console.log({ socket })
    socket.emit('addNewUser', user?.user_id)
    socket.on('getOnlineUsers', (res: React.SetStateAction<never[]>) => {
      setOnlineUsers(res)
    })

    return () => {
      socket.off('getOnlineUsers')
    }
  }, [socket])

  console.log({ conversationActive })

  // send message
  React.useEffect(() => {
    if (socket === null) return

    const recipientId =
      user?.user_id === conversationActive.initial_sender_id
        ? conversationActive.receiver_id
        : conversationActive.initial_sender_id

    socket.emit('sendMessage', { ...newMessage, recipientId })
  }, [newMessage])

  // receive message and notification
  React.useEffect(() => {
    if (socket === null) return

    socket.on('getMessage', (res: any) => {
      console.log({ res })
      console.log('messagesA', messages)
      if (conversationActive?.id !== res.conversation_id) return
      setMessages((prev: any) => [...prev, res?.message])
      console.log({ messages })
    })

    // socket.on('getNotification', (res) => {
    //   const isChatOpen = currentChat?.members.some((id) => id === res.senderId)

    //   if (isChatOpen) {
    //     setNotifications((prev) => [{ ...res, isRead: true }, ...prev])
    //   } else {
    //     setNotifications((prev) => [res, ...prev])
    //   }
    // })

    return () => {
      socket.off('getMessage')
      // socket.off('getNotification')
    }
  }, [socket, conversationActive?.id, newMessage])

  React.useEffect(() => {
    if (user) {
      axios
        .get(apiBaseUrl + setApiListUsersEndpoint, config)
        .then((response) => {
          const listUserData =
            dataStructure === 'old' ? response.data.results : response.data.data
          setListUser(listUserData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [user])

  React.useEffect(() => {
    if (user) {
      axios
        .get(apiBaseUrl + setApiConversationUserEndpoint, config)
        .then((response) => {
          const conversationsData =
            dataStructure === 'old' ? response.data.results : response.data.data
          setConversations(conversationsData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [user, socket])

  React.useEffect(() => {
    if (user && isMultiList) {
      axios
        .get(apiBaseUrl + setSecondListUsersEndpoint, config)
        .then((response) => {
          const listUserData =
            dataStructure === 'old' ? response.data.results : response.data.data
          setSecondListUser(listUserData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [user])
  React.useEffect(() => {
    if (!isMultiList) {
      setDisableBtn(false)
    }
  }, [isMultiList])

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (message.trim()) {
      setSendingMessage(true)
      let data = {}
      if (receiver != null) {
        if (dataStructure === 'old') {
          data = {
            content: message,
            sender: user?.id,
            receiver: receiver?.id,
            read: false,
            conversation: conversationActive?.id || null
          }
        } else {
          data = {
            message: message,
            sender_id: user?.user_id,
            receiver_id: receiver?.user_id
          }
        }
      } else {
        const receiverId = conversationActive?.participants?.find(
          (item: any) => item?.id !== user?.id
        )?.id

        if (dataStructure === 'old') {
          data = {
            content: message,
            sender: user?.id,
            receiver: receiverId,
            conversation: conversationActive?.id || null
          }
        } else {
          data = {
            message: message,
            sender_id: user?.user_id,
            receiver_id: receiverId,
            conversation_id: conversationActive?.id
          }
        }
      }
      try {
        const response = await axios.post(
          apiBaseUrl + setApiPostEndpoint,
          data,
          config
        )
        const activeConversationIndex =
          dataStructure === 'old'
            ? response?.data?.conversation?.messages
            : response?.data?.data.findIndex(
                (conv: any) => conv.id === conversationActive?.id
              )

        if (activeConversationIndex !== -1) {
          const newMessages =
            dataStructure === 'old'
              ? response?.data?.conversation?.messages
              : response?.data?.data[activeConversationIndex]?.messages

          if (newMessages) {
            const sortedMessages = newMessages
              .slice()
              .sort((a: any, b: any) => {
                const dateA = new Date(a.created_at).getTime()
                const dateB = new Date(b.created_at).getTime()
                return dateA - dateB
              })

            setNewMessage(sortedMessages[sortedMessages?.length - 1])
            // setMessages(sortedMessages)
          } else {
            console.error('No messages found in the response')
          }

          setConversationActive(
            dataStructure === 'old'
              ? response?.data?.conversation
              : response?.data?.data[activeConversationIndex]
          )
          setConversations(
            dataStructure === 'old'
              ? response?.data?.conversation
              : response?.data?.data
          )
        } else {
          console.error('Active conversation not found in the response')
        }
      } catch (error) {
        console.error(`Error: ${error}`)
      }
      setSendingMessage(false)
      setMessage('')
    }
  }
  const handleSendMessageModal = async (e: any) => {
    e.preventDefault()
    if (messageDag.trim()) {
      setSendingMessageDag(true)
      let data = {}
      if (receiver != null) {
        if (dataStructure === 'old') {
          data = {
            content: messageDag,
            sender: user?.id,
            receiver: receiver?.id
          }
        } else {
          data = {
            message: messageDag,
            initial_sender_id: user?.user_id,
            receiver_id: receiver?.user_id
          }
        }
      } else {
        if (dataStructure === 'old') {
          data = {
            content: messageDag,
            sender: user?.id,
            receiver: conversationActive?.participants?.find(
              (item: any) => item?.id !== user?.id
            )?.id,
            conversation: conversationActive?.id
          }
        } else {
          data = {
            message: messageDag,
            sender_id: user?.user_id,
            receiver_id: conversationActive?.participants?.find(
              (item: any) => item?.id !== user?.user_id
            )?.id,
            conversation_id: conversationActive?.id
          }
        }
      }
      try {
        const response = await axios.post(
          apiBaseUrl + setApiPostEndpoint,
          data,
          config
        )

        console.log('response', response?.data?.data)
        const activeConversationIndex =
          dataStructure === 'old'
            ? response?.data?.conversation?.messages
            : response?.data?.data.findIndex(
                (conv: any) => conv.id === conversationActive?.id
              )

        if (activeConversationIndex !== -1) {
          const newMessages =
            dataStructure === 'old'
              ? response?.data?.conversation?.messages
              : response?.data?.data[activeConversationIndex]?.messages

          if (newMessages) {
            const sortedMessages = newMessages
              .slice()
              .sort((a: any, b: any) => {
                const dateA = new Date(a.created_at).getTime()
                const dateB = new Date(b.created_at).getTime()
                return dateA - dateB
              })

            setNewMessage(sortedMessages[sortedMessages?.length - 1])
            // setMessages(sortedMessages)
          } else {
            console.error('No messages found in the response')
          }

          setConversationActive(
            dataStructure === 'old'
              ? response?.data?.conversation
              : response?.data?.data[activeConversationIndex]
          )
          setConversations(
            dataStructure === 'old'
              ? response?.data?.conversation
              : response?.data?.data
          )
          setMessageDag('')
        } else {
          setReceiver(null)
          setConversations(response?.data?.data)
          setConversationActive(response?.data?.data[0])
          setMessages(response?.data?.data[0]?.messages)
          setMessageDag('')
          console.error('Active conversation not found in the response')
        }

        // setMessages(
        //   dataStructure === 'old'
        //     ? response?.data?.conversation?.messages
        //         ?.slice()
        //         .sort((a: any, b: any) => {
        //           const dateA = new Date(a.created_at).getTime()
        //           const dateB = new Date(b.created_at).getTime()

        //           return dateA - dateB
        //         })
        //     : response?.data?.data[0]?.messages
        // )
        // setConversationActive(
        //   dataStructure === 'old'
        //     ? response?.data?.conversation
        //     : response?.data?.data
        // )
        // socket.emit('message', response?.data)
        // socket.emit('typing', ``)
      } catch (error) {
        console.error(`Error: ${error}`)
      }
      setSendingMessageDag(false)
      setMessage('')
      setModalNewChatDag(false)
    }
  }

  const handleTyping = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
    // else {
    //   socket.emit('typing', `${getName(user)} est en train d'écrire`)
    // }
  }
  const handleTypingModal = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessageModal(e)
    }
    // else {
    //   socket.emit('typing', `${getName(user)} est en train d'écrire`)
    // }
  }

  const handleSelectList = (e: any) => {
    if (e.target.value === '1') {
      setListToShow(listUser)
      setListLabel(setFirstListLabel)
    } else {
      setListToShow(secondListUser)
      setListLabel(setSecondListLabel)
    }
    setDisableBtn(false)
  }

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // React.useEffect(() => {
  //   socket.on('typingResponse', (data: any) => {
  //     setTypingStatus(data)
  //     console.log('typingResponse', data)
  //     console.log('TypingStatus', typingStatus)
  //   })
  // }, [socket])
  // React.useEffect(() => {
  //   socket.on('messageResponse', (data: any) => {
  //     console.log('messageResponse', data)
  //     setMessages([...messages, data])
  //   })
  // }, [socket, messages])

  function openModalNewChat(e: any) {
    e.preventDefault()
    setModalNewChat(true)
  }
  function openModalNewChatDag(e: any) {
    e.preventDefault()
    if (!isMultiList) {
      setListToShow(listUser)
      setListLabel(setFirstListLabel)
    }
    setModalNewChatDag(true)
  }

  const onChoseConvesation = async (x: any) => {
    setReceiver(null)
    setConversationActive(x)
    setMessages(x?.messages)
  }

  const [searchConv, setSearchConv] = React.useState('')

  const handleSearchConv = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchConv(e.target.value)
  }
  const filteredConversationList =
    dataStructure === 'old'
      ? conversations?.filter((item: any) =>
          `${item?.participants?.find((p: any) => p.id !== user?.id)?.prenom} ${
            item?.participants?.find((p: any) => p.id !== user?.id)?.nom
          }`
            .toLowerCase()
            .includes(searchConv.toLowerCase())
        )
      : conversations?.filter((item: any) =>
          `${
            item?.initial_receiver?.first_name ||
            item?.initial_sender?.first_name
          } ${
            item?.initial_receiver?.last_name || item?.initial_sender?.last_name
          }`
            .toLowerCase()
            .includes(searchConv.toLowerCase())
        )

  // const sortedMessages = messages?.slice().sort((a: any, b: any) => {
  //   const dateA = new Date(a.created_at).getTime()
  //   const dateB = new Date(b.created_at).getTime()

  //   return dateA - dateB
  // })

  // function handleOnEnter(text: string) {
  //   console.log('enter', text)
  // }
  return (
    <div className='mb-3 p-2'>
      <div className='row'>
        <div className='col-lg-4 col-left-messagerie d-flex mb-3'>
          <div
            className={`${
              isStyleYad(setStyle)
                ? styles.customContentMessageLeft
                : styles.customContentMessageLeftDag
            } w-100`}
          >
            <div
              className={`${styles.yadMessagerieTitreMessageContainer}  mb-4`}
            >
              <div
                className={
                  isStyleYad(setStyle)
                    ? styles.yadMessagerieTitreMessage
                    : styles.dagMessagerieTitreMessage
                }
              >
                {title}
              </div>
              {isStyleYad(setStyle) && (
                <button
                  onClick={(e) => openModalNewChat(e)}
                  className={`btn ${styles.yadMessagerieBtnAjout}`}
                >
                  <AiFillPlusCircle />
                </button>
              )}
              {isStyleDag(setStyle) && (
                <div
                  className={
                    isMultiList
                      ? styles.dagMessagerieBtnAjoutContainer
                      : `${styles.dagMessagerieBtnAjoutContainer} justify-content-end`
                  }
                >
                  {isMultiList && (
                    <Form.Select
                      className={styles.dagMessagerieInputSelectType}
                      aria-label='Default select example'
                      onChange={handleSelectList}
                    >
                      <option
                        value=''
                        className={styles.dagMessagerieInputSelectTypeOption}
                        disabled
                        selected
                      >
                        Choisir une liste
                      </option>
                      <option
                        value='1'
                        className={styles.dagMessagerieInputSelectTypeOption}
                      >
                        {setFirstListLabel}
                      </option>
                      <option value='2'>{setSecondListLabel}</option>
                    </Form.Select>
                  )}
                  <button
                    onClick={(e) => openModalNewChatDag(e)}
                    className={`btn ${styles.dagMessagerieBtnAjout}`}
                    disabled={disableBtn}
                  >
                    <HiPlus /> Compose
                  </button>
                </div>
              )}
              <NewChatModal
                modalNewChat={modalNewChat}
                setModalNewChat={setModalNewChat}
                setReceiver={setReceiver}
                setConversationActive={setConversationActive}
                userList={listUser}
                ApiBaseUrl={apiBaseUrl}
                conversations={conversations}
                setMessages={setMessages}
                newMessageTitle={newMessageTitle}
                dataStructure={dataStructure}
              />
              <NewChatModalDag
                modalNewChat={modalNewChatDag}
                setModalNewChat={setModalNewChatDag}
                setReceiver={setReceiver}
                setConversationActive={setConversationActive}
                // userList={listUser}
                // secondListUser={secondListUser}
                ApiBaseUrl={apiBaseUrl}
                handleSendMessageModal={handleSendMessageModal}
                messageDag={messageDag}
                setMessageDag={setMessageDag}
                handleTypingModal={handleTypingModal}
                conversations={conversations}
                setMessages={setMessages}
                newMessageTitle={newMessageTitle}
                sendingMessage={sendingMessageDag}
                // isMulti={isMultiList}
                listToShow={listToShow}
                listlabel={listlabel}
                dataStructure={dataStructure}
              />
            </div>
            <div className='form-search-user-container position-relative  mb-4'>
              <input
                type='text'
                className={`form-control ${
                  isStyleYad(setStyle)
                    ? styles.yadMessagerieCustomInputSearch
                    : styles.dagMessagerieCustomInputSearch
                }`}
                placeholder='Recherche'
                aria-label='Username'
                aria-describedby='basic-addon1'
                value={searchConv}
                onChange={handleSearchConv}
              />
              <FiSearch
                style={{
                  color: isStyleYad(setStyle) ? '#919EAB' : 'rgb(27, 29, 34)',
                  fontSize: 22,
                  position: 'absolute',
                  top: '25%',
                  left: '2%'
                }}
              />
            </div>
            <ListGroup
              className={`list-group list-group-flush ${styles.yadMessagerieCustomListGroup}`}
            >
              {!!filteredConversationList &&
              filteredConversationList?.length > 0 ? (
                filteredConversationList?.map((item: any) => {
                  return dataStructure === 'old' ? (
                    <ListGroup.Item
                      type='button'
                      className={`btn ${
                        isStyleYad(setStyle)
                          ? styles.listGroupItem
                          : styles.listGroupItemDag
                      } ${styles.listGroupItemAction} ${
                        item?.id === conversationActive?.id && 'active'
                      }`}
                      aria-current='true'
                      key={item?.id}
                      onClick={() => onChoseConvesation(item)}
                    >
                      <div
                        className={`${styles.yadMessagerieListGroupAvatarContainer} d-flex`}
                      >
                        {item?.participants?.find(
                          (item: any) => item?.id !== user?.id
                        )?.avatar &&
                        showProfil &&
                        item?.participants?.find(
                          (item: any) => item?.id !== user?.id
                        )?.avatar !== '/mediafiles/avatars/default.png' ? (
                          <img
                            src={getAvatar(
                              item?.participants?.find(
                                (item: any) => item?.id !== user?.id
                              )?.avatar
                            )}
                            className={styles.yadMessagerieListGroupAvatar}
                            alt='Photo'
                            onError={() => setShowProfil(false)}
                          />
                        ) : (
                          <div className={styles.formatPseudo}>
                            {getUserPseudo(
                              item?.participants?.find(
                                (item: any) => item?.id !== user?.id
                              )
                            )}
                          </div>
                        )}
                        {item?.en_ligne ? (
                          <div
                            className={
                              styles.yadMessagerieListGroupAvatarIndicator
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <circle
                                cx='5'
                                cy='4.99976'
                                r='4.5'
                                fill='#2CC84A'
                                stroke='white'
                              />
                            </svg>
                          </div>
                        ) : (
                          <div
                            className={
                              styles.yadMessagerieListGroupAvatarIndicator
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <circle
                                cx='5'
                                cy='4.99976'
                                r='4.5'
                                fill='#F2F2F2'
                                stroke='white'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className='w-100'>
                        <div
                          className={styles.yadMessagerieListGroupNameContainer}
                        >
                          <div
                            className={`${
                              isStyleYad(setStyle)
                                ? styles.yadMessagerieListGroupName
                                : styles.dagMessagerieListGroupName
                            } m-r-7`}
                          >
                            {
                              item?.participants?.find(
                                (item: any) => item?.id !== user?.id
                              )?.prenom
                            }{' '}
                            {
                              item?.participants?.find(
                                (item: any) => item?.id !== user?.id
                              )?.nom
                            }
                          </div>
                          <div
                            className={
                              isStyleYad(setStyle)
                                ? styles.yadMessagerieListGroupHeure
                                : styles.dagMessagerieListGroupHeure
                            }
                          >
                            {formatDateHour(
                              item?.messages.slice().sort((a: any, b: any) => {
                                const dateA = new Date(a.created_at).getTime()
                                const dateB = new Date(b.created_at).getTime()

                                return dateA - dateB
                              })[item?.messages?.length - 1]?.created_at,
                              isStyleYad(setStyle)
                            )}
                          </div>
                        </div>
                        <div className={styles.yadMessagerieListGroupApercu}>
                          {truncateCaractere(
                            item?.messages.slice().sort((a: any, b: any) => {
                              const dateA = new Date(a.created_at).getTime()
                              const dateB = new Date(b.created_at).getTime()

                              return dateA - dateB
                            })[item?.messages?.length - 1]?.content,
                            18
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          styles.yadMessagerieListGroupCheckIconContainer
                        }
                      >
                        <BsCheck2All
                          className={styles.yadMessagerieListGroupCheckIcon}
                        />
                      </div>
                    </ListGroup.Item>
                  ) : dataStructure === 'new' &&
                    item?.initial_sender?.user_id === user?.user_id ? (
                    <ListGroup.Item
                      type='button'
                      className={`btn ${
                        isStyleYad(setStyle)
                          ? styles.listGroupItem
                          : styles.listGroupItemDag
                      } ${styles.listGroupItemAction} ${
                        item?.id === conversationActive?.id && 'active'
                      }`}
                      aria-current='true'
                      key={item?.id}
                      onClick={() => onChoseConvesation(item)}
                    >
                      <div
                        className={`${styles.yadMessagerieListGroupAvatarContainer} d-flex`}
                      >
                        {item?.initial_receiver?.avatar === null ? (
                          <div className={styles.formatPseudo}>
                            {getUserPseudo(
                              item?.initial_receiver,
                              dataStructure
                            )}
                          </div>
                        ) : (
                          <img
                            src={item?.initial_receiver?.avatar}
                            className={styles.yadMessagerieListGroupAvatar}
                            alt={
                              item?.initial_receiver?.first_name +
                              ' ' +
                              item?.initial_receiver?.last_name
                            }
                            onError={() => setShowProfil(false)}
                          />
                        )}
                        {onlineUsers?.some(
                          (user: any) =>
                            user?.userId === item?.initial_receiver?.user_id
                        ) ? (
                          <div
                            className={
                              styles.yadMessagerieListGroupAvatarIndicator
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <circle
                                cx='5'
                                cy='4.99976'
                                r='4.5'
                                fill='#2CC84A'
                                stroke='white'
                              />
                            </svg>
                          </div>
                        ) : (
                          <div
                            className={
                              styles.yadMessagerieListGroupAvatarIndicator
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <circle
                                cx='5'
                                cy='4.99976'
                                r='4.5'
                                fill='#F2F2F2'
                                stroke='white'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className='w-100'>
                        <div
                          className={styles.yadMessagerieListGroupNameContainer}
                        >
                          <div
                            className={`${
                              isStyleYad(setStyle)
                                ? styles.yadMessagerieListGroupName
                                : styles.dagMessagerieListGroupName
                            } m-r-7`}
                          >
                            {item?.initial_receiver?.first_name}{' '}
                            {item?.initial_receiver?.last_name}
                          </div>
                          <div
                            className={
                              isStyleYad(setStyle)
                                ? styles.yadMessagerieListGroupHeure
                                : styles.dagMessagerieListGroupHeure
                            }
                          >
                            {formatDateHour(
                              item?.messages[item?.messages?.length - 1]
                                ?.created_at,
                              isStyleYad(setStyle)
                            )}
                          </div>
                        </div>
                        <div className={styles.yadMessagerieListGroupApercu}>
                          {truncateCaractere(
                            item?.messages[item?.messages?.length - 1]?.message,
                            18
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          styles.yadMessagerieListGroupCheckIconContainer
                        }
                      >
                        <BsCheck2All
                          className={styles.yadMessagerieListGroupCheckIcon}
                        />
                      </div>
                    </ListGroup.Item>
                  ) : (
                    dataStructure === 'new' &&
                    item?.initial_receiver?.user_id === user?.user_id && (
                      <ListGroup.Item
                        type='button'
                        className={`btn ${
                          isStyleYad(setStyle)
                            ? styles.listGroupItem
                            : styles.listGroupItemDag
                        } ${styles.listGroupItemAction} ${
                          item?.id === conversationActive?.id && 'active'
                        }`}
                        aria-current='true'
                        key={item?.id}
                        onClick={() => onChoseConvesation(item)}
                      >
                        <div
                          className={`${styles.yadMessagerieListGroupAvatarContainer} d-flex`}
                        >
                          {item?.initial_sender?.avatar === null ? (
                            <div className={styles.formatPseudo}>
                              {getUserPseudo(
                                item?.initial_sender,
                                dataStructure
                              )}
                            </div>
                          ) : (
                            <img
                              src={item?.initial_sender?.avatar}
                              className={styles.yadMessagerieListGroupAvatar}
                              alt={
                                item?.initial_sender?.first_name +
                                ' ' +
                                item?.initial_sender?.last_name
                              }
                              onError={() => setShowProfil(false)}
                            />
                          )}
                          {onlineUsers?.some(
                            (user: any) =>
                              user?.userId === item?.initial_sender?.user_id
                          ) ? (
                            <div
                              className={
                                styles.yadMessagerieListGroupAvatarIndicator
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='10'
                                height='10'
                                viewBox='0 0 10 10'
                                fill='none'
                              >
                                <circle
                                  cx='5'
                                  cy='4.99976'
                                  r='4.5'
                                  fill='#2CC84A'
                                  stroke='white'
                                />
                              </svg>
                            </div>
                          ) : (
                            <div
                              className={
                                styles.yadMessagerieListGroupAvatarIndicator
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='10'
                                height='10'
                                viewBox='0 0 10 10'
                                fill='none'
                              >
                                <circle
                                  cx='5'
                                  cy='4.99976'
                                  r='4.5'
                                  fill='#F2F2F2'
                                  stroke='white'
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className='w-100'>
                          <div
                            className={
                              styles.yadMessagerieListGroupNameContainer
                            }
                          >
                            <div
                              className={`${
                                isStyleYad(setStyle)
                                  ? styles.yadMessagerieListGroupName
                                  : styles.dagMessagerieListGroupName
                              } m-r-7`}
                            >
                              {item?.initial_sender?.first_name}{' '}
                              {item?.initial_sender?.last_name}
                            </div>
                            <div
                              className={
                                isStyleYad(setStyle)
                                  ? styles.yadMessagerieListGroupHeure
                                  : styles.dagMessagerieListGroupHeure
                              }
                            >
                              {formatDateHour(
                                item?.messages[item?.messages?.length - 1]
                                  ?.created_at,
                                isStyleYad(setStyle)
                              )}
                            </div>
                          </div>
                          <div className={styles.yadMessagerieListGroupApercu}>
                            {truncateCaractere(
                              item?.messages[item?.messages?.length - 1]
                                ?.message,
                              18
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            styles.yadMessagerieListGroupCheckIconContainer
                          }
                        >
                          <BsCheck2All
                            className={styles.yadMessagerieListGroupCheckIcon}
                          />
                        </div>
                      </ListGroup.Item>
                    )
                  )
                })
              ) : (
                <AlertInfo
                  message='Pas de données'
                  isStyleYad={isStyleYad(setStyle)}
                />
              )}
            </ListGroup>
          </div>
        </div>
        {dataStructure === 'old' && (
          <div
            className={`col-lg-8 ${
              isStyleYad(setStyle)
                ? styles.colRightMessagerie
                : styles.colRightMessagerieDag
            } d-flex mb-3`}
          >
            {conversationActive != null || receiver != null ? (
              <div
                className={`${
                  isStyleYad(setStyle)
                    ? styles.dtailsMessagesTabsComponent
                    : styles.dtailsMessagesTabsComponentDag
                } w-100`}
              >
                <div
                  className={styles.contentContentDetailMessageInfoContainer}
                >
                  <div
                    className={`${styles.contentContentDetailMessageInfo} p-3`}
                  >
                    <div className={styles.contentImgPpChat}>
                      {conversationActive == null ? (
                        receiver?.avatar &&
                        showProfil &&
                        receiver?.avatar !==
                          '/mediafiles/avatars/default.png' ? (
                          <img
                            src={
                              dataStructure === 'old'
                                ? apiBaseUrl + receiver?.avatar
                                : receiver?.avatar
                            }
                            className={`${styles.imageProfilEntete} image_responsive`}
                            alt='Photo'
                            onError={() => setShowProfil(false)}
                          />
                        ) : (
                          <div className={styles.formatPseudo}>
                            {getUserPseudo(receiver, dataStructure)}
                          </div>
                        )
                      ) : conversationActive?.participants?.find(
                          (item: any) => item?.id !== user?.id
                        )?.avatar &&
                        showProfil &&
                        conversationActive?.participants?.find(
                          (item: any) => item?.id !== user?.id
                        )?.avatar !== '/mediafiles/avatars/default.png' ? (
                        <img
                          src={
                            apiBaseUrl +
                            conversationActive?.participants?.find(
                              (item: any) => item?.id !== user?.id
                            )?.avatar
                          }
                          className={`${styles.imageProfilEntete} image_responsive`}
                          alt='Photo'
                          onError={() => setShowProfil(false)}
                        />
                      ) : (
                        <div className={styles.formatPseudo}>
                          {getUserPseudo(
                            conversationActive?.participants?.find(
                              (item: any) => item?.id !== user?.id
                            )
                          )}
                        </div>
                      )}

                      <div
                        className={styles.yadMessagerieDetailMesAvatarIndicator}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='10'
                          height='10'
                          viewBox='0 0 10 10'
                          fill='none'
                        >
                          <circle
                            cx='5'
                            cy='4.99976'
                            r='4.5'
                            fill='#2CC84A'
                            stroke='white'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='content-info-user-chat'>
                      <div className='msg-user-infos-container'>
                        <div className='d-flex align-items-center msg-user-name'>
                          <p className={`${styles.profilDetailMessage} mb-0`}>
                            {dataStructure === 'old'
                              ? conversationActive == null
                                ? receiver?.prenom + ' ' + receiver?.nom
                                : conversationActive?.participants?.find(
                                    (item: any) => item?.id !== user?.id
                                  )?.prenom +
                                  ' ' +
                                  conversationActive?.participants?.find(
                                    (item: any) => item?.id !== user?.id
                                  )?.nom
                              : conversationActive == null
                              ? receiver?.first_name + ' ' + receiver?.last_name
                              : conversationActive?.participants?.find(
                                  (item: any) => item?.id !== user?.user_id
                                )?.first_name +
                                ' ' +
                                conversationActive?.participants?.find(
                                  (item: any) => item?.id !== user?.user_id
                                )?.last_name}
                          </p>
                        </div>
                        <div className='bloc-user-disconnect-time msg-user-lastonline'>
                          <p className={`${styles.textDisconnectTime} mb-0`}>
                            En ligne
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.blocDetails} pb-5`}>
                  {messages?.map((message: any) => (
                    <div key={message?.id}>
                      {message?.sender?.id !== user?.id ? (
                        <div className='position-relative received-msg-item m-b-2'>
                          <div
                            className={`${
                              isStyleYad(setStyle)
                                ? styles.blocMessageRecu
                                : styles.blocMessageRecuDag
                            } p-3`}
                          >
                            <div className='content-img-pp-message-recieve'>
                              {message?.sender?.avatar &&
                              showProfil &&
                              message?.sender?.avatar !==
                                '/mediafiles/avatars/default.png' ? (
                                isStyleYad(setStyle) ? (
                                  <img
                                    src={apiBaseUrl + message?.sender?.avatar}
                                    className={styles.imgPpMessageRecieve}
                                    alt='user avatar'
                                    onError={() => setShowProfil(false)}
                                  />
                                ) : (
                                  <div className='d-flex align-items-center gap-2'>
                                    <img
                                      src={apiBaseUrl + message?.sender?.avatar}
                                      className={styles.imgPpMessageRecieve}
                                      alt='user avatar'
                                      onError={() => setShowProfil(false)}
                                    />{' '}
                                    <span
                                      className={
                                        styles.userNameMessageRecieveDag
                                      }
                                    >
                                      {message?.sender?.prenom +
                                        ' ' +
                                        message?.sender?.prenom}
                                    </span>
                                  </div>
                                )
                              ) : (
                                <div className={styles.formatPseudo}>
                                  {getUserPseudo(message?.sender)}
                                </div>
                              )}
                            </div>
                            <div className='info-text-message-recu'>
                              <div className='d-flex flex-column'>
                                <span
                                  className={
                                    isStyleYad(setStyle)
                                      ? styles.textMessageRecu
                                      : styles.textMessageRecuDag
                                  }
                                >
                                  {message?.content}
                                </span>
                              </div>
                              <p
                                className={`${
                                  isStyleYad(setStyle)
                                    ? styles.timeDetailMessageRecu
                                    : styles.timeDetailMessageRecuDag
                                } mt-3`}
                              >
                                {formatDateHour(
                                  message?.created_at,
                                  isStyleYad(setStyle)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.blocReponse}>
                          <div className='position-relative sending-msg-item'>
                            <div className={styles.blocMessageEnvoyer}>
                              <span
                                className={
                                  isStyleYad(setStyle)
                                    ? styles.textMessageEnvoyer
                                    : styles.textMessageEnvoyerDag
                                }
                              >
                                {message?.content}
                              </span>
                            </div>
                            <p
                              className={`${
                                isStyleYad(setStyle)
                                  ? styles.timeDetailMessageEnvoyer
                                  : styles.timeDetailMessageEnvoyerDag
                              } mt-3`}
                            >
                              {formatDateHour(
                                message?.created_at,
                                isStyleYad(setStyle)
                              )}
                            </p>
                            {/* <p className="time-detail-message mt-3 text-right">
                          Delivered{" "}
                          <BsCheck2All className="yad-messagerie-list-group-check-icon details-mes" />
                        </p> */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <div className='text-danger'></div> */}
                  <div ref={lastMessageRef} />
                </div>
                <div
                  className={`${styles.textAreaFormContainer} p-3 border-top`}
                >
                  <form onSubmit={handleSendMessage}>
                    <div className='left-footer'>
                      <div className={styles.leftFooterContainer}>
                        <div
                          className={
                            isStyleYad(setStyle)
                              ? styles.inputGroup
                              : styles.inputGroupDag
                          }
                        >
                          <div className={styles.inputContainer}>
                            <div
                              className={styles.containerDisplayInputMessage}
                            >
                              <div className='share'>
                                {/* <i className='fa-solid fa-link img-icon-chat' /> */}
                                <FontAwesomeIcon
                                  icon={faLink}
                                  className='img-icon-chat'
                                />
                              </div>
                              <div className='inp w-100'>
                                <textarea
                                  className={`${styles.messagerieCustomTextarrea} form-control`}
                                  rows={1}
                                  placeholder='Type your message here...'
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  onKeyDown={handleTyping}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            sendingMessage
                              ? styles.btnDisabled
                              : styles.btnContainer
                          }
                        >
                          <button type='submit' disabled={sendingMessage}>
                            {sendingMessage ? (
                              isStyleYad(setStyle) ? (
                                <Spinner animation='border' size='sm' />
                              ) : (
                                <span className='d-flex align-items-center gap-2'>
                                  Sending...{' '}
                                </span>
                              )
                            ) : isStyleYad(setStyle) ? (
                              // <i className='fa-solid fa-paper-plane' />
                              <FontAwesomeIcon icon={faPaperPlane} />
                            ) : (
                              <span
                                className={`${styles.btnSendDag} d-flex align-items-center`}
                              >
                                {/* Send <i className='fa-solid fa-paper-plane' /> */}
                                Send <FontAwesomeIcon icon={faPaperPlane} />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  isStyleYad(setStyle)
                    ? styles.dtailsMessagesTabsComponent
                    : styles.dtailsMessagesTabsComponentDag
                } w-100`}
              />
            )}
          </div>
        )}
        {dataStructure === 'new' && (
          <div
            className={`col-lg-8 ${
              isStyleYad(setStyle)
                ? styles.colRightMessagerie
                : styles.colRightMessagerieDag
            } d-flex mb-3`}
          >
            {conversationActive != null || receiver != null ? (
              <div
                className={`${
                  isStyleYad(setStyle)
                    ? styles.dtailsMessagesTabsComponent
                    : styles.dtailsMessagesTabsComponentDag
                } w-100`}
              >
                <div
                  className={styles.contentContentDetailMessageInfoContainer}
                >
                  <div
                    className={`${styles.contentContentDetailMessageInfo} p-3`}
                  >
                    {conversationActive?.initial_sender?.user_id ===
                    user?.user_id ? (
                      <div className={styles.contentContentDetailMessageInfo}>
                        <div className={styles.contentImgPpChat}>
                          <div className='content-img-pp-chat'>
                            {conversationActive?.initial_receiver?.avatar ===
                            null ? (
                              <img
                                src={
                                  'https://ui-avatars.com/api/?name=' +
                                  conversationActive?.initial_receiver
                                    ?.first_name +
                                  ' ' +
                                  conversationActive?.initial_receiver
                                    ?.last_name
                                }
                                alt={
                                  conversationActive?.initial_receiver
                                    ?.first_name +
                                  ' ' +
                                  conversationActive?.initial_receiver
                                    ?.last_name
                                }
                                className={`${styles.imageProfilEntete} image_responsive`}
                              />
                            ) : (
                              <img
                                src={
                                  conversationActive?.initial_receiver?.avatar
                                }
                                alt={
                                  conversationActive?.initial_receiver
                                    ?.first_name +
                                  ' ' +
                                  conversationActive?.initial_receiver
                                    ?.last_name
                                }
                                className={`${styles.imageProfilEntete} image_responsive`}
                              />
                            )}
                          </div>
                          {onlineUsers?.some(
                            (user: any) =>
                              user?.userId ===
                              conversationActive?.initial_receiver?.user_id
                          ) ? (
                            <div
                              className={
                                styles.yadMessagerieDetailMesAvatarIndicator
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='10'
                                height='10'
                                viewBox='0 0 10 10'
                                fill='none'
                              >
                                <circle
                                  cx='5'
                                  cy='4.99976'
                                  r='4.5'
                                  fill='#2CC84A'
                                  stroke='white'
                                />
                              </svg>
                            </div>
                          ) : (
                            <div
                              className={
                                styles.yadMessagerieDetailMesAvatarIndicator
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='10'
                                height='10'
                                viewBox='0 0 10 10'
                                fill='none'
                              >
                                <circle
                                  cx='5'
                                  cy='4.99976'
                                  r='4.5'
                                  fill='#F2F2F2'
                                  stroke='white'
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className='content-info-user-chat'>
                          <div className='msg-user-infos-container'>
                            <div className='d-flex align-items-center msg-user-name'>
                              <p
                                className={`${styles.profilDetailMessage} mb-0`}
                              >
                                {conversationActive?.initial_receiver
                                  ?.first_name +
                                  ' ' +
                                  conversationActive?.initial_receiver
                                    ?.last_name}
                              </p>
                            </div>
                            <div className='bloc-user-disconnect-time msg-user-lastonline'>
                              <p
                                className={`${styles.textDisconnectTime} mb-0`}
                              >
                                {onlineUsers?.some(
                                  (user: any) =>
                                    user?.userId ===
                                    conversationActive?.initial_receiver
                                      ?.user_id
                                )
                                  ? 'En ligne'
                                  : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      conversationActive?.initial_receiver?.user_id ===
                        user?.user_id && (
                        <div className={styles.contentContentDetailMessageInfo}>
                          <div className={styles.contentImgPpChat}>
                            <div className='content-img-pp-chat'>
                              {conversationActive?.initial_sender?.avatar ===
                              null ? (
                                <img
                                  src={
                                    'https://ui-avatars.com/api/?name=' +
                                    conversationActive?.initial_sender
                                      ?.first_name +
                                    ' ' +
                                    conversationActive?.initial_sender
                                      ?.last_name
                                  }
                                  alt={
                                    conversationActive?.initial_sender
                                      ?.first_name +
                                    ' ' +
                                    conversationActive?.initial_sender
                                      ?.last_name
                                  }
                                  className={`${styles.imageProfilEntete} image_responsive`}
                                />
                              ) : (
                                <img
                                  src={
                                    conversationActive?.initial_sender?.avatar
                                  }
                                  alt={
                                    conversationActive?.initial_sender
                                      ?.first_name +
                                    ' ' +
                                    conversationActive?.initial_sender
                                      ?.last_name
                                  }
                                  className={`${styles.imageProfilEntete} image_responsive`}
                                />
                              )}
                            </div>
                            <div
                              className={
                                styles.yadMessagerieDetailMesAvatarIndicator
                              }
                            >
                              {onlineUsers?.some(
                                (user: any) =>
                                  user?.userId ===
                                  conversationActive?.initial_sender?.user_id
                              ) ? (
                                <div
                                  className={
                                    styles.yadMessagerieDetailMesAvatarIndicator
                                  }
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='10'
                                    height='10'
                                    viewBox='0 0 10 10'
                                    fill='none'
                                  >
                                    <circle
                                      cx='5'
                                      cy='4.99976'
                                      r='4.5'
                                      fill='#2CC84A'
                                      stroke='white'
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div
                                  className={
                                    styles.yadMessagerieDetailMesAvatarIndicator
                                  }
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='10'
                                    height='10'
                                    viewBox='0 0 10 10'
                                    fill='none'
                                  >
                                    <circle
                                      cx='5'
                                      cy='4.99976'
                                      r='4.5'
                                      fill='#F2F2F2'
                                      stroke='white'
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='content-info-user-chat'>
                            <div className='msg-user-infos-container'>
                              <div className='d-flex align-items-center msg-user-name'>
                                <p
                                  className={`${styles.profilDetailMessage} mb-0`}
                                >
                                  {conversationActive?.initial_sender
                                    ?.first_name +
                                    ' ' +
                                    conversationActive?.initial_sender
                                      ?.last_name}
                                </p>
                              </div>
                              <div className='bloc-user-disconnect-time msg-user-lastonline'>
                                <p
                                  className={`${styles.textDisconnectTime} mb-0`}
                                >
                                  {onlineUsers?.some(
                                    (user: any) =>
                                      user?.userId ===
                                      conversationActive?.initial_sender
                                        ?.user_id
                                  )
                                    ? 'En ligne'
                                    : ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    {receiver && (
                      <div className={styles.contentContentDetailMessageInfo}>
                        <div className={styles.contentImgPpChat}>
                          <div className='content-img-pp-chat'>
                            {receiver?.avatar === null ? (
                              <img
                                src={
                                  'https://ui-avatars.com/api/?name=' +
                                  receiver?.first_name +
                                  ' ' +
                                  receiver?.last_name
                                }
                                alt={
                                  receiver?.first_name +
                                  ' ' +
                                  receiver?.last_name
                                }
                                className={`${styles.imageProfilEntete} image_responsive`}
                              />
                            ) : (
                              <img
                                src={receiver?.avatar}
                                alt={
                                  receiver?.first_name +
                                  ' ' +
                                  receiver?.last_name
                                }
                                className={`${styles.imageProfilEntete} image_responsive`}
                              />
                            )}
                          </div>
                          <div
                            className={
                              styles.yadMessagerieDetailMesAvatarIndicator
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <circle
                                cx='5'
                                cy='4.99976'
                                r='4.5'
                                fill='#2CC84A'
                                stroke='white'
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='content-info-user-chat'>
                          <div className='msg-user-infos-container'>
                            <div className='d-flex align-items-center msg-user-name'>
                              <p
                                className={`${styles.profilDetailMessage} mb-0`}
                              >
                                {receiver?.first_name +
                                  ' ' +
                                  receiver?.last_name}
                              </p>
                            </div>
                            <div className='bloc-user-disconnect-time msg-user-lastonline'>
                              <p
                                className={`${styles.textDisconnectTime} mb-0`}
                              >
                                En ligne
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`${styles.blocDetails} pb-5`}>
                  {messages?.map((message: any) => (
                    <div key={message?.id}>
                      {message?.sender_id !== user?.user_id ? (
                        <div className='position-relative received-msg-item m-b-2'>
                          <div
                            className={`${
                              isStyleYad(setStyle)
                                ? styles.blocMessageRecu
                                : styles.blocMessageRecuDag
                            } p-3`}
                          >
                            <div className='content-img-pp-message-recieve'>
                              {message?.sender?.avatar &&
                              showProfil &&
                              message?.sender?.avatar !== null ? (
                                isStyleYad(setStyle) ? (
                                  <img
                                    src={message?.sender?.avatar}
                                    className={styles.imgPpMessageRecieve}
                                    alt='user avatar'
                                    onError={() => setShowProfil(false)}
                                  />
                                ) : (
                                  <div className='d-flex align-items-center gap-2'>
                                    <img
                                      src={message?.sender?.avatar}
                                      className={styles.imgPpMessageRecieve}
                                      alt='user avatar'
                                      onError={() => setShowProfil(false)}
                                    />{' '}
                                    <span
                                      className={
                                        styles.userNameMessageRecieveDag
                                      }
                                    >
                                      {message?.sender?.first_name +
                                        ' ' +
                                        message?.sender?.last_name}
                                    </span>
                                  </div>
                                )
                              ) : (
                                <div className={styles.formatPseudo}>
                                  {getUserPseudo(message?.sender)}
                                </div>
                              )}
                            </div>
                            <div className='info-text-message-recu'>
                              <div className='d-flex flex-column'>
                                <span
                                  className={
                                    isStyleYad(setStyle)
                                      ? styles.textMessageRecu
                                      : styles.textMessageRecuDag
                                  }
                                >
                                  {message?.message}
                                </span>
                              </div>
                              <p
                                className={`${
                                  isStyleYad(setStyle)
                                    ? styles.timeDetailMessageRecu
                                    : styles.timeDetailMessageRecuDag
                                } mt-3`}
                              >
                                {formatDateHour(
                                  message?.created_at,
                                  isStyleYad(setStyle)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.blocReponse}>
                          <div className='position-relative sending-msg-item'>
                            <div className={styles.blocMessageEnvoyer}>
                              <span
                                className={
                                  isStyleYad(setStyle)
                                    ? styles.textMessageEnvoyer
                                    : styles.textMessageEnvoyerDag
                                }
                              >
                                {message?.message}
                              </span>
                            </div>
                            <p
                              className={`${
                                isStyleYad(setStyle)
                                  ? styles.timeDetailMessageEnvoyer
                                  : styles.timeDetailMessageEnvoyerDag
                              } mt-3`}
                            >
                              {formatDateHour(
                                message?.created_at,
                                isStyleYad(setStyle)
                              )}
                            </p>
                            {/* <p className="time-detail-message mt-3 text-right">
                        Delivered{" "}
                        <BsCheck2All className="yad-messagerie-list-group-check-icon details-mes" />
                      </p> */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <div className='text-danger'></div> */}
                  <div ref={lastMessageRef} />
                </div>
                <div
                  className={`${styles.textAreaFormContainer} p-3 border-top`}
                >
                  <form onSubmit={handleSendMessage}>
                    <div className='left-footer'>
                      <div className={styles.leftFooterContainer}>
                        <div
                          className={
                            isStyleYad(setStyle)
                              ? styles.inputGroup
                              : styles.inputGroupDag
                          }
                        >
                          <div className={styles.inputContainer}>
                            <div
                              className={styles.containerDisplayInputMessage}
                            >
                              <div className='share'>
                                {/* <i className='fa-solid fa-link img-icon-chat' /> */}
                                <FontAwesomeIcon
                                  icon={faLink}
                                  className='img-icon-chat'
                                />
                              </div>
                              <div className='inp w-100'>
                                <textarea
                                  className={`${styles.messagerieCustomTextarrea} form-control`}
                                  rows={1}
                                  placeholder='Type your message here...'
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  onKeyDown={handleTyping}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            sendingMessage
                              ? styles.btnDisabled
                              : styles.btnContainer
                          }
                        >
                          <button type='submit' disabled={sendingMessage}>
                            {sendingMessage ? (
                              isStyleYad(setStyle) ? (
                                <Spinner animation='border' size='sm' />
                              ) : (
                                <span className='d-flex align-items-center gap-2'>
                                  Sending...{' '}
                                </span>
                              )
                            ) : isStyleYad(setStyle) ? (
                              // <i className='fa-solid fa-paper-plane' />
                              <FontAwesomeIcon icon={faPaperPlane} />
                            ) : (
                              <span
                                className={`${styles.btnSendDag} d-flex align-items-center`}
                              >
                                {/* Send <i className='fa-solid fa-paper-plane' /> */}
                                Send <FontAwesomeIcon icon={faPaperPlane} />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  isStyleYad(setStyle)
                    ? styles.dtailsMessagesTabsComponent
                    : styles.dtailsMessagesTabsComponentDag
                } w-100`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

VolkenoReactMessenger.propTypes = {
  // socketUrl: PropTypes.string, // Socket url connection
  user: PropTypes.object, // User data
  token: PropTypes.string, // Authentication token
  apiBaseUrl: PropTypes.string, // Api base url
  setApiPostEndpoint: PropTypes.string, // Post endpoint
  setApiConversationUserEndpoint: PropTypes.string, // User's conversations endpoint
  setApiListUsersEndpoint: PropTypes.string, // Users list endpoint
  title: PropTypes.string, // Module title (optional)
  newMessageTitle: PropTypes.string, // New discussion title (optional)
  setStyle: PropTypes.string, // New discussion title (optional)
  dataStructure: PropTypes.string, // Data structure type (optional)
  isMultiList: PropTypes.bool,
  setSecondListUsersEndpoint: PropTypes.string,
  setFirstListLabel: PropTypes.string,
  setSecondListLabel: PropTypes.string
}
export default VolkenoReactMessenger

function NewChatModal({
  modalNewChat,
  setModalNewChat,
  setReceiver,
  setConversationActive,
  userList,
  ApiBaseUrl,
  conversations,
  setMessages,
  newMessageTitle,
  dataStructure
}: any) {
  const [searchValue, setSearchValue] = React.useState('')

  const filteredUserList =
    dataStructure === 'old'
      ? userList?.filter((item: any) =>
          `${item?.prenom} ${item?.nom}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      : userList?.filter((item: any) =>
          `${item?.first_name} ${item?.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  function closeModalNewChat() {
    setModalNewChat(false)
  }

  const onChoseReceiver = (x: any) => {
    if (dataStructure === 'old') {
      // Vérifier si l'utilisateur sélectionné a déjà une conversation active
      const existingConversation = conversations.find((conversation: any) =>
        conversation.participants?.some(
          (participant: any) => participant.id === x.id
        )
      )

      if (existingConversation) {
        // Si une conversation existe déjà avec cet utilisateur, afficher les messages de cette conversation
        setConversationActive(existingConversation)
        setReceiver(null) // Réinitialiser le destinataire
        setMessages(existingConversation?.messages) // afficher l'historique de messages
        closeModalNewChat() // Fermer la modal de nouvelle conversation
      } else {
        // Si aucune conversation active avec cet utilisateur, définir le destinataire et réinitialiser la conversation active et l'historique de messages
        setReceiver(x)
        setConversationActive(null)
        setMessages(null)
        closeModalNewChat() // Fermer la modal de nouvelle conversation
      }
    } else {
      const conversation = conversations.filter(
        (conv: any) =>
          conv?.initial_sender_id === x?.user_id ||
          conv?.receiver_id === x?.user_id
      )
      if (conversation[0]) {
        setConversationActive(conversation[0])
        setReceiver(null) // Réinitialiser le destinataire
        setMessages(conversation[0]?.messages) // afficher l'historique de messages
        closeModalNewChat() // Fermer la modal de nouvelle conversation
      } else {
        setReceiver(x)
        setConversationActive(null)
        setMessages(null)
        closeModalNewChat() // Fermer la modal de nouvelle conversation
      }
    }
  }

  return (
    <Modal show={modalNewChat} onHide={() => closeModalNewChat()}>
      <Modal.Header className='modal-header border-0 p-3' closeButton>
        <Modal.Title>{newMessageTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBodyMessenger}>
        <div className='pt-3'>
          <div className='form-search-user-container position-relative'>
            <input
              type='text'
              className={`${styles.formSearchUser} form-control`}
              placeholder='Rechercher des personnes'
              value={searchValue}
              onChange={handleSearchChange}
            />
            <FiSearch
              style={{
                color: '#919EAB',
                fontSize: 22,
                position: 'absolute',
                top: '25%',
                left: '2%'
              }}
            />
          </div>
        </div>
        <ul className={`${styles.userForSendMessageContainer} mt-3  px-2`}>
          {filteredUserList?.length > 0 ? (
            filteredUserList.map((item: any, index: any) => {
              if (dataStructure === 'old') {
                return (
                  <li
                    className={`${styles.userForSendMessage}  mb-3 px-3 py-1`}
                    data-bs-dismiss='modal'
                    key={'chatable_user_' + index}
                    onClick={() => onChoseReceiver(item)}
                  >
                    <button className='btn no-link'>
                      <div className='d-flex align-items-center gap-2'>
                        <div>
                          {item?.avatar !==
                          '/mediafiles/avatars/default.png' ? (
                            <img
                              src={ApiBaseUrl + item?.avatar}
                              alt='user-avatar'
                              className={`w-fluid ${styles.imgProfilUserMessage}`}
                            />
                          ) : (
                            <div className={styles.formatPseudo}>
                              {getUserPseudo(item)}
                            </div>
                          )}
                        </div>
                        <div className={styles.userForSendMessageInfos}>
                          <h3 className='mb-0'>
                            {item?.prenom} {item?.nom}
                          </h3>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              }

              if (dataStructure === 'new') {
                return (
                  <li
                    className={`${styles.userForSendMessage}  mb-3 px-3 py-1`}
                    data-bs-dismiss='modal'
                    key={'chatable_user_' + index}
                    onClick={() => onChoseReceiver(item)}
                  >
                    <button className='btn no-link'>
                      <div className='d-flex align-items-center gap-2'>
                        <div>
                          {item?.avatar === null ? (
                            <div className={styles.formatPseudo}>
                              {getUserPseudo(item, dataStructure)}
                            </div>
                          ) : (
                            <img
                              src={item?.avatar}
                              className={`w-fluid ${styles.imgProfilUserMessage}`}
                              alt={`${item?.first_name} ${item?.last_name}`}
                            />
                          )}
                        </div>
                        <div className={styles.userForSendMessageInfos}>
                          <h3 className='mb-0'>
                            {item?.first_name} {item?.last_name}
                          </h3>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              }

              return null
            })
          ) : (
            <AlertInfo message='Pas de données' isStyleYad />
          )}
        </ul>
      </Modal.Body>
    </Modal>
  )
}
function NewChatModalDag({
  modalNewChat,
  setModalNewChat,
  setReceiver,
  setConversationActive,
  // userList,
  // secondListUser,
  conversations,
  handleSendMessageModal,
  messageDag,
  setMessageDag,
  handleTypingModal,
  setMessages,
  newMessageTitle,
  sendingMessage,
  listToShow,
  listlabel,
  dataStructure
}: any) {
  function closeModalNewChat() {
    setModalNewChat(false)
  }

  const onChoseReceiver = (x: any) => {
    console.log({ x })
    if (dataStructure === 'old') {
      const existingConversation = conversations?.find((conversation: any) =>
        conversation.participants?.some(
          (participant: any) => participant.id === x.value.id
        )
      )

      if (existingConversation) {
        setConversationActive(existingConversation)
        setReceiver(null) // Réinitialiser le destinataire
        setMessages(existingConversation?.messages) // afficher l'historique de messages
      } else {
        setReceiver(x.value)
        setConversationActive(null)
        setMessages(null)
      }
    } else {
      const conversation = conversations.filter(
        (conv: any) =>
          conv?.initial_sender_id === x.value?.user_id ||
          conv?.receiver_id === x.value?.user_id
      )
      if (conversation[0]) {
        setConversationActive(conversation[0])
        setReceiver(null) // Réinitialiser le destinataire
        setMessages(conversation[0]?.messages) // afficher l'historique de messages
      } else {
        setReceiver(x.value)
        setConversationActive(null)
        setMessages(null)
      }
    }
  }
  const options = listToShow?.map((user: any) => {
    if (dataStructure === 'old') {
      return { value: user, label: user?.prenom + ' ' + user?.nom }
    } else {
      return { value: user, label: user?.first_name + ' ' + user?.last_name }
    }
  })

  return (
    <Modal show={modalNewChat} onHide={() => closeModalNewChat()}>
      <Modal.Header className='modal-header p-3' closeButton>
        <Modal.Title>{newMessageTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBodyMessengerDag}>
        <form onSubmit={handleSendMessageModal}>
          <div className='my-3'>
            <label className='form-label form-label-add-rv-praticien'>
              {listlabel}
            </label>
            <Select
              options={options}
              onChange={onChoseReceiver}
              closeMenuOnSelect
            />
          </div>
          <div className='mb-3'>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Écrivez votre message ici...'
                style={{ height: '150px' }}
                value={messageDag}
                onChange={(e) => setMessageDag(e.target.value)}
                onKeyDown={handleTypingModal}
              />
            </Form.Group>
          </div>
          <div className='d-flex align-items-center justify-content-between mt-4'>
            <button
              type='button'
              className={styles.btnCancelModalDag}
              onClick={() => closeModalNewChat()}
            >
              Annuler
            </button>
            <div
              className={
                sendingMessage ? styles.btnDisabledModal : styles.btnContainer
              }
            >
              <button
                type='submit'
                disabled={sendingMessage}
                className={styles.btnSendModalDag}
              >
                {sendingMessage ? (
                  <span className='d-flex align-items-center gap-2'>
                    Sending...
                  </span>
                ) : (
                  <span className='d-flex align-items-center gap-2'>
                    {/* Send Message <i className='fa-solid fa-paper-plane' /> */}
                    Send Message <FontAwesomeIcon icon={faPaperPlane} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
