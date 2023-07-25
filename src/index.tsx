import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  titlePage: string;
  avatar: any;
  date: string;
  StatutConnect: string;
  usersList: any;
  sender: any;
  recever: any;
}

export const VolkenoReactMessenger = ({ titlePage, avatar, date, usersList, sender, recever }: Props) => {
  console.log("userList", usersList)
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
          <form>
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
          {usersList && usersList?.map((user: any) => (
             <li className={`${styles.listGroupItemMeessage} ${styles.active} `}>
             <div>
               <div className={styles.blocProfilContact}>
                 <div className={styles.containerListMessageItem}>
                   <img
                     src={user?.avatar}
                     className={styles.imgMessgeContact}
                     alt="image profil contact"
                   />
                   <div className={styles.contentTextMessageList}>
                     <div className={styles.containerHeaderMessageList}>
                       <p className={styles.nomContact}>{user?.firstname + " " + user?.lastName}</p>
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
                           {user?.lastMessage}
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
          ))}
        </ul>
      </div>
      {/* <div className={styles.containerDetailMessage}>
        <div className={styles.containerSectionHeaderDetailMessage}>
          <div className={styles.contentImgProfil}>
            <img
              src={avatar}
              className={styles.imgReceivedMsg}
              alt="profil detail message"
            />
          </div>
          <div className={styles.contentTextUserConnectMessage}>
            <div className={styles.msgUserInfosContainer}>
              <div className={styles.contentMsgUserName}>
                <p className={styles.profilDetailMessage}>{name}</p>
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
          <div className={styles.receivedMsgItem}>
            <div className={styles.conatinerReceivedMsgItem}>
              <div className={styles.contentImgReceivedMsgItem}>
                <img
                  src={avatar}
                  className={styles.imgReceivedMsg}
                  alt="image profil contact"
                />
              </div>
              <div className={styles.containerTextMessageRecu}>
                <div className={styles.blocMessageRecu}>
                  <div className={styles.textMessageRecu}>
                    {messageRecevied}
                  </div>
                </div>
                <span className={styles.timeDetailMessage}>{timeMessageReceved}</span>
              </div>
            </div>
          </div>
          <div className={styles.blocReponse}>
            <div className={styles.sendingMsgItem}>
              <div className={styles.blocMessageEnvoyer}>
                <div className={styles.textMessageEnvoyer}>
                  {textMessageSend}
                </div>
              </div>
              <div className={styles.contentStatutMessageDelivered}>
                <span className={styles.timeDetailMessage}>{StatutMessageDelivered}</span>
              </div>
            </div>
          </div>
          <div className={styles.receivedMsgItem}>
            <div className={styles.conatinerReceivedMsgItem}>
              <div className={styles.contentImgReceivedMsgItem}>
                <img
                  src={avatar}
                  className={styles.imgReceivedMsg}
                  alt="image profil contact"
                />
              </div>
              <div className={styles.containerTextMessageRecu}>
                <div className={styles.blocMessageRecu}>
                  <div className={styles.textMessageRecu}>
                    {messageRecevied}
                  </div>
                </div>
                <span className={styles.timeDetailMessage}>{timeMessageReceved}</span>
              </div>
            </div>
          </div>
          <div className={styles.blocReponse}>
            <div className={styles.sendingMsgItem}>
              <div className={styles.blocMessageEnvoyer}>
                <div className={styles.textMessageEnvoyer}>
                  {textMessageSend}
                </div>
              </div>
              <div className={styles.contentStatutMessageDelivered}>
                <span className={styles.timeDetailMessage}>{StatutMessageDelivered}</span>
              </div>
            </div>
          </div>
          <div className={styles.receivedMsgItem}>
            <div className={styles.conatinerReceivedMsgItem}>
              <div className={styles.contentImgReceivedMsgItem}>
                <img
                  src={avatar}
                  className={styles.imgReceivedMsg}
                  alt="image profil contact"
                />
              </div>
              <div className={styles.containerTextMessageRecu}>
                <div className={styles.blocMessageRecu}>
                  <div className={styles.textMessageRecu}>
                    {messageRecevied}
                  </div>
                </div>
                <span className={styles.timeDetailMessage}>{timeMessageReceved}</span>
              </div>
            </div>
          </div>
          <div className={styles.blocReponse}>
            <div className={styles.sendingMsgItem}>
              <div className={styles.blocMessageEnvoyer}>
                <div className={styles.textMessageEnvoyer}>
                  {textMessageSend}
                </div>
              </div>
              <div className={styles.contentStatutMessageDelivered}>
                <span className={styles.timeDetailMessage}>{StatutMessageDelivered}</span>
              </div>
            </div>
          </div>
          <div className={styles.receivedMsgItem}>
            <div className={styles.conatinerReceivedMsgItem}>
              <div className={styles.contentImgReceivedMsgItem}>
                <img
                  src={avatar}
                  className={styles.imgReceivedMsg}
                  alt="image profil contact"
                />
              </div>
              <div className={styles.containerTextMessageRecu}>
                <div className={styles.blocMessageRecu}>
                  <div className={styles.textMessageRecu}>
                    {messageRecevied}
                  </div>
                </div>
                <span className={styles.timeDetailMessage}>{timeMessageReceved}</span>
              </div>
            </div>
          </div>
          <div className={styles.blocReponse}>
            <div className={styles.sendingMsgItem}>
              <div className={styles.blocMessageEnvoyer}>
                <div className={styles.textMessageEnvoyer}>
                  {textMessageSend}
                </div>
              </div>
              <div className={styles.contentStatutMessageDelivered}>
                <span className={styles.timeDetailMessage}>{StatutMessageDelivered}</span>
              </div>
            </div>
          </div>
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
      </div> */}
     </div>
    </div>)
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