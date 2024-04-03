/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ApiBaseUrl } from '../../http'
import {
  LoginFormData,
  LoginResult,
  ProfilPraticien,
  RegisterForm,
  RegisterFormData
} from './auth.type'
import { AuthState } from '../user/user.type'

export const AuthApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${ApiBaseUrl}/api/`
  }),
  endpoints: (build) => ({
    registerMedecin: build.mutation<AuthState['user'], RegisterForm | FormData>(
      {
        query: (data) => {
          return {
            url: `medecin/register/`,
            method: 'POST',
            body: data
          }
        },
        invalidatesTags: ['auth']
        // transformResponse: ({ data }) => data,
      }
    ),
    registerPatient: build.mutation<
      AuthState['user'],
      RegisterFormData | FormData
    >({
      query: (data) => {
        return {
          url: `patient/register/`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['auth']
      // transformResponse: ({ data }) => data,
    }),
    loginUser: build.mutation<LoginResult, LoginFormData>({
      query: (data) => ({
        url: 'auth/login/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['auth']
    })
  })
})

export const {
  useRegisterMedecinMutation,
  useLoginUserMutation,
  useRegisterPatientMutation
} = AuthApi
