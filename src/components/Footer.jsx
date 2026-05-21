import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Share2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

const hiddenFooterRoutes = ["/admin", "/auth", "/culinary"];

export default function Footer() {
  const location = useLocation();

  if (hiddenFooterRoutes.some((route) => location.pathname.startsWith(route))) {
    return null;
  }

  return (
    <footer className="wop-footer">
      <div className="wop-container footer-haven-wrap">
        <motion.div
          className="footer-script"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          See ya!
        </motion.div>

        <div className="footer-columns">
          <section>
            <h3>World on a Plate</h3>
            <p>Pioneer Square</p>
            <p>Seattle, Washington</p>
            <a href="mailto:hello@worldonaplate.org">hello@worldonaplate.org</a>

            <div className="footer-socials" aria-label="Social links">
              <a href="#" aria-label="Instagram">
                <Share2 size={22} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Send size={22} />
              </a>
              <a href="mailto:hello@worldonaplate.org" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
          </section>

          <section>
            <h3>Festival</h3>
            <p>Saturday</p>
            <p>September 26, 2026</p>
            <p>Free admission</p>
            <br />
            <p>195 national dishes</p>
            <p>Live culture and music</p>
            <p>World record attempt</p>
          </section>

          <section>
            <h3>Join Us</h3>
            <p>Cook, sponsor, perform, volunteer, or visit hungry.</p>

            <div className="footer-action-row">
              <Link to="/registration">Register</Link>
              <Link to="/partnerships">Sponsor</Link>
            </div>
          </section>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright 2026 World on a Plate. All rights reserved.</span>
        {footerLinks.map((group) =>
          group.links.slice(0, 2).map((link) => (
            <Link to={link.path} key={`${group.title}-${link.label}`}>
              {link.label}
            </Link>
          ))
        )}
        <span>Designed for Seattle's global table</span>
      </div>
    </footer>
  );
}
