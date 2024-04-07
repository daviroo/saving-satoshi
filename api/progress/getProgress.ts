import { LessonKey } from 'lib/progress'
import { get } from 'utils'

export default async function getProgress(): Promise<LessonKey> {
  try {
    const res = await get({
      url: '/v1/progress',
      includeToken: true,
    })

    return res.progress
  } catch (errors) {
    console.error(errors)
    return 'CH1INT1'
  }
}
