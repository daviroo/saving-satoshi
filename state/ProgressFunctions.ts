import { getProgress, setProgress } from 'api/progress'
import { getProgressLocal, setProgressLocal } from 'api/local'
import { currentLessonAtom, isProgressLoadingAtom } from './State'
import { useSetAtom } from 'jotai'
import { keys, LessonKey } from 'lib/progress'

export const useProgressFunctions = () => {
  const setAccountProgress = useSetAtom(currentLessonAtom)
  const setIsLoading = useSetAtom(isProgressLoadingAtom)

  const saveProgress = async (key: LessonKey) => {
    const progress = await getProgress()
    if (keys.indexOf(progress) < keys.indexOf(key)) {
      try {
        setIsLoading(true)
        setAccountProgress(key)
        await setProgress(key)
      } catch (ex) {
        console.error(ex)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const saveProgressLocal = async (key: LessonKey) => {
    const progress = await getProgressLocal()
    if (keys.indexOf(progress) < keys.indexOf(key)) {
      try {
        setIsLoading(true)
        setAccountProgress(key)
        await setProgressLocal(key)
      } catch (ex) {
        console.error(ex)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return { saveProgress, saveProgressLocal }
}
