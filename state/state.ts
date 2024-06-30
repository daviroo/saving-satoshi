import { defaultProgressResponse } from 'api/defaults'
import { atom, createStore } from 'jotai'
import { Language } from 'lib/SavedCode'
import { Progress, Data } from 'types'

export const isLoadingDataAtom = atom<boolean>(true)
export const dataAtom = atom<Data[]>([])
export const currentLanguageAtom = atom<Language>(Language.JavaScript)

export enum Modal {
  Account = 'account',
  SignIn = 'signin',
  SignUp = 'signup',
  Help = 'help',
  Difficulty = 'difficulty',
}

export enum DifficultyLevel {
  NORMAL = 'normal',
  HARD = 'hard',
  NOT_SELECTED = 'not_selected',
}

export const modalsAtom = atom({
  [Modal.Account]: { open: false, meta: undefined },
  [Modal.SignIn]: { open: false, meta: undefined },
  [Modal.SignUp]: { open: false, meta: undefined },
  [Modal.Help]: { open: false, meta: undefined },
  [Modal.Difficulty]: { open: false, meta: undefined },
})

export const accountAtom = atom<any | undefined>(undefined)

export const isAuthLoadingAtom = atom<boolean>(false)

export const isLoadingFeaturesAtom = atom<boolean>(false)
export const featuresAtom = atom<{ [key: string]: number }>({})

export const difficultyLevelAtom = atom<DifficultyLevel>(
  DifficultyLevel.NOT_SELECTED
)

export const store = createStore()
