const BUILD_TAG = "wn-1726";

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
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setError(false);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.code === "ERR_CANCELED") return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, loading, error]);

  const addEvent = (newEvent) => {
    setEvents((currentEvents) => [...currentEvents, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id));
  };

  const updateEvent = (id, updates) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  if (loading) {
    return (
      <>
        <Layout />
        <main className="container status-message">Đang tải...</main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Layout />
        <main className="container status-message">Không tải được dữ liệu</main>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home events={events} />} />
        <Route path="events" element={<EventList events={events} onDelete={deleteEvent} onUpdate={updateEvent} />} />
        <Route path="events/new" element={<AddEvent events={events} onAdd={addEvent} />} />
        <Route path="events/:id" element={<EventDetail events={events} />} />
        <Route path="*" element={<main className="container"><p>Không tìm thấy sự kiện.</p></main>} />
      </Route>
    </Routes>
  );
};

export default App;