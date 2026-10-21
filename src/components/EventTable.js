import EventRow from "./EventRow";

const EventTable = ({ events, onDelete, onRegister }) => {
  if (events.length === 0) {
    return <p className="empty-state">Không có dữ liệu</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Sự kiện</th>
            <th>Địa điểm</th>
            <th>Ngày</th>
            <th>Số chỗ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventRow key={event.id} event={event} onDelete={onDelete} onRegister={onRegister} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;