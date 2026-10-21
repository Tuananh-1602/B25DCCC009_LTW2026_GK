import { useNavigate, useParams } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventId = Number(id);
  const event = Number.isNaN(eventId) ? undefined : events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main className="container">
        <section className="detail-card">
          <h1>Không tìm thấy sự kiện</h1>
          <button className="button button-secondary" type="button" onClick={() => navigate(-1)}>Quay lại</button>
        </section>
      </main>
    );
  }

  return (
    <main className="container narrow-container">
      <section className="page-heading compact-heading">
        <p className="eyebrow">CHI TIẾT SỰ KIỆN</p>
        <h1>{event.name}</h1>
      </section>
      <section className="detail-card">
        <p><strong>Tên sự kiện:</strong> {event.name}</p>
        <p><strong>Địa điểm:</strong> {event.location}</p>
        <p><strong>Ngày:</strong> {event.date}</p>
        <p><strong>Số chỗ:</strong> {event.registered}/{event.capacity}</p>
        <Countdown date={event.date} />
        <button className="button button-secondary" type="button" onClick={() => navigate(-1)}>Quay lại</button>
      </section>
    </main>
  );
};

export default EventDetail;