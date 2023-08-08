import * as React from 'react'
import styles from './styles.module.css'
import { chatData } from './data';

interface Props {
  titlePage: string;
  StatutConnect: string;
  usersList: any;
  recever: any;
  sender: any;
  date: string
}

export const VolkenoReactMessenger = ({ titlePage, date, StatutConnect, usersList, sender }: Props) => {
 
  return (
  <div className={styles.containerPage}>
     <div className={styles.containerMessenger}>
      <div  className={styles.containerSectionDiscussion}>
        <div className={styles.contentTitleDiscussion}>
          <p className={styles.titreMessagesBloc}>
            {titlePage}
          </p>
        </div>
        <div className={styles.blocSearchMessage}>
          <form className={styles.formSearch}>
            <input
              className={styles.formControlSearch}
              type="search"
              placeholder="Rechercher"
            />
            <button type="submit" value="search" className={styles.btnSearchIcon}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <ul className={styles.listGroupMessage}>
          {usersList.map((item:any, index:number) => 
          <li className={`${styles.listGroupItemMeessage} ${index === 0 && styles.active} `} key={item?.id}>
          <div>
            <div className={styles.blocProfilContact}>
              <div className={styles.containerListMessageItem}>
                <img
                  src={item?.avatar}
                  className={styles.imgMessgeContact}
                  alt="image profil contact"
                />
                <div className={styles.contentTextMessageList}>
                  <div className={styles.containerHeaderMessageList}>
                    <p className={styles.nomContact}>{item?.name + " " + item?.lastName}</p>
                    <p className={styles.timeMessageContact}>{date}</p>
                  </div>
                  <div className={styles.blocMessageContact}>
                    <div className="">
                      <p
                        className={styles.contenuMessageContact}
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.lastMessage}
                      </p>
                    </div>
                    <div className="">
                      <span className={`${styles.statutMessageTabsTraite}`}>
                      <i className="fa-solid fa-check-double"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
          )}
        </ul>
      </div>
      <div className={styles.containerDetailMessage}>
        <div className={styles.containerSectionHeaderDetailMessage}>
          <div className={styles.contentImgProfil}>
            <img
              src={sender?.avatar}
              className={styles.imgReceivedMsg}
              alt="profil detail message"
            />
          </div>
          <div className={styles.contentTextUserConnectMessage}>
            <div className={styles.msgUserInfosContainer}>
              <div className={styles.contentMsgUserName}>
                <p className={styles.profilDetailMessage}>{sender?.name + " " + sender?.lastName}</p>
              </div>
              <div className={`${styles.blocUserDisconnectTime} ${styles.msgUserLastonline}`}>
                <p className={styles.textDisconnectTime}>
                  {StatutConnect}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.blocDetails}>
          {console.log('data item', chatData)}
          {chatData?.map((message) => {
            if(message?.type === "received") {
              return <Message item={message} key={message?.id} />
            } else {
              return <Response item={message} key={message?.id} />
            }
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
                        <i className="fa-solid fa-link img-icon-chat" ></i>
                      </span>
                      <div className={styles.containerTextarea}>
                        <textarea
                          className={styles.textarreaMessageCustomChat}
                          rows={1}
                          name="reponse"
                          placeholder="Type your message here..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.customBtnChatContainer}>
                  <div className={styles.emoji}>
                    <i className="fa-regular fa-face-smile"></i>
                  </div>
                  <button type="submit" className={styles.btnSendMessageTabs}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
     </div>
    </div>)
}

export const Message = ({item}: {item: any}) => {
 
  return (
    <div className={styles.receivedMsgItem}>
    <div className={styles.conatinerReceivedMsgItem}>
      <div className={styles.contentImgReceivedMsgItem}>
        <img
          src={item?.sender?.avatar}
          className={styles.imgReceivedMsg}
          alt="image profil contact"
        />
      </div>
      <div className={styles.containerTextMessageRecu}>
        <div className={styles.blocMessageRecu}>
          <div className={styles.textMessageRecu}>
            {item?.content}
          </div>
        </div>
        <span className={styles.timeDetailMessage}>{item?.created_at}</span>
      </div>
    </div>
  </div>
  )
}

export const Response = ({item}: {item: any}) => {
  return (
    <div className={styles.blocReponse}>
            <div className={styles.sendingMsgItem}>
              <div className={styles.blocMessageEnvoyer}>
                <div className={styles.textMessageEnvoyer}>
                {item?.content}
                </div>
              </div>
              <div className={styles.contentStatutMessageDelivered}>
                <span className={styles.timeDetailMessage}>{item?.created_at}</span>
              </div>
            </div>
          </div>
  )
}
// function DetailsMessagerieAdmin({avatar}: {avatar: string}) {
//   return (
//     <div className="dtails-messages-tabs-component">
//       <div className="d-flex gap-3 align-items-center border-bottom p-3">
//         <div className="">
//           <img
//             src={avatar}
//             className="img-received-msg"
//             alt="profil detail message"
//             style={{ width: "60", height: "60" }}
//           />
//         </div>
//         <div className="">
//           <div className="msg-user-infos-container">
//             <div className="d-flex align-items-center msg-user-name">
//               <p className="profil-detail-message mb-0">Esther Howard</p>
//             </div>
//             <div className="bloc-user-disconnect-time msg-user-lastonline">
//               <p className="text-disconnect-time mb-0">
//                 Online - Last seen, 2.02pm
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bloc-details pb-5">
//         <Message  avatar={avatar} />
//         <Response  />
//       </div>
//       <ChatInput />
//     </div>
//   );
// }

// function Message({avatar}: {avatar: string}) {
//   return (
//     <div className="received-msg-item">
//         <img
//             src={avatar}
//             className="img-received-msg"
//             alt="image profil contact"
//           />
//         </div>
//         <div className="container-text-message-recu">
//           <div className="bloc-message-recu mb-2">
//             <div className="text-message-recu">
//               Creation Ipsum is simply dummy text of the printing and
//               typesetting industry.{" "}
//             </div>
//           </div>
//           <span className="time-detail-message">09:04 PM</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Response() {
//   return (
//     <div className="bloc-reponse">
//       <div className="sending-msg-item">
//         <div className="bloc-message-envoyer">
//           <div className="text-message-envoyer mb-2">
//             Creation Ipsum is simply dummy text of the printing and typesetting
//             industry.{" "}
//           </div>
//         </div>
//         <div className="d-flex justify-content-end align-items-center">
//           <span className="time-detail-message px-2">Delivered</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChatInput() {
//   return (
//     <div className="p-3 border-top">
//       <form>
//         <div className="left-footer">
//           <div className="left-footer-container">
//             <div className="input-group">
//               <div className="input-container">
//                 <div className="container-display-input-message">
//                   <div className="share">
//                     <i className="fa-solid fa-link img-icon-chat" ></i>
//                   </div>
//                   <div className="inp w-100">
//                     <textarea
//                       className="textarrea-message-custom-chat form-control"
//                       rows={1}
//                       name="reponse"
//                       placeholder="Type your message here..."
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="btn-container custom-btn-chat-container">
//               <div className="emoji">
//               <i className="fa-regular fa-face-smile"></i>
//               </div>
//               <button type="submit" className="btn btn-send-message-tabs">
//               <i className="fa-solid fa-paper-plane"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// function Sommaire({avatar}: {avatar: string}) {
//   return (
//     <>
//       <li className="list-group-item list-group-item-meessage linkable active">
//         <div>
//           <div className="bloc-profil-contact">
//             <div className="d-flex align-items-center gap-3 w-100">
//               <img
//                 src={avatar}
//                 className="img-messge-contact"
//                 alt="image profil contact"
//               />
//               <div className="w-90">
//                 <div className="container-header-message-list">
//                   <p className="nom-contact mb-0 active">Esther Howard</p>
//                   <p className="time-message-contact mb-0">8:10 PM</p>
//                 </div>
//                 <div className="bloc-message-contact">
//                   <div className="w-50">
//                     <p
//                       className="contenu-message-contact linkable mb-0"
//                       style={{
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       Lorem ipsum dolor sit amet consectetur. Cursus magna
//                       mollis.
//                     </p>
//                   </div>
//                   <div className="">
//                     <span className="statut-message-tabs-traite statut-message-tabs-non-traite">
//                     <i className="fa-solid fa-check-double"></i>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//       <li className="list-group-item list-group-item-meessage linkable">
//         <div>
//           <div className="bloc-profil-contact">
//             <div className="d-flex align-items-center gap-3 w-100">
//               <img
//                 src={avatar}
//                 className="img-messge-contact"
//                 alt="image profil contact"
//               />
//               <div className="w-90">
//                 <div className="container-header-message-list">
//                   <p className="nom-contact mb-0">Esther Howard</p>
//                   <p className="time-message-contact mb-0">8:10 PM</p>
//                 </div>
//                 <div className="bloc-message-contact">
//                   <div className="w-50">
//                     <p
//                       className="contenu-message-contact linkable mb-0"
//                       style={{
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       Lorem ipsum dolor sit amet consectetur. Cursus magna
//                       mollis.
//                     </p>
//                   </div>
//                   <div className="">
//                     <span className="statut-message-tabs-traite statut-message-tabs-non-traite">
//                       <i className="fa-solid fa-check-double"></i>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//       <li className="list-group-item list-group-item-meessage linkable">
//         <div>
//           <div className="bloc-profil-contact">
//             <div className="d-flex align-items-center gap-3 w-100">
//               <img
//                 src={avatar}
//                 className="img-messge-contact"
//                 alt="image profil contact"
//               />
//               <div className="w-90">
//                 <div className="container-header-message-list">
//                   <p className="nom-contact mb-0">Esther Howard</p>
//                   <p className="time-message-contact mb-0">8:10 PM</p>
//                 </div>
//                 <div className="bloc-message-contact">
//                   <div className="w-50">
//                     <p
//                       className="contenu-message-contact linkable mb-0"
//                       style={{
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       Lorem ipsum dolor sit amet consectetur. Cursus magna
//                       mollis.
//                     </p>
//                   </div>
//                   <div className="">
//                     <span className="statut-message-tabs-traite statut-message-tabs-non-traite">
//                       <i className="fa-solid fa-check-double"></i>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//     </>
//   );
// }