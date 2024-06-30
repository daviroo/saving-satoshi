import { getProgressLocal, setProgressLocal } from 'api/local'
import { getProgress, setProgress } from 'api/progress'
import { lessons } from 'content'
import { atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { CourseProgress, LessonInState } from 'types'
import { accountAtom, DifficultyLevel } from './state'

export const defaultProgressState: CourseProgress = {
  chapters: [
    {
      id: 1,
      lessons: [
        { id: 'CH1INT1', path: '/chapter-1/intro-1', completed: false },
        { id: 'CH1INT2', path: '/chapter-1/intro-2', completed: false },
        { id: 'CH1GEN1', path: '/chapter-1/genesis-1', completed: false },
        { id: 'CH1GEN2', path: '/chapter-1/genesis-2', completed: false },
        { id: 'CH1GEN3', path: '/chapter-1/genesis-3', completed: false },
        { id: 'CH1GEN4', path: '/chapter-1/genesis-4', completed: false },
        { id: 'CH1TRA1', path: '/chapter-1/transacting-1', completed: false },
        { id: 'CH1TRA2', path: '/chapter-1/transacting-2', completed: false },
        { id: 'CH1TRA3', path: '/chapter-1/transacting-3', completed: false },
        { id: 'CH1OUT1', path: '/chapter-1/outro-1', completed: false },
        { id: 'CH1OUT2', path: '/chapter-1/outro-2', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 2,
      lessons: [
        { id: 'CH2INT1', path: '/chapter-2/intro-1', completed: false },
        { id: 'CH2INT2', path: '/chapter-2/intro-2', completed: false },
        { id: 'CH2HSH1', path: '/chapter-2/hashing-1', completed: false },
        { id: 'CH2HSH2', path: '/chapter-2/hashing-2', completed: false },
        { id: 'CH2HSH3', path: '/chapter-2/hashing-3', completed: false },
        { id: 'CH2HSH4', path: '/chapter-2/hashing-4', completed: false },
        { id: 'CH2HSH5', path: '/chapter-2/hashing-5', completed: false },
        { id: 'CH2HSH6', path: '/chapter-2/hashing-6', completed: false },
        { id: 'CH2SCR1', path: '/chapter-2/scripting-1', completed: false },
        { id: 'CH2SCR2', path: '/chapter-2/scripting-2', completed: false },
        { id: 'CH2MIN1', path: '/chapter-2/mining-1', completed: false },
        { id: 'CH2OUT1', path: '/chapter-2/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 3,
      lessons: [
        { id: 'CH3INT1', path: '/chapter-3/intro-1', completed: false },
        { id: 'CH3SOL1', path: '/chapter-3/solo-1', completed: false },
        { id: 'CH3POL1', path: '/chapter-3/pool-1', completed: false },
        { id: 'CH3POL2', path: '/chapter-3/pool-2', completed: false },
        { id: 'CH3COO1', path: '/chapter-3/coop-1', completed: false },
        { id: 'CH3COO2', path: '/chapter-3/coop-2', completed: false },
        { id: 'CH3COO3', path: '/chapter-3/coop-3', completed: false },
        { id: 'CH3SPL1', path: '/chapter-3/split-1', completed: false },
        { id: 'CH3SPL2', path: '/chapter-3/split-2', completed: false },
        { id: 'CH3OUT1', path: '/chapter-3/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 4,
      lessons: [
        { id: 'CH4INT1', path: '/chapter-4/intro-1', completed: false },
        { id: 'CH4PKY1', path: '/chapter-4/public-key-1', completed: false },
        { id: 'CH4PKY2', path: '/chapter-4/public-key-2', completed: false },
        { id: 'CH4PKY3', path: '/chapter-4/public-key-3', completed: false },
        { id: 'CH4PKY4', path: '/chapter-4/public-key-4', completed: false },
        { id: 'CH4ADR1', path: '/chapter-4/address-1', completed: false },
        { id: 'CH4ADR2', path: '/chapter-4/address-2', completed: false },
        { id: 'CH4ADR3', path: '/chapter-4/address-3', completed: false },
        { id: 'CH4OUT1', path: '/chapter-4/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 5,
      lessons: [
        { id: 'CH5INT1', path: '/chapter-5/intro-1', completed: false },
        { id: 'CH5INT2', path: '/chapter-5/intro-2', completed: false },
        { id: 'CH5INT3', path: '/chapter-5/intro-3', completed: false },
        {
          id: 'CH5DRM1',
          path: '/chapter-5/derive-message-1',
          completed: false,
        },
        {
          id: 'CH5DRM2',
          path: '/chapter-5/derive-message-2',
          completed: false,
        },
        {
          id: 'CH5DRM3',
          path: '/chapter-5/derive-message-3',
          completed: false,
        },
        {
          id: 'CH5DRM4',
          path: '/chapter-5/derive-message-4',
          completed: false,
        },
        {
          id: 'CH5DRM5',
          path: '/chapter-5/derive-message-5',
          completed: false,
        },
        {
          id: 'CH5DRM6',
          path: '/chapter-5/derive-message-6',
          completed: false,
        },
        {
          id: 'CH5DRM7',
          path: '/chapter-5/derive-message-7',
          completed: false,
        },
        {
          id: 'CH5VFS1',
          path: '/chapter-5/verify-signature-1',
          completed: false,
        },
        {
          id: 'CH5VFS2',
          path: '/chapter-5/verify-signature-2',
          completed: false,
        },
        {
          id: 'CH5VFS3',
          path: '/chapter-5/verify-signature-3',
          completed: false,
        },
        {
          id: 'CH5VFS4',
          path: '/chapter-5/verify-signature-4',
          completed: false,
        },
        {
          id: 'CH5VFS5',
          path: '/chapter-5/verify-signature-5',
          completed: false,
        },
        {
          id: 'CH5VLS1',
          path: '/chapter-5/validate-signature-1',
          completed: false,
        },
        {
          id: 'CH5VLS2',
          path: '/chapter-5/validate-signature-2',
          completed: false,
        },
        {
          id: 'CH5VLS3',
          path: '/chapter-5/validate-signature-3',
          completed: false,
        },
        {
          id: 'CH5VLS4',
          path: '/chapter-5/validate-signature-4',
          completed: false,
        },
        { id: 'CH5OUT1', path: '/chapter-5/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 6,
      difficulties: [
        {
          level: DifficultyLevel.NORMAL,
          lessons: [
            { id: 'CH6INT1', path: '/chapter-6/intro-1', completed: false },
            { id: 'CH6INT2', path: '/chapter-6/intro-2', completed: false },
            { id: 'CH6INO1', path: '/chapter-6/in-out-1', completed: false },
            { id: 'CH6INO2', path: '/chapter-6/in-out-2', completed: false },
            { id: 'CH6INO3', path: '/chapter-6/in-out-3', completed: false },
            {
              id: 'CH6INO4',
              path: '/chapter-6/in-out-4/normal',
              completed: false,
            },
            { id: 'CH6INO5', path: '/chapter-6/in-out-5', completed: false },
            {
              id: 'CH6PUT1',
              path: '/chapter-6/put-it-together-1',
              completed: false,
            },
            {
              id: 'CH6PUT2',
              path: '/chapter-6/put-it-together-2',
              completed: false,
            },
            {
              id: 'CH6PUT3',
              path: '/chapter-6/put-it-together-3',
              completed: false,
            },
            { id: 'CH6OUT1', path: '/chapter-6/outro-1', completed: false },
          ],
          completed: false,
        },
        {
          level: DifficultyLevel.HARD,
          lessons: [
            { id: 'CH6INT1', path: '/chapter-6/intro-1', completed: false },
            { id: 'CH6INT2', path: '/chapter-6/intro-2', completed: false },
            { id: 'CH6INO1', path: '/chapter-6/in-out-1', completed: false },
            { id: 'CH6INO2', path: '/chapter-6/in-out-2', completed: false },
            { id: 'CH6INO3', path: '/chapter-6/in-out-3', completed: false },
            {
              id: 'CH6INO4',
              path: '/chapter-6/in-out-4/normal',
              completed: false,
            },
            { id: 'CH6INO5', path: '/chapter-6/in-out-5', completed: false },
            {
              id: 'CH6PUT1',
              path: '/chapter-6/put-it-together-1',
              completed: false,
            },
            {
              id: 'CH6PUT2',
              path: '/chapter-6/put-it-together-2',
              completed: false,
            },
            {
              id: 'CH6PUT3',
              path: '/chapter-6/put-it-together-3',
              completed: false,
            },
            { id: 'CH6OUT1', path: '/chapter-6/outro-1', completed: false },
          ],
          completed: false,
        },
      ],
      completed: false,
      selectedDifficulty: DifficultyLevel.NORMAL,
      hasDifficulty: true,
    },
    {
      id: 7,
      lessons: [
        { id: 'CH7INT1', path: '/chapter-7/intro-1', completed: false },
        { id: 'CH7INT2', path: '/chapter-7/intro-2', completed: false },
        { id: 'CH7INT3', path: '/chapter-7/intro-3', completed: false },
        {
          id: 'CH7MPT1',
          path: '/chapter-7/mempool-transaction-1',
          completed: false,
        },
        { id: 'CH7OUT1', path: '/chapter-7/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 8,
      lessons: [
        { id: 'CH8INT1', path: '/chapter-8/intro-1', completed: false },
        { id: 'CH8INT2', path: '/chapter-8/intro-2', completed: false },
        { id: 'CH8INT3', path: '/chapter-8/intro-3', completed: false },
        {
          id: 'CH8BBK1',
          path: '/chapter-8/building-blocks-1',
          completed: false,
        },
        {
          id: 'CH8BBK2',
          path: '/chapter-8/building-blocks-2',
          completed: false,
        },
        {
          id: 'CH8BBK3',
          path: '/chapter-8/building-blocks-3',
          completed: false,
        },
        {
          id: 'CH8BBK4',
          path: '/chapter-8/building-blocks-4',
          completed: false,
        },
        {
          id: 'CH8BBK5',
          path: '/chapter-8/building-blocks-5',
          completed: false,
        },
        {
          id: 'CH8BBK6',
          path: '/chapter-8/building-blocks-6',
          completed: false,
        },
        {
          id: 'CH8BBK7',
          path: '/chapter-8/building-blocks-7',
          completed: false,
        },
        {
          id: 'CH8BBK8',
          path: '/chapter-8/building-blocks-8',
          completed: false,
        },
        { id: 'CH8OUT1', path: '/chapter-8/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
    {
      id: 9,
      lessons: [
        { id: 'CH9INT1', path: '/chapter-9/intro-1', completed: false },
        { id: 'CH9INT2', path: '/chapter-9/intro-2', completed: false },
        { id: 'CH9SPL1', path: '/chapter-9/splits-1', completed: false },
        { id: 'CH9SPL2', path: '/chapter-9/splits-2', completed: false },
        { id: 'CH9SPL3', path: '/chapter-9/splits-3', completed: false },
        { id: 'CH9OUT1', path: '/chapter-9/outro-1', completed: false },
      ],
      completed: false,
      hasDifficulty: false,
    },
  ],
  currentChapter: 1,
  currentLesson: 'CH1INT1',
}

export const courseProgressAtom = atom<CourseProgress>(defaultProgressState)

// Derived atom that combines account and course progress states
const combinedProgressAndAccountAtom = atom((get) => {
  const account = get(accountAtom)
  const courseProgress = get(courseProgressAtom)
  return { account, courseProgress }
})

// Effect atom to sync course progress using atomEffect
const syncCourseProgressEffectAtom = atomEffect((get, set) => {
  const { account, courseProgress } = get(combinedProgressAndAccountAtom)
  console.log('syncCourseProgressEffect', account, courseProgress)
  if (account) {
    setProgress(courseProgress)
  } else {
    setProgressLocal(courseProgress)
  }
})

// Atom to trigger the effect whenever course progress or authentication changes
export const syncedCourseProgressAtom = atom(
  (get) => {
    get(syncCourseProgressEffectAtom) // This will trigger the effect
    return get(courseProgressAtom)
  },
  (get, set, update: Partial<CourseProgress>) => {
    set(courseProgressAtom, (prev) => ({ ...prev, ...update }))
  }
)

export const currentChapterAtom = atom(
  (get) => get(syncedCourseProgressAtom).currentChapter,
  (get, set, newChapter: number) => {
    const courseProgress = get(syncedCourseProgressAtom)
    set(syncedCourseProgressAtom, {
      ...courseProgress,
      currentChapter: newChapter,
    })
  }
)

export const currentLessonAtom = atom(
  (get) => get(syncedCourseProgressAtom).currentLesson,
  (get, set, newLesson: string) => {
    const courseProgress = get(syncedCourseProgressAtom)
    set(syncedCourseProgressAtom, {
      ...courseProgress,
      currentLesson: newLesson,
    })
  }
)

export const currentLessonComputedAtom = atom((get) => {
  const courseProgress = get(syncedCourseProgressAtom)

  for (const chapter of courseProgress.chapters) {
    if (!chapter.completed) {
      let lessons: LessonInState[] = []

      if (chapter.hasDifficulty) {
        const difficulty = chapter.difficulties?.find(
          (d) => d.level === chapter.selectedDifficulty
        )
        if (difficulty) {
          lessons = difficulty.lessons
        }
      } else {
        lessons = chapter.lessons || []
      }

      for (const lesson of lessons) {
        if (!lesson.completed) {
          return lesson
        }
      }
    }
  }

  // If all lessons are complete, return null or handle appropriately
  return null
})

export const nextLessonAtom = atom((get) => {
  const courseProgress = get(syncedCourseProgressAtom)
  const currentLesson = get(currentLessonAtom)
  let foundCurrent = false

  for (const chapter of courseProgress.chapters) {
    if (!chapter.completed) {
      let lessons: LessonInState[] = []

      if (chapter.hasDifficulty) {
        const difficulty = chapter.difficulties?.find(
          (d) => d.level === chapter.selectedDifficulty
        )
        if (difficulty) {
          lessons = difficulty.lessons
        }
      } else {
        lessons = chapter.lessons || []
      }

      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i]
        if (lesson?.id === currentLesson) {
          foundCurrent = true
          if (i + 1 < lessons.length) {
            return lessons[i + 1] // Return the next lesson in the same chapter
          }
        } else if (foundCurrent && !lesson.completed) {
          return lesson // Return the next incomplete lesson in the same chapter
        }
      }

      // If current lesson is in this chapter but no more lessons in this chapter, move to next chapter
      if (foundCurrent) {
        continue
      }
    }
  }

  // If all chapters and lessons are complete, return null or handle appropriately
  return null
})

export const currentLessonPathAtom = atom((get) => {
  const courseProgress = get(syncedCourseProgressAtom)
  const currentChapterId = courseProgress.currentChapter
  const currentLessonId = courseProgress.currentLesson

  const currentChapter = courseProgress.chapters.find(
    (chapter) => chapter.id === currentChapterId
  )

  if (!currentChapter) {
    return null // Handle case where the current chapter is not found
  }

  let lessons: LessonInState[] = []

  if (currentChapter.hasDifficulty) {
    const difficulty = currentChapter.difficulties?.find(
      (d) => d.level === currentChapter.selectedDifficulty
    )
    if (difficulty) {
      lessons = difficulty.lessons
    }
  } else {
    lessons = currentChapter.lessons || []
  }

  const currentLesson = lessons.find((lesson) => lesson.id === currentLessonId)

  return currentLesson ? currentLesson.path : null
})

export const getLessonById = (
  lessonId: string,
  courseProgress: CourseProgress
) => {
  for (const chapter of courseProgress.chapters) {
    let lessons: LessonInState[] = []

    if (chapter.hasDifficulty) {
      lessons =
        chapter.difficulties?.flatMap((difficulty) => difficulty.lessons) || []
    } else {
      lessons = chapter.lessons || []
    }

    const lesson = lessons.find((lesson) => lesson.id === lessonId)
    if (lesson) {
      return lesson
    }
  }

  // If the lesson is not found, return null or handle appropriately
  return null
}

export const isLastLesson = (
  lessonId: string,
  courseProgress: CourseProgress
) => {
  const lastChapter =
    courseProgress.chapters[courseProgress.chapters.length - 1]

  let lastLesson: LessonInState | undefined

  if (lastChapter.hasDifficulty) {
    // For chapters with difficulties, we'll consider the last lesson of the currently selected difficulty
    const selectedDifficulty = lastChapter.difficulties?.find(
      (d) => d.level === lastChapter.selectedDifficulty
    )
    lastLesson =
      selectedDifficulty?.lessons[selectedDifficulty.lessons.length - 1]
  } else {
    // For chapters without difficulties
    lastLesson = lastChapter.lessons?.[lastChapter.lessons.length - 1]
  }

  return lastLesson?.id === lessonId
}

export const isChapterInProgress = (
  chapterNumber: number,
  courseProgress: CourseProgress
) => {
  const chapter = courseProgress.chapters.find((ch) => ch.id === chapterNumber)

  if (!chapter) return false

  let lessons: LessonInState[] = []

  if (chapter.hasDifficulty) {
    const selectedDifficulty = chapter.difficulties?.find(
      (d) => d.level === chapter.selectedDifficulty
    )
    lessons = selectedDifficulty?.lessons || []
  } else {
    lessons = chapter.lessons || []
  }

  if (lessons.length === 0) return false

  const firstLessonCompleted = lessons[0].completed
  const allLessonsCompleted = lessons.every((lesson) => lesson.completed)

  return firstLessonCompleted && !allLessonsCompleted
}

export const progressToNextLessonAtom = atom(null, (get, set) => {
  const courseProgress = get(syncedCourseProgressAtom)
  const currentLesson = get(currentLessonComputedAtom)

  if (!currentLesson) {
    // All lessons are complete
    return
  }

  const updatedChapters = courseProgress.chapters.map((chapter) => {
    if (chapter.hasDifficulty) {
      return {
        ...chapter,
        difficulties: chapter.difficulties.map((difficulty) => {
          if (difficulty.level === chapter.selectedDifficulty) {
            return {
              ...difficulty,
              lessons: difficulty.lessons.map((lesson) =>
                lesson.id === currentLesson.id
                  ? { ...lesson, completed: true }
                  : lesson
              ),
            }
          }
          return difficulty
        }),
      }
    } else {
      return {
        ...chapter,
        lessons: chapter.lessons.map((lesson) =>
          lesson.id === currentLesson.id
            ? { ...lesson, completed: true }
            : lesson
        ),
      }
    }
  })

  // Find the next lesson
  let nextLesson: LessonInState | null = null
  let nextChapter = courseProgress.currentChapter

  for (
    let i = courseProgress.currentChapter - 1;
    i < updatedChapters.length;
    i++
  ) {
    const chapter = updatedChapters[i]
    let lessons: LessonInState[]

    if (chapter.hasDifficulty) {
      const difficulty = chapter.difficulties.find(
        (d) => d.level === chapter.selectedDifficulty
      )
      lessons = difficulty ? difficulty.lessons : []
    } else {
      lessons = chapter.lessons
    }

    const nextIncompleteLesson = lessons.find((lesson) => !lesson.completed)
    if (nextIncompleteLesson) {
      nextLesson = nextIncompleteLesson
      nextChapter = chapter.id
      break
    }
  }

  set(syncedCourseProgressAtom, {
    ...courseProgress,
    chapters: updatedChapters,
    currentChapter: nextChapter,
    currentLesson: nextLesson ? nextLesson.id : courseProgress.currentLesson,
  })
})

export const nextLessonPathAtom = atom((get) => {
  const courseProgress = get(syncedCourseProgressAtom)
  const currentLesson = get(currentLessonComputedAtom)

  if (!currentLesson) {
    // All lessons are complete, return null or a default path
    return null
  }

  let nextLesson: LessonInState | null = null

  for (
    let i = courseProgress.currentChapter - 1;
    i < courseProgress.chapters.length;
    i++
  ) {
    const chapter = courseProgress.chapters[i]
    let lessons: LessonInState[]

    if (chapter.hasDifficulty) {
      const difficulty = chapter.difficulties.find(
        (d) => d.level === chapter.selectedDifficulty
      )
      lessons = difficulty ? difficulty.lessons : []
    } else {
      lessons = chapter.lessons
    }

    const currentLessonIndex = lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
    )

    if (currentLessonIndex !== -1 && currentLessonIndex < lessons.length - 1) {
      // Next lesson is in the same chapter
      nextLesson = lessons[currentLessonIndex + 1]
      break
    } else if (i < courseProgress.chapters.length - 1) {
      // Next lesson is in the next chapter
      const nextChapter = courseProgress.chapters[i + 1]
      if (nextChapter.hasDifficulty) {
        const difficulty = nextChapter.difficulties.find(
          (d) => d.level === nextChapter.selectedDifficulty
        )
        nextLesson = difficulty ? difficulty.lessons[0] : null
      } else {
        nextLesson = nextChapter.lessons[0]
      }
      break
    }
  }

  return nextLesson ? nextLesson.path : null
})

export const isLoadingProgressAtom = atom<boolean>(true)

// Atom to manually load progress considering account state
export const loadProgressAtom = atom(null, async (get, set) => {
  const account = get(accountAtom)
  if (account) {
    set(isLoadingProgressAtom, true)
    const progressFromServer = await getProgress()
    set(syncedCourseProgressAtom, progressFromServer)
  } else {
    const progressFromLocalStorage = await getProgressLocal()
    set(syncedCourseProgressAtom, progressFromLocalStorage)
  }
  set(isLoadingProgressAtom, false)
})

export const getLessonKey = (chapterId, lessonId) => {
  if (!(chapterId in lessons)) {
    return undefined
  }

  const chapterLessons = lessons[chapterId]
  if (!(lessonId in chapterLessons)) {
    return undefined
  }

  const lesson = chapterLessons[lessonId]
  if (!lesson) {
    return undefined
  }
  return lesson.metadata.key
}

export const isLessonCompletedUsingId = (
  lessonId: string,
  courseProgress: CourseProgress
): boolean => {
  for (const chapter of courseProgress.chapters) {
    let lessons: LessonInState[] = []

    if (chapter.hasDifficulty) {
      const difficulty = chapter.difficulties?.find(
        (d) => d.level === chapter.selectedDifficulty
      )
      if (difficulty) {
        lessons = difficulty.lessons
      }
    } else {
      lessons = chapter.lessons || []
    }

    const lesson = lessons.find((l) => l.id === lessonId)
    if (lesson) {
      return lesson.completed
    }
  }

  return false // If the lesson is not found, we consider it not completed
}

export const isLessonCompletedUsingLessonName = (
  lessonName: string,
  courseProgress: CourseProgress
): boolean => {
  return isLessonCompletedUsingId(
    getLessonKey(`chapter-${courseProgress.currentChapter}`, lessonName),
    courseProgress
  )
}

export const isLessonUnlockedUsingId = (
  lessonId: string,
  courseProgress: CourseProgress
): boolean => {
  for (
    let chapterIndex = 0;
    chapterIndex < courseProgress.chapters.length;
    chapterIndex++
  ) {
    const chapter = courseProgress.chapters[chapterIndex]
    let lessons: LessonInState[] = []

    if (chapter.hasDifficulty) {
      const difficulty = chapter.difficulties?.find(
        (d) => d.level === chapter.selectedDifficulty
      )
      if (difficulty) {
        lessons = difficulty.lessons
      }
    } else {
      lessons = chapter.lessons || []
    }

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]
      if (lesson.id === lessonId) {
        if (lesson.completed) {
          return true
        } else if (i === 0) {
          if (chapterIndex === 0) {
            // First chapter, first lesson should be unlocked initially
            return true
          } else {
            // Check if the previous chapter is completed
            const previousChapter = courseProgress.chapters[chapterIndex - 1]
            return previousChapter.completed
          }
        } else if (lessons[i - 1].completed) {
          return true
        }
        return false
      }
    }
  }

  return false // If the lesson is not found, it's not unlocked
}

export const isLessonUnlockedUsingLessonName = (
  lessonName: string,
  courseProgress: CourseProgress
): boolean => {
  return isLessonUnlockedUsingId(
    getLessonKey(`chapter-${courseProgress.currentChapter}`, lessonName),
    courseProgress
  )
}
