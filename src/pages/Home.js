const Home = ({ events }) => {
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registered, 0);
  const fullEvents = events.filter((event) => event.registered === event.capacity).length;

  return (
    <main className="container">
      <section className="page-heading">
        <p className="eyebrow">CÂU LẠC BỘ LẬP TRÌNH</p>
        <h1>Sự kiện CLB</h1>
        <p className="muted">Theo dõi sự kiện, số lượt đăng ký và lịch hoạt động của câu lạc bộ.</p>
      </section>
      <section className="stats-grid" aria-label="Thống kê sự kiện">
        <article className="stat-card">
          <span className="stat-label">Tổng số sự kiện</span>
          <strong className="stat-number">{totalEvents}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">Tổng số lượt đăng ký</span>
          <strong className="stat-number">{totalRegistrations}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">Số sự kiện đã đầy</span>
          <strong className="stat-number">{fullEvents}</strong>
        </article>
      </section>
    </main>
  );
};

export default Home;