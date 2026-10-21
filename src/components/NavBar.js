import { NavLink } from "react-router-dom";

const NavBar = () => (
  <header className="site-header">
    <nav className="nav container" aria-label="Điều hướng chính">
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/events" end>Danh sách</NavLink>
      <NavLink to="/events/new" end>Thêm mới</NavLink>
    </nav>
  </header>
);

export default NavBar;