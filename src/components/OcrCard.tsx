import type { ApiResponse } from '../types/validation'

type Props = {
  ocr?: ApiResponse['result']['ocr']
  show: boolean
  onToggle: () => void
}

export function OcrCard({ ocr, show, onToggle }: Props) {
  return (
    <div className="result-card">
      <div className="result-card__title">
        <h3>OCR enmascarado</h3>
        <button type="button" className="ghost" onClick={onToggle}>
          {show ? 'Ocultar datos OCR' : 'Ver datos OCR'}
        </button>
      </div>
      {show ? (
        <div className="ocr-grid">
          <div>
            <span>Número de cédula</span>
            <strong>{ocr?.numero_cedula ?? '—'}</strong>
          </div>
          <div>
            <span>Nombres</span>
            <strong>{ocr?.nombres ?? '—'}</strong>
          </div>
          <div>
            <span>Apellidos</span>
            <strong>{ocr?.apellidos ?? '—'}</strong>
          </div>
          <div>
            <span>Fecha de nacimiento</span>
            <strong>{ocr?.fecha_nacimiento ?? '—'}</strong>
          </div>
          <div>
            <span>Fecha de expedición</span>
            <strong>{ocr?.fecha_expedicion ?? '—'}</strong>
          </div>
          <div>
            <span>Confianza de lectura</span>
            <strong>{ocr?.confianza ?? '—'}</strong>
          </div>
        </div>
      ) : (
        <p className="muted">Toca “Ver datos OCR” para mostrar la información.</p>
      )}
    </div>
  )
}
