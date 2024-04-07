import { put } from 'utils'

export async function updateProfile(
  profileData: UserProfile
): Promise<UserProfile> {
  try {
    const response = await put({
      url: `/v1/data/update-profile`,
      body: profileData,
      includeToken: true,
    })
    return response as UserProfile
  } catch (error) {
    console.error(error)
    throw new Error('Unable to update profile')
  }
}

export async function updateLessonProgress(
  lessonData: Lesson
): Promise<Lesson[]> {
  try {
    const response = await put({
      url: `/v1/data/update-lesson-progress`,
      body: lessonData,
      includeToken: true,
    })
    return response as Lesson[]
  } catch (error) {
    console.error(error)
    throw new Error('Unable to update lesson progress')
  }
}

export async function updateCurrentLesson(
  currentLesson: string
): Promise<string> {
  try {
    const response = await put({
      url: `/v1/data/update-current-lesson`,
      body: { currentLesson },
      includeToken: true,
    })
    return response as string
  } catch (error) {
    console.error(error)
    throw new Error('Unable to update current lesson')
  }
}
