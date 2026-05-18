import { ArrowRight, Globe2, Instagram, Linkedin, Mail } from "lucide-react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="wop-footer">
      <div className="wop-container footer-grid">
        <div className="footer-brand">
          <div className="footer-mark">
            <Globe2 size={28} />
          </div>

          <h2>
            The World <br />
            on a <span>Plate</span>
          </h2>

          <p>
            Seattle’s global culinary celebration and Guinness World Record
            attempt — bringing 195 nations to one table.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <a href="/event-details">Event Details</a>
          <a href="/countries">Countries</a>
          <a href="/partnerships">Partnerships</a>
          <a href="/organizers">Organizers</a>
        </div>

        <div className="footer-links">
          <h4>Join</h4>
          <a href="/register">Volunteer</a>
          <a href="/auth/login">Culinary Login</a>
          <a href="/partnerships">Become a Sponsor</a>
          <a href="/partnerships">Vendor / Musician</a>
        </div>

        <div className="footer-cta">
          <h4>Be part of the table.</h4>
          <p>Help build one of Seattle’s most unforgettable cultural events.</p>

          <a href="/register">
            Volunteer Now <ArrowRight size={17} />
          </a>

          <div className="footer-socials">
            <span><Instagram size={18} /></span>
            <span><Linkedin size={18} /></span>
            <span><Mail size={18} /></span>
          </div>
        </div>
      </div>

      <div className="wop-container footer-bottom">
        <span>© 2026 World on a Plate. All rights reserved.</span>
        <span>Seattle · Pioneer Square · September 26, 2026</span>
      </div>
    </footer>
  );
}