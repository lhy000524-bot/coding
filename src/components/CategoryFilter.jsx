function CategoryFilter({ categories, selected, onToggle, onSelectAll }) {
  const allSelected = selected.size === 0

  return (
    <div className="category-filter">
      <button
        className={`category-chip ${allSelected ? 'active' : ''}`}
        onClick={onSelectAll}
        type="button"
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-chip ${selected.has(cat) ? 'active' : ''}`}
          onClick={() => onToggle(cat)}
          type="button"
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
