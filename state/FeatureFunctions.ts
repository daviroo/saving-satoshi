import { featuresAtom, isFeatureLoadingAtom } from './State'
import { useAtomValue } from 'jotai'

export const useFeatureFunctions = () => {
  const features = useAtomValue(featuresAtom)

  const isFeatureEnabled = (name: string) => {
    return !!features[name]
  }

  return { isFeatureEnabled }
}
