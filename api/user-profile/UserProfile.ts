import { LessonKey } from 'lib/progress'

export default async function getProgressLocal(): Promise<LessonKey> {
  try {
    const progress = localStorage.getItem('SavingSatoshiProgress')

    if (!progress) {
      throw new Error('Could not read progress from LocalStorage')
    }

    const res = progress.replace(/['"]/g, '')

    return res as LessonKey
  } catch (errors) {
    console.error(errors)
    return 'CH1INT1'
  }
}
