import { accountAtom, isDataLoadingAtom } from './State'
import { useSetAtom } from 'jotai'
import {
  getUserAccount,
  getUserProfile,
  getAllLessonsProgress,
  getCurrentLesson,
  updateProfile,
  updateCurrentLesson,
} from 'api/data'

export const useDataFunctions = () => {
  const setIsLoading = useSetAtom(isDataLoadingAtom)
  const setAccount = useSetAtom(accountAtom)

  const fetchAndUpdateUserAccount = async () => {
    setIsLoading(true)
    try {
      const accountData = await getUserAccount()
      setAccount((prevAccount) => ({ ...prevAccount, ...accountData }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAndUpdateUserProfile = async () => {
    setIsLoading(true)
    try {
      const profileData = await getUserProfile()
      setAccount((prevAccount) => ({
        ...prevAccount,
        userProfile: profileData,
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAndUpdateAllLessonsProgress = async () => {
    setIsLoading(true)
    try {
      const lessonsProgressData = await getAllLessonsProgress()
      setAccount((prevAccount) => ({
        ...prevAccount,
        lessons: lessonsProgressData,
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAndUpdateCurrentLesson = async () => {
    setIsLoading(true)
    try {
      const currentLessonData = await getCurrentLesson()
      setAccount((prevAccount) => ({
        ...prevAccount,
        currentLesson: currentLessonData,
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const performUpdateProfile = async (profileData: any) => {
    setIsLoading(true)
    try {
      await updateProfile(profileData)
      setAccount((prevAccount) => ({
        ...prevAccount,
        userProfile: profileData,
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const performUpdateCurrentLesson = async (currentLessonData: string) => {
    setIsLoading(true)
    try {
      await updateCurrentLesson(currentLessonData)
      setAccount((prevAccount) => ({
        ...prevAccount,
        currentLesson: currentLessonData,
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    fetchAndUpdateUserAccount,
    fetchAndUpdateUserProfile,
    fetchAndUpdateAllLessonsProgress,
    fetchAndUpdateCurrentLesson,
    performUpdateProfile,
    performUpdateCurrentLesson,
  }
}
