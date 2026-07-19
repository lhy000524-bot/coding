function ProgressBar({ total, knownCount, reviewCount }) {
  const knownPct = total ? (knownCount / total) * 100 : 0
  const reviewPct = total ? (reviewCount / total) * 100 : 0
  const studied = knownCount + reviewCount

  return (
    <div className="progress-wrap">
      <div className="progress-bar">
        <div className="progress-segment progress-known" style={{ width: `${knownPct}%` }} />
        <div className="progress-segment progress-review" style={{ width: `${reviewPct}%` }} />
      </div>
      <div className="progress-labels">
        <span>학습 {studied} / {total}</span>
        <span className="progress-known-label">암기 완료 {knownCount}</span>
      </div>
    </div>
  )
}

export default ProgressBar
