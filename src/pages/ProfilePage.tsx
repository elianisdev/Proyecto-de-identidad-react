import type { ApiResponse } from '../types/validation'

type Props = {
  userId: string
  email: string
  response: ApiResponse
  onBack: () => void
  onReset: () => void
}

const formatTimestamp = (iso?: string) => {
  if (!iso) return '—'
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

export const ProfilePage = ({ userId, email, response, onBack, onReset }: Props) => {
  const ocr = response.result.ocr
  const fullName = [ocr?.nombres, ocr?.apellidos].filter(Boolean).join(' ') || '—'

  return (
    <section className="card home">
      <p className="eyebrow">Mi perfil</p>
      <h2>{fullName}</h2>
      <p className="muted">
        Información asociada a tu cuenta tras la validación de identidad. Datos sensibles enmascarados.
      </p>

      <div className="home-grid">
        <div className="result-card">
          <h3>Datos personales</h3>
          <div className="result-row">
            <span>Nombres</span>
            <strong>{ocr?.nombres ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Apellidos</span>
            <strong>{ocr?.apellidos ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Cédula</span>
            <strong>{ocr?.numero_cedula ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Fecha nacimiento</span>
            <strong>{ocr?.fecha_nacimiento ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Fecha expedición</span>
            <strong>{ocr?.fecha_expedicion ?? '—'}</strong>
          </div>
        </div>

        <div className="result-card">
          <h3>Cuenta y validación</h3>
          <div className="result-row">
            <span>User ID</span>
            <strong>{userId}</strong>
          </div>
          <div className="result-row">
            <span>Email</span>
            <strong>{email}</strong>
          </div>
          <div className="result-row">
            <span>Score</span>
            <strong>{response.result.score ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Nivel de riesgo</span>
            <strong>{response.result.risk_level ?? '—'}</strong>
          </div>
          <div className="result-row">
            <span>Validado el</span>
            <strong>{formatTimestamp(response.result.validation_timestamp)}</strong>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="primary" type="button" onClick={onBack}>
          Volver al inicio
        </button>
        <button type="button" onClick={onReset}>
          Cerrar sesión
        </button>
      </div>
    </section>
  )
}