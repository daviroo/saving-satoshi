interface UserAccount {
  id: string
  privateKey: string
  userProfile: UserProfile
  lessons: Lesson[]
  currentLesson?: string
}

interface UserProfile {
  difficultyLevel: 'beginner' | 'advanced'
  defaultLanguage?: string
}

interface Lesson {
  lessonId?: string
  completed?: boolean
  submissions: Submission[]
}

interface Submission {
  language?: string
  difficulty: 'beginner' | 'advanced'
  answer?: string
  submittedCode?: string
}

type Language = 'javascript' | 'python' | 'unknown'
