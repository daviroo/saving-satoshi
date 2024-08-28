import { useSetAtom } from 'jotai'
import { accountAtom, isAuthLoadingAtom } from './state'
import { login, getSession, logout } from 'api/auth'
import { SAVING_SATOSHI_TOKEN } from 'config/keys'
import { defaultProgressState, syncedCourseProgressAtom } from './progressState'
import { getProgress } from 'api/progress'
import { mergeProgressState } from './progressState'

export const useAuthFunctions = () => {
  const setAccount = useSetAtom(accountAtom)
  const setAuthIsLoading = useSetAtom(isAuthLoadingAtom)
  const setCourseProgress = useSetAtom(syncedCourseProgressAtom)
  const attemptLogin = async (privateKey: string) => {
    try {
      setAuthIsLoading(true)

      const loginSuccess = await login(privateKey)
      if (!loginSuccess) {
        return false
      }

      const account = await getSession()
      setAccount(account)

      // Load progress for the logged-in account
      const progress = await getProgress()
      setCourseProgress(mergeProgressState(defaultProgressState, progress))

      return true
    } catch (ex) {
      console.error(ex)
      return false
    } finally {
      setAuthIsLoading(false)
    }
  }

  const attemptLogout = async () => {
    await logout()
    localStorage.clear()
    setAccount(undefined)
  }

  const check = async () => {
    try {
      if (window.localStorage.getItem(SAVING_SATOSHI_TOKEN)) {
        setAuthIsLoading(true)

        const account = await getSession()
        setAccount(account)
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setAuthIsLoading(false)
    }
  }

  return { attemptLogin, attemptLogout, check }
}
