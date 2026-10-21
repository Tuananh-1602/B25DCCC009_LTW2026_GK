
const BUILD_TAG = "wn-1726";
/* eslint-disable import/first */

import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

const STORAGE_KEY = "gk_events";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tải dữ liệu từ localStorage hoặc API
  useEffect(() => {
    const controller = new AbortController();
    const savedEvents = localStorage.getItem(STORAGE_KEY);

    if (savedEvents !== null) {
      try {
        const parsedEvents = JSON.parse(savedEvents);

        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
          setLoading(false);

          return () => controller.abort();
        }
      } catch (parseError) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    axios
      .get("/data/events.json", {
        signal: controller.signal,
      })
      .then((res) => {
        setEvents(res.data);
        setError(false);
      })
      .catch((err) => {
        if (
          axios.isCancel(err) ||
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Lưu dữ liệu sau khi tải xong
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
      );
    }
  }, [events, loading, error]);

  // Thêm sự kiện
  const addEvent = (newEvent) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      newEvent,
    ]);
  };

  // Xóa sự kiện
  const deleteEvent = (id) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  };

  // Cập nhật sự kiện
  const updateEvent = (id, updates) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id
          ? { ...event, ...updates }
          : event
      )
    );
  };

  // Trạng thái đang tải
  if (loading) {
    return (
      <>
        <Layout />
        <main className="container status-message">
          Đang tải...
        </main>
      </>
    );
  }

  // Trạng thái tải dữ liệu thất bại
  if (error) {
    return (
      <>
        <Layout />
        <main className="container status-message">
          Không tải được dữ liệu
        </main>
      </>
    );
  }

  // Khai báo các đường dẫn
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home events={events} />}
        />

        <Route
          path="events"
          element={
            <EventList
              events={events}
              onDelete={deleteEvent}
              onUpdate={updateEvent}
            />
          }
        />

        <Route
          path="events/new"
          element={
            <AddEvent
              events={events}
              onAdd={addEvent}
            />
          }
        />

        <Route
          path="events/:id"
          element={<EventDetail events={events} />}
        />

        <Route
          path="*"
          element={
            <main className="container">
              <p>Không tìm thấy sự kiện.</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
