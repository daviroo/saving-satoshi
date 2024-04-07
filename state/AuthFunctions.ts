import { getSession, login, logout } from 'api/auth'
import { accountAtom, isAuthLoadingAtom } from './State'
import { useSetAtom } from 'jotai'
import { DefaultUserAccount } from './Defaults'

export const useAuthFunctions = () => {
  const setAccount = useSetAtom(accountAtom)
  const setIsLoading = useSetAtom(isAuthLoadingAtom)

  const attemptLogin = async (privateKey: string) => {
    try {
      setIsLoading(true)
      const loginSuccess = await login(privateKey)
      if (!loginSuccess) {
        return false
      }
      const account = await getSession()
      setAccount(account)
      return true
    } catch (ex) {
      console.error(ex)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const attemptLogout = async () => {
    await logout()
    setAccount(DefaultUserAccount)
  }

  return { attemptLogin, attemptLogout }
}
