type ENV = 'dev' | 'prod' | 'demo'
//
export const currentEnv: ENV = 'dev'

const env: ENV = currentEnv

export const Env = env

const API_DEV_URL = 'https://yaay-ak-doom-api.volkeno-engineering.click'
const API_DEMO_URL = ''
const API_PROD_URL = ''

export const APP_URL_DEV = 'https://yaay-ak-doom-api.volkeno-engineering.click/'
export const APP_URL_DEMO =
  'https://yaay-ak-doom-api.volkeno-engineering.click/'
export const APP_URL_PROD =
  'https://yaay-ak-doom-api.volkeno-engineering.click/'

export const SOCKET_DEV_URL = 'https://yaay-ak-doom-socket.withvolkeno.com' // "http://localhost:4000";
export const SOCKET_DEMO_URL = 'https://yaay-ak-doom-socket.withvolkeno.com'
export const SOCKET_PROD_URL = 'https://yaay-ak-doom-socket.withvolkeno.com'

function processApiUrl() {
  if (env === 'prod') return API_PROD_URL
  if (env === 'demo') return API_DEMO_URL
  return API_DEV_URL
}

function processAppUrl() {
  if (env === 'prod') return APP_URL_PROD
  if (env === 'demo') return APP_URL_DEMO
  return APP_URL_DEV
}

function processSocketUrl() {
  if (env === 'prod') return SOCKET_PROD_URL
  if (env === 'demo') return SOCKET_DEMO_URL
  return SOCKET_DEV_URL
}

export const ApiBaseUrl = processApiUrl()
export const AppBaseUrl = processAppUrl()
export const SocketUrl = processSocketUrl()
