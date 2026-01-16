import { SummaryCard } from '../components/SummaryCard'
import type { ApiResponse } from '../types/validation'

type Props = {
  response: ApiResponse | null
  approved: boolean
  error?: string | null
  onRetry: () => void
  onBack: () => void
  onGoHome: () => void
  showOcr: boolean
  onToggleOcr: () => void
}

export const ResultPage = ({
  response,
  approved,
  error,
  onRetry,
  onBack,
  onGoHome,
  showOcr,
  onToggleOcr,
}: Props) => (
  <section className="card">
    {error && !response && (
      <>
        <h2>No fue posible validar tu identidad</h2>
        <p className="muted">{error}</p>
      </>
    )}

    {response && (
      <>
        <p className="eyebrow">Resultado de validación</p>
        <h2 className={approved ? 'success' : 'danger'}>
          {approved ? 'Identidad aprobada' : 'No fue posible validar tu identidad'}
        </h2>

        <SummaryCard result={response.result} showOcr={showOcr} onToggleOcr={onToggleOcr} />
      </>
    )}

    {!approved && (
      <div className="actions">
        <button className="primary" type="button" onClick={onRetry}>
          Reintentar proceso
        </button>
        <button type="button" onClick={onBack}>
          Volver a inicio
        </button>
      </div>
    )}

    {approved && (
      <div className="actions">
        <button className="primary" type="button" onClick={onGoHome}>
          Ir al Home
        </button>
        <span className="hint">También te enviaremos automáticamente en 2 segundos.</span>
      </div>
    )}
  </section>
)
