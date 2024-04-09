/* eslint-disable no-unused-vars */
import { IUser } from '../user/user.type'

export type IMessagerie = {
  id: string
  slug: string
  content: string
  read: string
  brouillon: string
  media: any
  sender: IUser | any
  receiver: IUser | any
  participants: any
}

export type MessagerieFormData = {
  id: string
  slug: string
  content: string
  read: string
  brouillon: string
  media: any
  sender: IUser | any
  receiver: IUser | any
  participants: any
}
