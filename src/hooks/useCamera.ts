import { useCallback, useEffect, useRef, useState } from 'react'

const stopStream = (stream?: MediaStream | null) => {
  stream?.getTracks().forEach((track) => track.stop())
}

const dataUrlToFile = (dataUrl: string, name: string) => {
  const [meta, base64] = dataUrl.split(',')
  const mime = meta.match(/data:(.*);base64/)?.[1] ?? 'image/jpeg'
  const bytes = atob(base64)
  const array = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i += 1) {
    array[i] = bytes.charCodeAt(i)
  }
  return new File([array], name, { type: mime })
}

export const useCamera = (facingMode: 'user' | 'environment', fileName: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback(async () => {
    setIsStarting(true)
    setError(null)
    stopStream(streamRef.current)
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Tu navegador no permite acceso a la cámara.')
      setIsStarting(false)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        try {
          await videoRef.current.play()
        } catch (playErr) {
          if ((playErr as DOMException)?.name !== 'AbortError') throw playErr
        }
      }
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return
      setError('No pudimos acceder a tu cámara. Verifica permisos.')
    } finally {
      setIsStarting(false)
    }
  }, [facingMode])

  useEffect(() => {
    void start()
    return () => stopStream(streamRef.current)
  }, [start])

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    const file = dataUrlToFile(dataUrl, fileName)
    stopStream(streamRef.current)
    streamRef.current = null
    setPreview(dataUrl)
    return { dataUrl, file }
  }, [fileName])

  const retake = useCallback(() => {
    setPreview(null)
    void start()
  }, [start])

  return {
    videoRef,
    canvasRef,
    preview,
    isStarting,
    error,
    capture,
    retake,
  }
}
