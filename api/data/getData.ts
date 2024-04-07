import { get } from 'utils'

export async function getUserAccount(): Promise<UserAccount> {
  try {
    const response = await get({
      url: `/v1/data/`,
      includeToken: true,
    })
    return response as UserAccount
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch user account')
  }
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response = await get({
      url: `/v1/data/profile`,
      includeToken: true,
    })
    return response as UserProfile
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch user profile')
  }
}

export async function getAllLessonsProgress(): Promise<Lesson[]> {
  try {
    const response = await get({
      url: `/v1/data/lesson-progress`,
      includeToken: true,
    })
    return response as Lesson[]
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch lessons progress')
  }
}

export async function getLessonProgress(
  lessonId: string
): Promise<Submission[]> {
  try {
    const response = await get({
      url: `/v1/data/lesson-progress/${lessonId}`,
      includeToken: true,
    })
    return response as Submission[]
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch lesson progress')
  }
}

export async function getCurrentLesson(): Promise<string> {
  try {
    const response = await get({
      url: `/v1/data/current-lesson`,
      includeToken: true,
    })
    return response as string
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch current lesson')
  }
}
