import { captureOrder, labelByKind } from '../constants'
import type { ApiResponse } from '../types/validation'

type Props = { result: ApiResponse['result'] }

export function QualityCard({ result }: Props) {
  const quality = result.details?.quality
  const metadata = result.metadata?.images

  return (
    <div className="result-card">
      <h3>Calidad por imagen</h3>
      <div className="quality-list">
        {captureOrder.map((kind) => (
          <div key={kind} className="quality-item">
            <div className="quality-head">
              <strong>{labelByKind[kind]}</strong>
              <span className={quality?.[kind]?.is_valid ? 'success' : 'warning'}>
                {quality?.[kind]?.is_valid ? 'Válida' : 'Revisar'}
              </span>
            </div>
            <div className="quality-metrics">
              <span>Desenfoque: {quality?.[kind]?.blur_score?.toFixed(1) ?? '—'}</span>
              <span>Iluminación: {quality?.[kind]?.brightness?.toFixed(1) ?? '—'}</span>
              <span>
                Resolución detectada:{' '}
                {quality?.[kind]?.resolution ??
                  (metadata?.[kind]?.dimensions?.width
                    ? `${metadata?.[kind]?.dimensions?.width}x${metadata?.[kind]?.dimensions?.height}`
                    : '—')}
              </span>
              <span>Calidad: {quality?.[kind]?.quality_score ?? '—'}</span>
            </div>
          </div>
        ))}
        <div className="quality-foot">
          Promedio de calidad: {result.details?.average_quality ?? '—'}
        </div>
      </div>
    </div>
  )
}
