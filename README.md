# Prueba Técnica Front-End · MUBIS

Validación de identidad (Cédula Colombia) con captura en vivo, consumo del endpoint real y flujo aprobado/rechazado.

## Datos provistos

- user_id: `USR-SELLER-0289D5DC`
- email (referencia): `elianitasuanguz@gmail.com`

## Requisitos previos

- Node 18+ (probado en Node 20)
- npm
- Permisos de cámara en el navegador (`http://localhost:5173`; en móvil necesitas https o túnel).

## Instrucciones de ejecución

1) Instalar dependencias: `npm install`  
2) Modo desarrollo: `npm run dev` y abrir `http://localhost:5173`  
3) Build de producción: `npm run build`  
4) Previsualizar el build: `npm run preview`

## Flujo funcional implementado

1. Pantalla inicial: user_id prellenado, email de referencia, aviso de privacidad, botón “Iniciar validación”.
2. Captura en vivo (orden obligatorio): frente → reverso → selfie. Vista previa, repetir foto, sin input de archivos (solo cámara).
3. Procesamiento: spinner y mensaje mientras se consume el endpoint real.
4. Resultado: aprobado/rechazado, resumen (score, riesgo, recomendación), toggle para mostrar/ocultar OCR enmascarado, calidad por imagen.
5. Home post-aprobación: mensaje de bienvenida, datos clave y pasos del servicio; botón ficticio “Ir a mi perfil” y opción de reiniciar.

## Integración con el endpoint

- URL: `POST https://mubis.app/api/cedula/validate-complete?user_id={id}`
- Payload (multipart/form-data): `cedula_frente`, `cedula_reverso`, `selfie` (capturas en vivo).
- Sin subida de archivos locales: se usa `getUserMedia` + `canvas` → `FormData`.

## Manejo de estados y UX

- Estados: welcome → captura → processing → result → home.
- Rechazado: mensaje claro, reintentar o volver al inicio (no redirige a Home).
- Aprobado: muestra resultado y permite/auto-redirige a Home.
- Errores: mensajes claros si falla cámara (permisos) o HTTP; spinner en procesamiento.

## Decisiones técnicas

- Captura en vivo: `getUserMedia` + `canvas.toDataURL` para generar `File` y enviarlo como form-data.
- Orden forzado de captura para garantizar las tres imágenes antes de llamar al endpoint.
- Tipos centralizados (`types/validation.ts`) y constantes (`constants/index.ts`).
- Servicios: `validationApi` para el POST real.
- Hooks: `useCamera` (stream/captura/errores), `useValidationFlow` (estado del flujo, API, auto-redirección aprobada).
- UI/UX: componentes separados (CameraCapture, ResultSummary, OcrCard, QualityCard, SummaryCard) y páginas (Welcome, Capture, Processing, Result, Home); layout responsivo en `App.css`/`index.css`.
- Dependencias mínimas: React + Vite + TypeScript (sin libs extras).

## Cómo probar rápidamente

1. `npm run dev`
2. Permite acceso a la cámara.
3. Captura frente → reverso → selfie.
4. Observa el resultado (aprobado/rechazado) y navega al Home si es aprobado.

## Autor

Eliana Suancha Guzmán — Desarrolladora Frontend
