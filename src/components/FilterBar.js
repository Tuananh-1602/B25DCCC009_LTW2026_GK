const FilterBar = ({ query, status, onQueryChange, onStatusChange }) => (
  <div className="filter-bar">
    <div className="field filter-search">
      <label htmlFor="event-query">Tìm kiếm</label>
      <input
        id="event-query"
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Nhập tên sự kiện..."
      />
    </div>
    <div className="field filter-status">
      <label htmlFor="event-status">Tình trạng</label>
      <select id="event-status" value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="all">Tất cả</option>
        <option value="available">Còn chỗ</option>
        <option value="full">Đã đầy</option>
      </select>
    </div>
  </div>
);

export default FilterBar;