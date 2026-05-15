import type { CaptureKind } from '../types/validation'

export const API_URL = 'https://httpbin.org/post'
export const DEFAULT_USER_ID = 'USR-SELLER-0289D5DC'
export const DEFAULT_EMAIL = 'elianitasuanguz@gmail.com'

export const captureOrder: CaptureKind[] = ['frente', 'reverso', 'selfie']

export const labelByKind: Record<CaptureKind, string> = {
  frente: 'Foto frontal de la cédula',
  reverso: 'Foto trasera de la cédula',
  selfie: 'Selfie del usuario',
}

export const facingModeByKind: Record<CaptureKind, 'user' | 'environment'> = {
  frente: 'environment',
  reverso: 'environment',
  selfie: 'user',
}
