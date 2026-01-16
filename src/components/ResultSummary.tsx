type Props = {
  approved: boolean
  score?: number
  risk?: string
  recommendation?: string
}

export function ResultSummary({ approved, score, risk, recommendation }: Props) {
  return (
    <div className="result-card">
      <h3>Resumen</h3>
      <div className="result-row">
        <span>Estado:</span>
        <strong className={approved ? 'success' : 'danger'}>
          {approved ? 'APROBADO' : 'RECHAZADO'}
        </strong>
      </div>
      <div className="result-row">
        <span>Puntaje de validación:</span>
        <strong>{score ?? '—'}</strong>
      </div>
      <div className="result-row">
        <span>Riesgo estimado:</span>
        <strong>{risk ?? 'sin dato'}</strong>
      </div>
      {recommendation && (
        <div className="result-row">
          <span>Recomendación:</span>
          <strong>{recommendation}</strong>
        </div>
      )}
    </div>
  )
}
