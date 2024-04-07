import { atom } from 'jotai'
import { LessonKey } from 'lib/progress'
import { Data } from 'types'
import { DefaultUserAccount } from './Defaults'

// AuthState
export const accountAtom = atom<UserAccount>(DefaultUserAccount)
export const isAuthLoadingAtom = atom(false)

// DataState
export const isDataLoadingAtom = atom(true)
export const currentLanguageAtom = atom<Language>('javascript')

// FeatureState
export const isFeatureLoadingAtom = atom(true)
export const featuresAtom = atom<{ [key: string]: number }>({})

// ModalState
export enum Modal {
  Account = 'account',
  SignIn = 'signin',
  SignUp = 'signup',
}

export const modalsAtom = atom({
  [Modal.Account]: { open: false, meta: undefined },
  [Modal.SignIn]: { open: false, meta: undefined },
  [Modal.SignUp]: { open: false, meta: undefined },
})

// ProgressState
export const currentLessonAtom = atom<LessonKey>('CH1INT1')
export const isProgressLoadingAtom = atom(true)
