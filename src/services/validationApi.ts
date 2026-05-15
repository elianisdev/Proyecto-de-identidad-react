import { API_URL } from '../constants'
import type { ApiResponse, CapturedImage, SimulateOutcome } from '../types/validation'

type Captures = Record<'frente' | 'reverso' | 'selfie', CapturedImage>

const buildApprovedResponse = (): ApiResponse => ({
  success: true,
  result: {
    approved: true,
    score: 0.94,
    risk_level: 'low',
    recommendation: 'approve',
    details: {
      average_quality: 0.92,
      quality: {
        frente: { blur_score: 0.05, brightness: 0.6, resolution: '1280x720', quality_score: 0.93, is_valid: true },
        reverso: { blur_score: 0.06, brightness: 0.58, resolution: '1280x720', quality_score: 0.91, is_valid: true },
        selfie: { blur_score: 0.04, brightness: 0.62, resolution: '1280x720', quality_score: 0.95, is_valid: true },
      },
    },
    ocr: {
      numero_cedula: '1********9',
      nombres: 'NOMBRE DEMO',
      apellidos: 'APELLIDO DEMO',
      fecha_nacimiento: '****-**-**',
      fecha_expedicion: '****-**-**',
      confianza: 0.97,
    },
    biometric: {
      match: true,
      confidence: 0.96,
      score: 0.96,
    },
    processing: {
      steps_completed: ['upload', 'ocr', 'biometric', 'risk'],
      total_processing_time_seconds: 1.8,
    },
    validation_timestamp: new Date().toISOString(),
  },
})

const buildRejectedResponse = (): ApiResponse => ({
  success: true,
  result: {
    approved: false,
    score: 0.32,
    risk_level: 'high',
    recommendation: 'reject',
    details: {
      average_quality: 0.41,
      quality: {
        frente: { blur_score: 0.62, brightness: 0.32, resolution: '640x480', quality_score: 0.38, is_valid: false },
        reverso: { blur_score: 0.55, brightness: 0.34, resolution: '640x480', quality_score: 0.42, is_valid: false },
        selfie: { blur_score: 0.48, brightness: 0.41, resolution: '640x480', quality_score: 0.44, is_valid: false },
      },
    },
    ocr: {
      numero_cedula: '—',
      nombres: 'NO LEGIBLE',
      apellidos: 'NO LEGIBLE',
      fecha_nacimiento: '—',
      fecha_expedicion: '—',
      confianza: 0.31,
    },
    biometric: {
      match: false,
      confidence: 0.28,
      score: 0.28,
    },
    processing: {
      steps_completed: ['upload', 'ocr', 'biometric'],
      total_processing_time_seconds: 1.5,
    },
    validation_timestamp: new Date().toISOString(),
  },
})

export const validateIdentity = async (
  userId: string,
  captures: Captures,
  outcome: SimulateOutcome,
) => {
  const form = new FormData()
  form.append('cedula_frente', captures.frente.file, 'cedula_frente.jpg')
  form.append('cedula_reverso', captures.reverso.file, 'cedula_reverso.jpg')
  form.append('selfie', captures.selfie.file, 'selfie.jpg')

  const endpoint = `${API_URL}?user_id=${encodeURIComponent(userId.trim())}`
  const res = await fetch(endpoint, { method: 'POST', body: form })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  await res.json()
  return outcome === 'approved' ? buildApprovedResponse() : buildRejectedResponse()
}