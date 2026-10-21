import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onUpdate }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  // Tên hàm bắt buộc theo đề.
  const handleQueryShift = (event) => setQuery(event.target.value);

  const filteredEvents = events.filter((event) => {
    const matchesQuery = event.name.toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi"));
    const isFull = event.registered === event.capacity;
    const matchesStatus = status === "all" || (status === "full" ? isFull : !isFull);
    return matchesQuery && matchesStatus;
  });

  const handleRegister = (id) => {
    const selectedEvent = events.find((event) => event.id === id);
    if (selectedEvent && selectedEvent.registered < selectedEvent.capacity) {
      onUpdate(id, { registered: selectedEvent.registered + 1 });
    }
  };

  return (
    <main className="container">
      <section className="page-heading compact-heading">
        <p className="eyebrow">DANH SÁCH</p>
        <h1>Danh sách sự kiện</h1>
        <p className="muted">Tìm kiếm, lọc tình trạng và quản lý đăng ký của từng sự kiện.</p>
      </section>
      <FilterBar query={query} status={status} onQueryChange={handleQueryShift} onStatusChange={setStatus} />
      <p className="result-count">Tìm thấy {filteredEvents.length} sự kiện</p>
      <EventTable events={filteredEvents} onDelete={onDelete} onRegister={handleRegister} />
    </main>
  );
};

export default EventList;