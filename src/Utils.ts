/* eslint-disable no-unused-vars */
import moment from 'moment'
import { IUser } from './chatType'
import { ApiBaseUrl } from './utils/http'
import Avatar from './assets/avatar.png'

export const formatDateHour = (date: any) => {
  return moment(date).format('DD/MM/YYYY à HH:mm:ss')
}

export const truncateCaractere = (str: any, nbr: any) => {
  return str != null && str.length > nbr ? str.substring(0, nbr) + '...' : str
}

export function getUserPseudo(user?: IUser) {
  if (user) {
    return (user?.prenom?.charAt(0) + '.' + user?.nom?.charAt(0))?.toUpperCase()
  }
  return 'Y.D'
}

export const getAvatar = (avatar: string | any) => {
  if (avatar && !avatar?.includes('default.png')) {
    if (avatar.indexOf('http') === 0) return avatar
    return `${ApiBaseUrl}/${avatar}`
  }
  return Avatar
}
