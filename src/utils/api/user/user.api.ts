/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ApiBaseUrl } from '../../http'
import { AppStorage } from '../../storage'
import {
  AuthState,
  PaginationResults,
  TypeQuery,
  IUser,
  UserFormData
} from './user.type'
import { QueryUrl } from '../../Utils'

export const prepareHeaders = (headers: Headers, { getState }: any) => {
  const token =
    (getState() as { user: AuthState }).user.token ??
    AppStorage.getItem<AuthState>('user')?.token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

export const UserApi = createApi({
  reducerPath: 'userApi',
  tagTypes: [
    'user',
    'userList',
    'userById',
    'adminsList',
    'adminBySlug',
    'dashboardAdmin'
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${ApiBaseUrl}/api/`,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    me: builder.query<IUser, void>({
      providesTags: ['user'],
      transformResponse: ({ data }) => data,
      query: () => {
        return 'auth/me/'
      }
    }),
    addOrEditMedecin: builder.mutation<
      IUser,
      { slug?: string; data: UserFormData | FormData }
    >({
      invalidatesTags: ['user', 'userList'],
      query: ({ slug, data }) => {
        if (slug) {
          return {
            url: `users/${slug}/`,
            method: 'PUT',
            body: data
          }
        }
        return {
          url: `users/`,
          method: 'POST',
          body: data
        }
      }
    }),
    getListUser: builder.query<PaginationResults<IUser>, TypeQuery>({
      providesTags: ['userList'],
      query: (query) => QueryUrl('users', query)
    }),
    addOrEditAdmin: builder.mutation<
      IUser,
      { slug?: string; data: UserFormData | FormData }
    >({
      invalidatesTags: [
        'user',
        'userList',
        'userById',
        'adminsList',
        'adminBySlug'
      ],
      query: ({ slug, data }) => {
        if (slug) {
          return {
            url: `user/admins/${slug}/`,
            method: 'PUT',
            body: data
          }
        }
        return {
          url: `user/admins/`,
          method: 'POST',
          body: data
        }
      }
    }),
    getListAdminUser: builder.query<PaginationResults<IUser>, TypeQuery>({
      providesTags: ['adminsList'],
      query: (query) => QueryUrl('user/admins', query)
    }),
    adminBySlug: builder.query<IUser | any, string>({
      query: (slug) => `users/${slug}`,
      providesTags: ['adminBySlug']
    }),
    deleteAdmin: builder.mutation<IUser, string>({
      query: (slug) => ({
        url: `users/${slug}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userList', 'adminsList']
    }),
    archiveUser: builder.mutation<IUser | any, string>({
      query: (slug) => ({
        url: `users/${slug}/`,
        method: 'GET'
      }),
      invalidatesTags: ['user', 'adminsList', 'userList']
    }),
    unArchiveUser: builder.mutation<IUser | any, string>({
      query: (slug) => ({
        url: `reactive_user/${slug}/`,
        method: 'GET'
      }),
      invalidatesTags: ['user', 'adminsList', 'userList']
    }),
    getInfoDashboardAdmin: builder.query<
      PaginationResults<IUser | any>,
      TypeQuery
    >({
      providesTags: ['dashboardAdmin'],
      query: (query) => QueryUrl('dashboard', query)
    })
  })
})

export const {
  useMeQuery,
  useAddOrEditMedecinMutation,
  useGetListUserQuery,
  useGetListAdminUserQuery,
  useAddOrEditAdminMutation,
  useLazyAdminBySlugQuery,
  useDeleteAdminMutation,
  useArchiveUserMutation,
  useUnArchiveUserMutation,
  useGetInfoDashboardAdminQuery
} = UserApi
