import { Link } from "react-router-dom";

const EventRow = ({ event, onDelete, onRegister }) => {
  const isFull = event.registered === event.capacity;

  return (
    <tr className={isFull ? "event-full" : ""}>
      <td><Link to={`/events/${event.id}`} className="event-link">{event.name}</Link></td>
      <td>{event.location}</td>
      <td>{event.date}</td>
      <td>{event.registered}/{event.capacity}</td>
      <td>
        <div className="row-actions">
          <button type="button" className="button button-primary button-small" disabled={isFull} onClick={() => onRegister(event.id)}>Đăng ký</button>
          <button type="button" className="button button-danger button-small" onClick={() => onDelete(event.id)}>Xóa</button>
        </div>
      </td>
    </tr>
  );
};

export default EventRow;