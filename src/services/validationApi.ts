import { API_URL } from '../constants'
import type { ApiResponse, CapturedImage } from '../types/validation'

type Captures = Record<'frente' | 'reverso' | 'selfie', CapturedImage>

export const validateIdentity = async (userId: string, captures: Captures) => {
  const form = new FormData()
  form.append('cedula_frente', captures.frente.file, 'cedula_frente.jpg')
  form.append('cedula_reverso', captures.reverso.file, 'cedula_reverso.jpg')
  form.append('selfie', captures.selfie.file, 'selfie.jpg')

  const endpoint = `${API_URL}?user_id=${encodeURIComponent(userId.trim())}`
  const res = await fetch(endpoint, { method: 'POST', body: form })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  return (await res.json()) as ApiResponse
}
