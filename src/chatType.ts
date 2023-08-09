export interface IUser {
  id: number
  slug: string | any
  nom: string
  prenom: string
  avatar: string
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
