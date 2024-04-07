import { modalsAtom } from './State'
import { useSetAtom } from 'jotai'

export const useModalFunctions = () => {
  const setModals = useSetAtom(modalsAtom)

  const open = (name: string, meta = {}) => {
    setModals((prevModals) => ({
      ...prevModals,
      [name]: { open: true, meta },
    }))
    document.body.classList.add('overflow-y-hidden')
  }

  const close = (name: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [name]: { ...prevModals[name], open: false },
    }))
    document.body.classList.remove('overflow-y-hidden')
  }

  return { open, close }
}
