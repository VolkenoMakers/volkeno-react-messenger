/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import $ from 'jquery'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ApiBaseUrl } from './http'
import Avatar1 from '../assets/avatar.png'
// import Avatar from '../assets/appImages/avatar.png'
// import Avatars from '../assets/appImages/avatar.png'
import { IUser } from './api/user/user.type'
import moment from 'moment'

export function createMarkup(
  text: string | any,
  showDots?: boolean,
  numberSlice?: number
) {
  return {
    __html: `${numberSlice ? text.slice(0, numberSlice) : text}${
      showDots === true ? '...' : ''
    }`
  }
}
export function readMarkup(
  text: string | any,
  showDots?: boolean,
  numberSlice?: number
) {
  const content = text ? text.replace(/<.+?>/g, '') : text
  return {
    __html: `${numberSlice ? content.slice(0, numberSlice) : content}${
      showDots === true ? '...' : ''
    }`
  }
}

export function cleannerError(
  errors: any,
  cleanner: any,
  timeOut: number = 3000
) {
  if (errors) {
    setTimeout(
      () => Object.entries(errors).map(([key]: any) => cleanner(key)),
      timeOut
    )
  }
}

export function QueryUrl(baseUrl: string, additionalSearchQuery: any) {
  if (additionalSearchQuery) {
    for (const key of Object.keys(additionalSearchQuery)) {
      const val = additionalSearchQuery[key]

      if (Array.isArray(val)) {
        if (val.length > 0) {
          const string = val.map((v) => `${key}=${v}`).join('&')
          if (baseUrl.includes('?')) {
            baseUrl += `&${string}`
          } else {
            baseUrl += `?${string}`
          }
        }
      } else if (typeof val === 'boolean') {
        if (baseUrl.includes('?')) {
          baseUrl += `&${key}=${val}`
        } else {
          baseUrl += `?${key}=${val}`
        }
      } else {
        if (val) {
          if (baseUrl.includes('?')) {
            baseUrl += `&${key}=${val}`
          } else {
            baseUrl += `?${key}=${val}`
          }
        }
      }
    }
  }
  return baseUrl
}

export const onHide = (modalId: string) => {
  document.getElementById(modalId)?.classList.remove('show')
  $('.modal-backdrop').remove()
  $(`#${modalId}`).hide()
  $(`#${modalId}`).click()
  $(`body`).css({ overflowY: 'scroll' })
  $(`#${modalId}`).click()
}

export const onHideSideBar = () => {
  $('.text-reset').click()
}

export function getName(item: any) {
  if (item && item !== undefined) {
    return item?.prenom + ' ' + item?.nom
  }
  return ''
}

export function useLocationState<T>(
  defaultValue: T | any,
  redirectToWhenNull: string | null = null
): T {
  const state = useLocation().state as T
  const navigate = useNavigate()
  useEffect(() => {
    if (!state && redirectToWhenNull) {
      navigate(redirectToWhenNull)
    }
  }, [state])
  return state || defaultValue
}

// export const getImage = (img: string | any) => {
//   if (img && !img.includes('default.png') && !img.includes('static/media/')) {
//     if (img.indexOf('http') === 0) return img
//     return ApiBaseUrl + img
//   }
//   return defaultImage
// }

export const getAvatar = (avatar: string | any) => {
  if (avatar && !avatar.includes('default.png')) {
    if (avatar.indexOf('http') === 0) return avatar
    return ApiBaseUrl + avatar
  }
  return Avatar1
}

export function getAvatarFromUser(user: any) {
  const av1 = getAvatar(user.avatar)
  if (av1 === Avatar1) return getAvatar(user.profil.photo)
  return av1
}

// export const getImageProfil = (avatar: string | any) => {
//   if (avatar && !avatar.includes('default.png')) {
//     if (avatar.indexOf('http') === 0) return avatar
//     return ApiBaseUrl + avatar
//   }
//   return Avatar1
// }

export function createUrl(image: File) {
  return URL.createObjectURL(image)
}

export const countUppercase = (str: any) => {
  if (str.replace(/[^A-Z]/g, '')?.length >= 1) {
    return true
  }
  return false
}

export const countLowercase = (str: any) => {
  if (str.replace(/[^a-z]/g, '')?.length >= 1) {
    return true
  }
  return false
}

export const countNumber = (str: any) => {
  if (str.replace(/[^0-9]/g, '')?.length >= 1) {
    return true
  }
  return false
}

export const countCharacters = (str: any) => {
  if (str?.length >= 8) {
    return true
  }
  return false
}

export const countSpecial = (str: any) => {
  const punct = `/[!@#$%^&*()_+\\-=\\[\\]{};':"\\|,.<>\\/?]+/;`
  let count = 0
  for (let i = 0; i < str?.length; i++) {
    if (!punct.includes(str[i])) {
      continue
    }
    count++
  }
  // return count;
  if (count >= 1) {
    return true
  }
  return false
}

export function getUserName(user?: IUser) {
  if (user) {
    return user?.prenom + ' ' + user?.nom
  }
  return null
}
export function formattedDate(date: string | Date | undefined) {
  return date ? moment(date).format('DD/MM/YYYY') : ''
}

export function ageFromDate(date: string | Date | undefined) {
  return date ? moment().diff(date, 'years') : ''
}

export function jourFromDate(date: string | Date | undefined) {
  return date ? moment().diff(date, 'days') : ''
}

export function formatAmount(amount?: number | string) {
  if (amount || amount === 0)
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(parseFloat(String(amount)) || 0)

  return '-'
}
export const formatMontant = (num?: number | string) => {
  return formatAmount(num)
}

export function formattedDateForApi(date: string | Date) {
  return date ? moment(date).format('YYYY-MM-DD') : ''
}
export function formattedDateTime(date: string | Date | undefined) {
  return date ? moment(date).format('DD/MM/YYYY à HH:MM') : ''
}
export function formatterDateFrench(date: string | Date) {
  moment.locale('fr')
  return date ? moment(date).format('LL') : ''
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'XOF',
  style: 'currency'
})

export function formatCurrency(number: number | any) {
  return CURRENCY_FORMATTER.format(number)
}

export function getUserPseudo(user?: IUser) {
  if (user) {
    return (user?.prenom?.charAt(0) + '.' + user?.nom?.charAt(0))?.toUpperCase()
  }
  return 'Y.D'
}

export const getFileExtension = (filename?: string) => {
  if (filename) {
    return filename.split('.').pop()
  }
  return ''
}

export const formatDateHour = (date: moment.MomentInput) => {
  return moment(date).format('DD/MM/YYYY à HH:mm:ss')
}

export const truncateCaractere = (str: string | null, nbr: number) => {
  return str != null && str.length > nbr ? str.substring(0, nbr) + '...' : str
}

export const formatTime = (inputTime: string): string => {
  if (inputTime !== null) {
    const [hours, minutes] = inputTime.split(':').map(Number)
    if (!isNaN(hours) && !isNaN(minutes)) {
      return `${hours}H${minutes.toString().padStart(2, '0')}`
    }
  }
  return 'Invalid Time'
}
