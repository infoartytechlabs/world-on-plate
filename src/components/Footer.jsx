import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Globe2,
  Mail,
  MapPin,
  Music4,
  Send,
  Share2,
  Sparkles,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import market from "../assets/market.webp";
import food1 from "../assets/food1.webp";
import food2 from "../assets/food2.webp";
import "./footer.css";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Event Details", path: "/event-details" },
      { label: "Countries", path: "/countries" },
      { label: "Organizers", path: "/organizers" },
      { label: "FAQ", path: "/faq" },
    ],
  },
  {
    title: "Join",
    links: [
      { label: "Register", path: "/registration" },
      { label: "Culinary Partner", path: "/auth/login" },
      { label: "Sponsor", path: "/partnerships" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

const footerMoments = [
  { icon: UtensilsCrossed, label: "195 dishes" },
  { icon: Music4, label: "Live culture" },
  { icon: Ticket, label: "Free entry" },
];

const footerFacts = [
  { icon: CalendarDays, label: "Sep 26, 2026" },
  { icon: MapPin, label: "Pioneer Square" },
  { icon: Globe2, label: "World record attempt" },
];

const hiddenFooterRoutes = ["/admin", "/auth", "/culinary"];

export default function Footer() {
  const location = useLocation();

  if (hiddenFooterRoutes.some((route) => location.pathname.startsWith(route))) {
    return null;
  }

  return (
    <footer className="wop-footer">
      <div className="footer-ribbon" aria-hidden="true">
        <div>
          <span>World on a Plate</span>
          <span>Seattle</span>
          <span>195 National Dishes</span>
          <span>One Shared Table</span>
          <span>World Record Attempt</span>
        </div>
      </div>

      <div className="wop-container footer-hero">
        <motion.div
          className="footer-hero-copy"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="footer-kicker">
            <Sparkles size={16} />
            Seattle's global table
          </div>

          <h2>
            Come hungry for the world.
          </h2>

          <p>
            World on a Plate brings 195 national dishes, cultural performance, and thousands of visitors together on one Seattle avenue.
          </p>

          <div className="footer-hero-actions">
            <Link to="/registration">
              Register Now <ArrowRight size={18} />
            </Link>
            <Link to="/partnerships">
              Partner With Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="footer-poster"
          initial={{ opacity: 0, y: 42, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={market} alt="World on a Plate marketplace" />
          <div className="footer-poster-card">
            <strong>195</strong>
            <span>National dishes</span>
          </div>
        </motion.div>
      </div>

      <div className="wop-container footer-moment-strip">
        {footerMoments.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.06 }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="wop-container footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-mark" aria-label="World on a Plate home">
            <Globe2 size={28} />
          </Link>

          <h3>
            World on <span>a Plate</span>
          </h3>

          <p>
            A civic celebration of food, culture, community, and Seattle's international spirit.
          </p>

          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Share2 size={18} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Send size={18} />
            </a>
            <a href="mailto:hello@worldonaplate.org" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {footerLinks.map((group) => (
          <nav className="footer-links" key={group.title} aria-label={group.title}>
            <h4>{group.title}</h4>
            {group.links.map((link) => (
              <Link to={link.path} key={link.label}>
                <span>{link.label}</span>
                <ArrowRight size={13} />
              </Link>
            ))}
          </nav>
        ))}

        <div className="footer-cta">
          <h4>Event snapshot</h4>
          <div className="footer-fact-list">
            {footerFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label}>
                  <Icon size={16} />
                  <span>{fact.label}</span>
                </div>
              );
            })}
          </div>

          <div className="footer-mini-gallery" aria-hidden="true">
            <img src={food1} alt="" />
            <img src={food2} alt="" />
            <ChefHat size={18} />
          </div>
        </div>
      </div>

      <div className="wop-container footer-bottom">
        <span>Copyright 2026 World on a Plate. All rights reserved.</span>
        <span>Seattle - Pioneer Square - September 26, 2026</span>
      </div>
    </footer>
  );
}
