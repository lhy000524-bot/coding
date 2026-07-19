import { useRef } from 'react'

function UploadScreen({ onFileSelected, onLoadSample, error }) {
  const inputRef = useRef(null)

  return (
    <div className="upload-screen">
      <h1>영단어 플래시카드</h1>
      <p className="upload-desc">
        CSV 파일을 업로드해서 학습을 시작하세요.
        <br />
        컬럼: <code>word, meaning, example, category</code>
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelected(file)
          e.target.value = ''
        }}
      />

      <div className="upload-actions">
        <button className="btn btn-primary" onClick={() => inputRef.current?.click()}>
          CSV 파일 선택
        </button>
        <button className="btn btn-secondary" onClick={onLoadSample}>
          샘플 데이터로 시작하기
        </button>
      </div>

      {error && <p className="upload-error">{error}</p>}
    </div>
  )
}

export default UploadScreen
