import { OcrCard } from './OcrCard'
import { QualityCard } from './QualityCard'
import { ResultSummary } from './ResultSummary'
import type { ApiResponse } from '../types/validation'

type Props = {
  result: ApiResponse['result']
  showOcr: boolean
  onToggleOcr: () => void
}

export const SummaryCard = ({ result, showOcr, onToggleOcr }: Props) => (
  <div className="result-grid">
    <ResultSummary
      approved={result.approved}
      score={result.score}
      risk={result.risk_level}
      recommendation={result.recommendation}
    />
    <OcrCard ocr={result.ocr} show={showOcr} onToggle={onToggleOcr} />
    <QualityCard result={result} />
  </div>
)
