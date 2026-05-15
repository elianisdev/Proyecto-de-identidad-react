import './App.css'
import { useState } from 'react'
import { CapturePage } from './pages/CapturePage'
import { HomePage } from './pages/HomePage'
import { ProcessingPage } from './pages/ProcessingPage'
import { ProfilePage } from './pages/ProfilePage'
import { ResultPage } from './pages/ResultPage'
import { WelcomePage } from './pages/WelcomePage'
import { useValidationFlow } from './hooks/useValidationFlow'
import { captureOrder } from './constants'

export const App = () => {
  const {
    step,
    setStep,
    userId,
    setUserId,
    email,
    setEmail,
    simulateOutcome,
    setSimulateOutcome,
    currentKind,
    currentIndex,
    captures,
    apiState,
    response,
    approved,
    onCaptured,
    goNextCapture,
    startValidation,
    resetFlow,
  } = useValidationFlow()

  const [showOcr, setShowOcr] = useState(false)

  const views: Record<typeof step, React.ReactNode> = {
    welcome: (
      <WelcomePage
        userId={userId}
        email={email}
        simulateOutcome={simulateOutcome}
        onChangeUserId={setUserId}
        onChangeEmail={setEmail}
        onChangeSimulateOutcome={setSimulateOutcome}
        onStart={() => setStep('capture')}
      />
    ),
    capture: (
      <CapturePage
        currentKind={currentKind}
        currentIndex={currentIndex}
        captures={captures}
        onCaptured={onCaptured}
        onNext={() =>
          currentIndex === captureOrder.length - 1 ? startValidation() : goNextCapture()
        }
        onReset={resetFlow}
        error={apiState.error}
      />
    ),
    processing: <ProcessingPage />,
    result: (
      <ResultPage
        response={response}
        approved={approved}
        error={apiState.error}
        onRetry={() => setStep('capture')}
        onBack={resetFlow}
        onGoHome={() => setStep('home')}
        showOcr={showOcr}
        onToggleOcr={() => setShowOcr((s) => !s)}
      />
    ),
    home: response ? (
      <HomePage
        userId={userId}
        email={email}
        response={response}
        onReset={resetFlow}
        onGoToProfile={() => setStep('profile')}
      />
    ) : null,
    profile: response ? (
      <ProfilePage
        userId={userId}
        email={email}
        response={response}
        onBack={() => setStep('home')}
        onReset={resetFlow}
      />
    ) : null,
  }

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Proyecto de identidad curso react Front-End</p>
          <h1>Validación de identidad – Cédula Colombia</h1>
        </div>
        <div className="badge">React + TypeScript + Vite</div>
      </header>

      <main className="content">{views[step]}</main>
    </div>
  )
}

export default App
