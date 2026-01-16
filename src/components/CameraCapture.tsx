import { useCamera } from '../hooks/useCamera'
import { facingModeByKind, labelByKind } from '../constants'
import type { CaptureKind, CapturedImage } from '../types/validation'

type Props = {
  kind: CaptureKind
  existing?: CapturedImage | null
  onCapture: (capture: CapturedImage) => void
  onCameraError?: (msg: string) => void
}

export const CameraCapture = ({ kind, existing, onCapture, onCameraError }: Props) => {
  const { videoRef, canvasRef, preview, isStarting, error, capture, retake } = useCamera(
    facingModeByKind[kind],
    `${kind}.jpg`,
  )

  const handleCapture = () => {
    const result = capture()
    if (result) {
      onCapture(result)
    }
  }

  const handleRetake = () => {
    retake()
  }

  if (error) {
    onCameraError?.(error)
  }

  return (
    <div className="camera">
      <div className="camera__frame">
        {preview ?? existing?.dataUrl ? (
          <img
            className="camera__preview"
            src={preview ?? existing?.dataUrl ?? ''}
            alt={`Preview ${kind}`}
          />
        ) : (
          <video ref={videoRef} className="camera__video" autoPlay muted playsInline />
        )}
        <canvas ref={canvasRef} className="camera__canvas" />
      </div>
      <div className="camera__actions">
        {!preview && !existing && (
          <button className="primary" type="button" onClick={handleCapture} disabled={isStarting}>
            {isStarting ? 'Abriendo cámara...' : 'Tomar foto'}
          </button>
        )}
        {(preview || existing) && (
          <>
            <button type="button" onClick={handleRetake}>
              Repetir foto
            </button>
            <span className="hint">Si la imagen es clara, continúa con “Siguiente”.</span>
          </>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
      <ul className="tip-list">
        <li>Buena iluminación, evita reflejos.</li>
        <li>Mantén el documento dentro del marco.</li>
        <li>Sin subir archivos: solo captura en vivo.</li>
      </ul>
      <div className="capture-progress">
        <div className="dot">{labelByKind[kind]}</div>
      </div>
    </div>
  )
}
