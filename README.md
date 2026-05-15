#Proyecto de Validación de Identidad con Captura en Vivo frontend 

Validación de identidad (Cédula Colombia) con captura en vivo, consumo del endpoint real y flujo aprobado/rechazado.

## Integrante del proyecto

Eliana Suancha Guzmán — Desarrolladora Frontend - elianitasuanguz@gmail.com

> [!IMPORTANT]
> * **Solicito** el certificado virtual, no en fisico
> * **Necesitamos credito** No
> * **Primera vez** viendo la materia

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

1. Pantalla inicial: user_id prellenado, email de referencia, selector de resultado simulado (Aprobado/Rechazado), aviso de privacidad y botón “Iniciar validación”.
2. Captura en vivo (orden obligatorio): frente → reverso → selfie. Vista previa, repetir foto, sin input de archivos (solo cámara).
3. Procesamiento: spinner y mensaje mientras se consume el endpoint.
4. Resultado: aprobado/rechazado según el selector, resumen (score, riesgo, recomendación), toggle para mostrar/ocultar OCR enmascarado, calidad por imagen.
5. Home post-aprobación: mensaje de bienvenida, datos clave y pasos del servicio; botón “Ir a mi perfil” y opción de reiniciar.
6. Perfil: vista con datos personales del OCR (enmascarados) y datos de cuenta/validación; botones para volver al inicio o cerrar sesión.

## Integración con el endpoint

- URL: `POST https://httpbin.org/post?user_id={id}` (API pública de eco; el upload viaja realmente por la red y luego se descarta la respuesta)
- Resultado: el cliente genera la respuesta simulada (`buildApprovedResponse` o `buildRejectedResponse` en `src/services/validationApi.ts`) según el selector elegido en la pantalla inicial, para mantener el flujo del demo sin depender de un servicio de validación real.
- Payload (multipart/form-data): `cedula_frente`, `cedula_reverso`, `selfie` (capturas en vivo).
- Sin subida de archivos locales: se usa `getUserMedia` + `canvas` → `FormData`.

## Manejo de estados y UX

- Estados: welcome → captura → processing → result → home → profile.
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

## Integrante del proyecto

Eliana Suancha Guzmán — Desarrolladora Frontend
