import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ChefHat, ShieldCheck, ClipboardList } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Event", path: "/event-details" },
    { label: "Countries", path: "/countries" },
    { label: "Partnerships", path: "/partnerships" },
    { label: "Organizers", path: "/organizers" },
  ];

  return (
    <header className={`wop-nav-wrap ${scrolled ? "is-scrolled" : ""} ${isAdmin ? "is-admin" : ""}`}>
      <nav className="wop-nav">
        <Link to="/" className="wop-brand" onClick={() => setOpen(false)}>
          <div className="wop-brand-mark">W</div>
          <span>
            World on
            <b>a Plate</b>
          </span>
        </Link>

        <div className="wop-nav-links">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="wop-nav-actions">
          <Link
            to="/admin"
            className={`wop-nav-admin ${isAdmin ? "wop-nav-admin--active" : ""}`}
          >
            <ShieldCheck size={15} />
            Admin
          </Link>

          <Link to="/auth/login" className="wop-nav-login">
            <ChefHat size={16} />
            Culinary
          </Link>

          <Link to="/registration" className="wop-nav-register">
            <ClipboardList size={16} />
            Register
          </Link>

          <a href="/#volunteer" className="wop-nav-cta">
            <Sparkles size={16} />
            Volunteer
          </a>
        </div>

        <button
          className="wop-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="wop-mobile-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/admin"
            className={`wop-mobile-admin ${isAdmin ? "wop-mobile-admin--active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <ShieldCheck size={14} />
            Admin
          </Link>

          <Link to="/auth/login" onClick={() => setOpen(false)}>
            Culinary Login
          </Link>

          <Link to="/registration" className="wop-mobile-register" onClick={() => setOpen(false)}>
            <ClipboardList size={14} />
            Register
          </Link>
            <a
          
            href="/#volunteer"
            className="wop-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Volunteer
          </a>
        </div>
      )}
    </header>
  );
}