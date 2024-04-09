/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { IUser } from '../user/user.type'

export type RegisterForm = {
  password: string
  nom: string
  prenom: string
  email: string
  telephone: string
  civilite: 'homme' | 'femme' | 'non binaire'
  adresse: string
  longitude: string
  latitude: string
  user_type: 'admin' | 'praticien' | 'patient' | 'superadmin'
  avatar: File | null
  adresse_2: string
  longitude_2: string
  latitude_2: string
  quartier: string
  ville: string
  telephone_bureau: string
  numero_ordre_medecin: string
  competences: string[]
  autres: string
  signature: File | null
  responsabilite_civile: string
  bio: string
  date_de_naissance: Date | string
  termes: boolean
  condition: boolean
  profil: 'praticien'
  specialite: string
  tarif: TarifForm[]
  step: number
  confirm_password: string
}

export type RegisterFormData = Partial<{
  password: string
  confirm_password: string
  nom: string
  prenom: string
  email: string
  telephone: string
  civilite: 'homme' | 'femme' | 'non binaire'
  adresse: string
  longitude: string
  latitude: string
  ville: string
  is_archive: false
  user_type: 'admin' | 'praticien' | 'patient' | 'superadmin'
  date_de_naissance: string
  matricule: string
  idcni: string
  metier: string
  situation_familliale: string
  nationnalite: string
  contact_urgence: string
  autres: string
  mutuelle: string
  groupe_sanguin: string
  allergies: string
  pathologies: string
  traitements_en_cours: string
  antecedents_familiaux: string
  antecedents_medicaux: string
  antecedents_chirurgicaux: string
  step: number
  hopital: string
  adresse_hopital: string
  numero_hopital: string
  email_hopital: string
}>

export type LoginFormData = {
  email: string
  password: string
  remember_me?: string
}

type TarifForm = {
  denomination: string
  montant: number
}

export type LoginResult = { data: IUser; token: string | null }

export type ForgetPasswordFormData = {
  email: string
}

export type ResetPasswordFormData = {
  email: string
  confirm_password: string
  code: string
  password: string
}

export type ChangePasswordData = {
  old_password: string
  new_password: string
  confirm_password: string
}

export type ProfilPraticien = 'praticien'
