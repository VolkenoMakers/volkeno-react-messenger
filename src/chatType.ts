export interface IUser {
  id: number
  slug: string | any
  email: string
  nom: string
  prenom: string
  password: string
  date_naissance: string
  telephone: string
  avatar: string
  adresse: string
  password_reset_count: number
  first_connexion: boolean
  created_at: string
  last_login: string
  is_active: boolean
  is_archive: boolean
  app_notification: boolean
  role: string
  whatsapp: string
  notification_whatsapp: string
  username: string
  cautionnement: boolean
}

export type Chat = {
  id: number
  slug: string
  content: string
  read: boolean
  is_read: boolean
  media?: string
  sender: IUser
  recever: IUser
  created_at: string
  avatar?: string
}
export type ChatFormData = Partial<
  Pick<Chat, 'content' | 'slug' | 'read' | 'is_read'> & {
    sender: number
    recever: number
  }
>

export type ChatData = {
  lastMessage: Chat
  user: IUser
  messages: Chat[]
  count: number
}
