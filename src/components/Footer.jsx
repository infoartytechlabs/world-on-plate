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
  { icon: UtensilsCrossed, label: "195 national dishes" },
  { icon: Music4, label: "Live performances" },
  { icon: Ticket, label: "Free admission" },
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
          <span>Free Admission</span>
          <span>195 National Dishes</span>
          <span>Pioneer Square</span>
          <span>One Shared Table</span>
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
            Final invitation
          </div>

          <h2>
            Save your place at the world's table.
          </h2>

          <p>
            A bright, walkable celebration of food, music, culture, and community across Seattle's Pioneer Square.
          </p>

          <div className="footer-hero-actions">
            <Link to="/registration">
              Register Now <ArrowRight size={18} />
            </Link>
            <Link to="/countries">
              Explore Countries
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
          <div className="footer-photo footer-photo-main">
            <img src={market} alt="World on a Plate marketplace" />
          </div>
          <div className="footer-photo footer-photo-one">
            <img src={food1} alt="International dish" />
          </div>
          <div className="footer-photo footer-photo-two">
            <img src={food2} alt="Global cuisine" />
          </div>
          <div className="footer-poster-card">
            <span>September 26, 2026</span>
            <strong>Free Entry</strong>
            <small>Pioneer Square, Seattle</small>
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
            A civic food celebration built around memory, movement, and the joy of sharing a meal in public.
          </p>

          <div className="footer-socials" aria-label="Social links">
            <a href="#" aria-label="Instagram">
              <Share2 size={18} />
            </a>
            <a href="#" aria-label="LinkedIn">
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
          <h4>Keep Close</h4>
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
            <ChefHat size={18} />
            <span>Bring appetite, curiosity, and a few friends.</span>
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
