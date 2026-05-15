import type { SimulateOutcome } from '../types/validation'

type Props = {
  userId: string
  email: string
  simulateOutcome: SimulateOutcome
  onChangeUserId: (value: string) => void
  onChangeEmail: (value: string) => void
  onChangeSimulateOutcome: (value: SimulateOutcome) => void
  onStart: () => void
}

export const WelcomePage = ({
  userId,
  email,
  simulateOutcome,
  onChangeUserId,
  onChangeEmail,
  onChangeSimulateOutcome,
  onStart,
}: Props) => {
  return (
    <section className="card hero">
      <div className="hero__info">
        <p className="eyebrow">Inicio de validación</p>
        <h2>Captura en vivo · Sin uploads locales</h2>
        <p className="muted">
          Ingresa tu <strong>user_id</strong> y acepta el aviso de privacidad para iniciar. El flujo
          guiará la captura en orden: frente, reverso y selfie.
        </p>
        <div className="form">
          <label>
            User ID
            <input
              value={userId}
              onChange={(e) => onChangeUserId(e.target.value)}
              placeholder="USR-SELLER-XXXX"
            />
          </label>
          <label>
            Email (referencia)
            <input
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </label>
          <label>
            Resultado simulado
            <select
              value={simulateOutcome}
              onChange={(e) => onChangeSimulateOutcome(e.target.value as SimulateOutcome)}
            >
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </label>
        </div>
        <div className="privacy-box">
          <strong>Aviso de privacidad – Proyecto de identidad curso react</strong>
          <p>
            Los datos e imágenes se usan solo para evaluación. No se almacenan ni se comparten y se
            envían únicamente al servicio de validación.
          </p>
        </div>
        <div className="actions">
          <button className="primary" type="button" onClick={onStart} disabled={!userId.trim()}>
            Iniciar validación
          </button>
          <span className="hint">Capturas en vivo y en orden obligatorio.</span>
        </div>
      </div>
      <div className="hero__aside">
        <div className="callout">
          <p className="muted">Orden de captura</p>
          <ol>
            <li>Foto frontal de la cédula</li>
            <li>Foto trasera de la cédula</li>
            <li>Selfie del usuario</li>
          </ol>
          <p className="muted small">No se permite subir archivos locales.</p>
        </div>
      </div>
    </section>
  )
}
