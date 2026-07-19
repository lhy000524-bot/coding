function FlashCard({ card, flipped, onFlip, status }) {
  return (
    <div
      className={`flashcard ${flipped ? 'is-flipped' : ''} ${status ? `status-${status}` : ''}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label="카드를 클릭하면 뒤집힙니다"
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-category">{card.category}</span>
          <div className="flashcard-word">{card.word}</div>
          <span className="flashcard-hint">클릭 또는 스페이스바로 뒤집기</span>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-category">{card.category}</span>
          <div className="flashcard-meaning">{card.meaning}</div>
          {card.example && <div className="flashcard-example">{card.example}</div>}
        </div>
      </div>
    </div>
  )
}

export default FlashCard
