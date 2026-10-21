import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ events, onAdd }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !location.trim() || !date || capacity === "") {
      setMessageType("error");
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const numericCapacity = Number(capacity);
    if (!Number.isInteger(numericCapacity) || numericCapacity < 10 || numericCapacity > 1000) {
      setMessageType("error");
      setMessage("Sức chứa phải từ 10 đến 1000");
      return;
    }

    const maxId = events.reduce((max, item) => Math.max(max, item.id), 0);
    onAdd({
      id: maxId + 1,
      name: name.trim(),
      location: location.trim(),
      date,
      capacity: numericCapacity,
      registered: 0
    });

    navigate("/events", { replace: true });
  };

  return (
    <main className="container narrow-container">
      <section className="page-heading compact-heading">
        <p className="eyebrow">TẠO SỰ KIỆN</p>
        <h1>Thêm mới sự kiện</h1>
        <p className="muted">Điền đầy đủ thông tin để thêm sự kiện vào danh sách.</p>
      </section>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="event-name">Tên sự kiện</label>
          <input id="event-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="event-location">Địa điểm</label>
          <input id="event-location" type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="event-date">Ngày diễn ra</label>
          <input id="event-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="event-capacity">Sức chứa</label>
          <input id="event-capacity" type="number" min="10" max="1000" value={capacity} onChange={(event) => setCapacity(event.target.value)} />
        </div>
        {message && <p className={`form-message ${messageType}`} role="alert">{message}</p>}
        <div className="form-actions">
          <button className="button button-primary" type="submit">Thêm</button>
          <button className="button button-secondary" type="button" onClick={() => navigate("/events")}>Hủy</button>
        </div>
      </form>
    </main>
  );
};

export default AddEvent;