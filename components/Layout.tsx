'use client'

import AccountModal from 'components/Modals/Account'
import SignInModal from 'components/Modals/SignIn'
import SignUpModal from 'components/Modals/SignUp'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useAuthFunctions } from 'state/AuthFunctions'
import { useFeatureFunctions } from 'state/FeatureFunctions'
import { useModalFunctions } from 'state/ModalFunctions'
import { useProgressFunctions } from 'state/ProgressFunctions'
import { Modal, modalsAtom } from 'state/state'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [modals] = useAtom(modalsAtom)
  const { close } = useModalFunctions()
  const { check } = useAuthFunctions()
  const { init: initFeatures } = useFeatureFunctions()
  const { init: initProgress } = useProgressFunctions()

  // Check if the user is authenticated
  useEffect(() => {
    check()
    initFeatures()
    initProgress()
  }, [])

  return (
    <>
      {children}
      <SignInModal
        state={modals[Modal.SignIn]}
        onClose={() => close(Modal.SignIn)}
      />
      <SignUpModal
        state={modals[Modal.SignUp]}
        onClose={() => close(Modal.SignUp)}
      />
      <AccountModal
        state={modals[Modal.Account]}
        onClose={() => close(Modal.Account)}
      />
    </>
  )
}
