import type { ApiResponse } from '../types/validation'

type Props = {
  userId: string
  email: string
  response: ApiResponse
  onReset: () => void
  onGoToProfile: () => void
}

export const HomePage = ({ userId, email, response, onReset, onGoToProfile }: Props) => (
  <section className="card home">
    <p className="eyebrow">Home post-validación</p>
    <h2>Bienvenido, tu identidad fue validada correctamente</h2>
    <p className="muted">
      Navegación simple posterior a la aprobación. Aquí podrías continuar a tu perfil o dashboard.
    </p>
    <div className="home-grid">
      <div className="result-card">
        <h3>Datos clave</h3>
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
          <span>Recomendación</span>
          <strong>{response.result.recommendation ?? '—'}</strong>
        </div>
      </div>

      <div className="result-card">
        <h3>Pasos del servicio</h3>
        <ul className="steps-list">
          {response.result.processing?.steps_completed?.map((stepItem) => (
            <li key={stepItem}>{stepItem}</li>
          )) ?? <li>Procesos internos completados</li>}
        </ul>
        <p className="muted">
          Tiempo total:{' '}
          {response.result.processing?.total_processing_time_seconds
            ? `${response.result.processing.total_processing_time_seconds.toFixed(2)}s`
            : '—'}
        </p>
      </div>
    </div>

    <div className="actions">
      <button className="primary" type="button" onClick={onGoToProfile}>
        Ir a mi perfil
      </button>
      <button type="button" onClick={onReset}>
        Reiniciar validación
      </button>
    </div>
  </section>
)
