export type CaptureKind = 'frente' | 'reverso' | 'selfie'

export type CapturedImage = {
  dataUrl: string
  file: File
}

export type QualityInfo = {
  blur_score?: number
  brightness?: number
  resolution?: string
  quality_score?: number
  is_valid?: boolean
}

export type ImageMetadata = {
  filename?: string
  content_type?: string
  file_size?: {
    kilobytes?: number
  }
  dimensions?: {
    width?: number
    height?: number
  }
  quality_metrics?: {
    blur_score?: number
    brightness?: number
    contrast?: number
  }
  quality_assessment?: {
    is_blurry?: boolean
    is_too_dark?: boolean
    is_too_bright?: boolean
    has_good_contrast?: boolean
    resolution_adequate?: boolean
  }
}

export type ApiResponse = {
  success: boolean
  result: {
    approved: boolean
    score?: number
    risk_level?: string
    recommendation?: string
    details?: {
      quality?: Record<CaptureKind, QualityInfo>
      average_quality?: number
    }
    ocr?: {
      numero_cedula?: string
      nombres?: string
      apellidos?: string
      fecha_nacimiento?: string
      fecha_expedicion?: string
      confianza?: number
    }
    biometric?: {
      match?: boolean
      confidence?: number
      score?: number
    }
    metadata?: {
      images?: Record<CaptureKind, ImageMetadata>
    }
    processing?: {
      steps_completed?: string[]
      total_processing_time_seconds?: number
    }
    validation_timestamp?: string
    errors?: unknown
  }
}

export type Step = 'welcome' | 'capture' | 'processing' | 'result' | 'home'
