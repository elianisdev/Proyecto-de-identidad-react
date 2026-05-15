import { useCallback, useEffect, useMemo, useState } from 'react'
import { captureOrder, DEFAULT_EMAIL, DEFAULT_USER_ID } from '../constants'
import { validateIdentity } from '../services/validationApi'
import type {
  ApiResponse,
  CaptureKind,
  CapturedImage,
  SimulateOutcome,
  Step,
} from '../types/validation'

type CapturesState = Record<CaptureKind, CapturedImage | null>

export const useValidationFlow = () => {
  const [step, setStep] = useState<Step>('welcome')
  const [userId, setUserId] = useState(DEFAULT_USER_ID)
  const [email, setEmail] = useState(DEFAULT_EMAIL)
  const [simulateOutcome, setSimulateOutcome] = useState<SimulateOutcome>('approved')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [captures, setCaptures] = useState<CapturesState>({
    frente: null,
    reverso: null,
    selfie: null,
  })
  const [apiState, setApiState] = useState<{ loading: boolean; error: string | null }>({
    loading: false,
    error: null,
  })
  const [response, setResponse] = useState<ApiResponse | null>(null)

  const currentKind = useMemo(() => captureOrder[currentIndex], [currentIndex])

  const resetFlow = useCallback(() => {
    setCaptures({ frente: null, reverso: null, selfie: null })
    setCurrentIndex(0)
    setApiState({ loading: false, error: null })
    setResponse(null)
    setStep('welcome')
  }, [])

  const onCaptured = useCallback((kind: CaptureKind, capture: CapturedImage) => {
    setCaptures((prev) => ({ ...prev, [kind]: capture }))
  }, [])

  const startValidation = useCallback(async () => {
    const missing = captureOrder.filter((k) => !captures[k])
    if (missing.length > 0) {
      setApiState({ loading: false, error: `Falta capturar: ${missing.join(', ')}` })
      setStep('capture')
      return
    }

    setApiState({ loading: true, error: null })
    setStep('processing')

    try {
      const payload = {
        frente: captures.frente!,
        reverso: captures.reverso!,
        selfie: captures.selfie!,
      }
      const json = await validateIdentity(userId, payload, simulateOutcome)
      setResponse(json)
      setStep('result')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al procesar la validación.'
      setApiState({ loading: false, error: message })
      setStep('result')
    } finally {
      setApiState((prev) => ({ ...prev, loading: false }))
    }
  }, [captures, simulateOutcome, userId])

  const goNextCapture = useCallback(() => {
    if (currentIndex < captureOrder.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      void startValidation()
    }
  }, [currentIndex, startValidation])

  const approved = response?.result.approved ?? false

  useEffect(() => {
    if (step === 'result' && approved) {
      const timer = setTimeout(() => setStep('home'), 1800)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [approved, step])

  return {
    step,
    setStep,
    userId,
    setUserId,
    email,
    setEmail,
    simulateOutcome,
    setSimulateOutcome,
    currentKind,
    currentIndex,
    captures,
    apiState,
    response,
    approved,
    onCaptured,
    goNextCapture,
    startValidation,
    resetFlow,
    setCurrentIndex,
    setApiState,
  }
}
