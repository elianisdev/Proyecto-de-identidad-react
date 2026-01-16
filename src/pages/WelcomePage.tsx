type Props = {
  userId: string
  email: string
  onChangeUserId: (value: string) => void
  onChangeEmail: (value: string) => void
  onStart: () => void
}

export const WelcomePage = ({ userId, email, onChangeUserId, onChangeEmail, onStart }: Props) => {
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
        </div>
        <div className="privacy-box">
          <strong>Aviso de privacidad – Prueba técnica</strong>
          <p>
            Los datos e imágenes se usan solo para evaluación. No se almacenan ni se comparten y se
            envían únicamente al servicio de validación de la prueba.
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
