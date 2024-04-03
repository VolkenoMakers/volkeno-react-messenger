/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

export enum UserType {
  admin = 'admin',
  medecin = 'medecin',
  praticien = 'praticien',
  patient = 'patient',
  secretaire = 'secretaire',
  superadmin = 'superadmin',
  pending = 'pending'
}

export type CiviliteType = 'homme' | 'femme' | 'non binaire'

export interface IUser {
  id: number
  slug: string
  password: string
  nom: string
  prenom: string
  email: string
  telephone: string
  civilite: CiviliteType
  adresse: string
  longitude: string
  latitude: string
  user_type: string
  avatar: File | null
  adresse_2: string
  longitude_2: string
  latitude_2: string
  quartier: string
  ville: string
  telephone_bureau: string
  numero_ordre_medecin: string
  competences: string[] | any
  autres: string
  signature: File | null
  responsabilite_civile: string
  bio: string
  date_de_naissance: Date | string
  termes: boolean
  condition: boolean
  profil: 'medecin' | 'professionnel_de_sante'
  specialite: any
  tarif: Tarif[] | any
  owner_cabinet: boolean
  email_visibility: boolean
  civilite_visibility: boolean
  date_de_naissance_visibility: boolean
  telephone_visibility: boolean
  telephone_bureau_visibility: boolean
  is_active: boolean
  is_archive: boolean
}

export type UserFormData = Partial<{
  id: number
  slug: string
  password: string
  nom: string
  prenom: string
  email: string
  telephone: string
  civilite: CiviliteType
  adresse: string
  longitude: string
  latitude: string
  user_type: string
  avatar: File | null
  adresse_2: string
  longitude_2: string
  latitude_2: string
  quartier: string
  ville: string
  telephone_bureau: string
  numero_ordre_medecin: string
  competences: string[] | any
  autres: string
  signature: File | null
  responsabilite_civile: string
  bio: string
  date_de_naissance: Date | string
  termes: boolean
  condition: boolean
  profil: 'medecin' | 'professionnel_de_sante'
  specialite: any
  tarif: Partial<Tarif>[] | any
  email_visibility: boolean
  civilite_visibility: boolean
  date_de_naissance_visibility: boolean
  telephone_visibility: boolean
  telephone_bureau_visibility: boolean
  is_active: boolean
  is_archive: boolean
}>

export type Tarif = {
  id: number
  slug: string
  denomination: string
  montant: number
  created_at: string
  praticien: IUser
}

export interface AuthState {
  user: IUser | any
  token?: string | null
}

export type PaginationResults<T> = {
  count?: number
  next?: string | null
  previous?: string | null
  results: T[]
  limit?: number
  nbPage?: number
  nbPages?: number
}
export type PaginationDocResults<T> = {
  count?: number
  next?: string | null
  previous?: string | null
  documents: T[]
  limit?: number
  nbPage?: number
  nbPages?: number
  messages_non_lues?: number
}

export type TypeQuery = Partial<{
  page?: number
  limit?: number
  word?: string | null
  slug?: string
  name?: string | null
  user?: string
  q?: string | null
  theme?: string | null
  motif?: string | null
  value?: string | null
  date?: Date | string | null
  date_debut?: Date | string | null
  date_fin?: Date | string | null
  filter?: string | null
}>
