import { captureOrder, labelByKind } from '../constants'
import { CameraCapture } from '../components/CameraCapture'
import type { CaptureKind, CapturedImage } from '../types/validation'

type Props = {
  currentKind: CaptureKind
  currentIndex: number
  captures: Record<CaptureKind, CapturedImage | null>
  onCaptured: (kind: CaptureKind, capture: CapturedImage) => void
  onNext: () => void
  onReset: () => void
  error?: string | null
}

export const CapturePage = ({
  currentKind,
  currentIndex,
  captures,
  onCaptured,
  onNext,
  onReset,
  error,
}: Props) => (
  <section className="card">
    <div className="flow-head">
      <div>
        <p className="eyebrow">Captura en vivo · Paso {currentIndex + 1} de 3</p>
        <h2>{labelByKind[currentKind]}</h2>
        <p className="muted">
          Mantenemos el orden obligatorio. Usa la vista previa para confirmar claridad y vuelve a
          tomarla si es necesario.
        </p>
      </div>
      <div className="flow-actions">
        <button type="button" onClick={onReset}>
          Volver al inicio
        </button>
        <button
          className="primary"
          type="button"
          onClick={onNext}
          disabled={!captures[currentKind]}
        >
          {currentIndex === captureOrder.length - 1 ? 'Validar identidad' : 'Siguiente captura'}
        </button>
      </div>
    </div>

    <CameraCapture
      key={currentKind}
      kind={currentKind}
      existing={captures[currentKind]}
      onCapture={(capture) => onCaptured(currentKind, capture)}
    />

    <div className="capture-progress">
      {captureOrder.map((kind) => (
        <div key={kind} className={captures[kind] ? 'dot done' : 'dot'}>
          {labelByKind[kind]}
        </div>
      ))}
    </div>

    {error && <p className="error-text">{error}</p>}
  </section>
)
