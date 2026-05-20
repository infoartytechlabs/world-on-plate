import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Ticket,
  Globe2,
  Sparkles,
  UtensilsCrossed,
  Music4,
  Globe,
  Users,
  Map,
  Trophy,
  HandHeart,
  Building2,
  ChefHat,
} from "lucide-react";

import "../index.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";

import food1 from "../assets/food1.webp";
import food2 from "../assets/food2.webp";
import market from "../assets/market.webp";

/* ---------------- DATA ---------------- */

const flowCards = [
  {
    icon: <UtensilsCrossed size={26} />,
    title: "195 National Dishes",
    text: "A culinary journey through every UN member and associate nation in one immersive experience.",
  },
  {
    icon: <Music4 size={26} />,
    title: "Global Performances",
    text: "Live international music, movement, dance, storytelling, and cultural celebration throughout the day.",
  },
  {
    icon: <Globe size={26} />,
    title: "World Record Attempt",
    text: "An unprecedented Guinness World Record celebration hosted in the heart of Seattle.",
  },
];

const stats = [
  { icon: <Globe2 />, number: "195", label: "National Dishes" },
  { icon: <Users />, number: "8,000", label: "Visitors Sampling" },
  { icon: <Map />, number: "8", label: "City Blocks" },
  { icon: <Trophy />, number: "1", label: "World Record Attempt" },
];

const ribbonItems = [
  "195 Nations",
  "Global Music",
  "Seattle",
  "World Record Attempt",
  "Free Admission",
  "Food • Culture • Community",
];

const countries = [
  { name: "India", dish: "Biryani", image: food1 },
  { name: "Mexico", dish: "Mole", image: food2 },
  { name: "Morocco", dish: "Couscous", image: market },
];

const actions = [
  {
    icon: <HandHeart size={24} />,
    title: "Volunteer",
    text: "Support guests, booths, tickets, merchandise, and cultural experiences.",
    type: "volunteer",
  },
  {
    icon: <ChefHat size={24} />,
    title: "Culinary Partners",
    text: "Help prepare national dishes and participate in the record attempt.",
    link: "/auth/login",
  },
  {
    icon: <Building2 size={24} />,
    title: "Sponsors & Vendors",
    text: "Partner with one of Seattle’s most ambitious community celebrations.",
    link: "/partnerships",
  },
];

export default function Home() {
  const [showVolunteer, setShowVolunteer] = useState(false);

  /* Volunteer form state */
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: "", lastName: "", countryCode: "+1", phone: "", email: "", role: "", notes: "",
  });
  const [volunteerStatus, setVolunteerStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Closed-registration state (synced with admin panel via localStorage) */
  const [closedRegs, setClosedRegs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wop_reg_closed") || "{}"); }
    catch { return {}; }
  });
  useEffect(() => {
    const handler = () => {
      try { setClosedRegs(JSON.parse(localStorage.getItem("wop_reg_closed") || "{}")); }
      catch { setClosedRegs({}); }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  const volunteersClosed = !!closedRegs["volunteers"];

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVolunteerPhone = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 15);
    setVolunteerForm((prev) => ({ ...prev, phone: v }));
  };

  const handleVolunteerCountryCode = (e) => {
    const v = e.target.value.replace(/[^\d+]/g, "").slice(0, 5);
    setVolunteerForm((prev) => ({ ...prev, countryCode: v }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, role } = volunteerForm;
    if (!firstName?.trim() || !lastName?.trim() || !phone?.trim() || !email?.trim() || !role?.trim()) {
      setVolunteerStatus("Please fill all required fields."); return;
    }
    if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ""))) {
      setVolunteerStatus("Please enter a valid phone number (7–15 digits)."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVolunteerStatus("Please enter a valid email address."); return;
    }

    setVolunteerStatus("Submitting...");
    setSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ formType: "volunteer", ...volunteerForm, phone: `${volunteerForm.countryCode} ${volunteerForm.phone}` }),
      });
      setVolunteerForm({ firstName: "", lastName: "", countryCode: "+1", phone: "", email: "", role: "", notes: "" });
      setVolunteerStatus("Thank you! Your volunteer interest was submitted.");
      setTimeout(() => setVolunteerStatus(""), 4200);
    } catch {
      setVolunteerStatus("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="wop-page home-page"
      onMouseMove={(e) => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      }}
    >
      <div className="wop-noise" />

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="wop-container hero-grid">
          <div className="hero-copy">
            <motion.div className="wop-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              Seattle · September 26, 2026
            </motion.div>

            <motion.h1 className="wop-title hero-title" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}>
              The World <br />
              on a <span>Plate</span>
            </motion.h1>

            <motion.p className="wop-subtitle" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              Seattle’s global culinary celebration and Guinness World Record attempt — 195 national dishes, one city, one unforgettable table.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <a href="/registration" className="wop-btn wop-btn-primary">
                Register Now <ArrowRight size={18} />
              </a>

              <a href="/event-details" className="wop-btn wop-btn-secondary">
                Explore Event
              </a>
            </motion.div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
            <div className="hero-globe">
              <Globe2 size={120} />
              <span>195</span>
              <p>Nations</p>
            </div>

            <img className="hero-img hero-img-one" src={food1} alt="International dish" />
            <img className="hero-img hero-img-two" src={food2} alt="Food preparation" />
            <img className="hero-img hero-img-three" src={market} alt="Festival marketplace" />

            <div className="hero-floating-card">
              <strong>Free Admission</strong>
              <span>First 8,000 visitors receive sample tickets</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= EVENT STRIP ================= */}
      <section className="event-strip">
        <div className="wop-container strip-grid">
          <div>
            <CalendarDays />
            <span>Date</span>
            <strong>Sep 26, 2026</strong>
          </div>

          <div>
            <MapPin />
            <span>Location</span>
            <strong>Occidental Ave, Seattle</strong>
          </div>

          <div>
            <Ticket />
            <span>Admission</span>
            <strong>Free & Open to All</strong>
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="vision-section">
        <div className="vision-glow vision-glow-one" />
        <div className="vision-glow vision-glow-two" />

        <div className="wop-container vision-layout">
          <div className="vision-left">
            <div className="wop-eyebrow">The Vision</div>

            <h2 className="vision-title">
              One day. <br />
              <span>194 nations.</span> <br />
              One table for all.
            </h2>
          </div>

          <div className="vision-right">
            <p>
              On September 26, 2026, the national dishes of every UN member and associate country will be prepared, displayed, and shared along eight blocks of Occidental Avenue in Pioneer Square.
            </p>

            <p>
              It will be a celebration of Seattle’s vibrant and dynamic roots, fellowship through food, and a Guinness World Record attempt unlike anything the city has seen.
            </p>

            <p>
              The first 8,000 visitors to this free event will be able to sample authentic national dishes, shop, dine, and experience performances from Seattle’s international arts community.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WORLD FLOW ================= */}
      <section className="wop-section worldflow-section">
        <div className="worldflow-bg-line" />

        <div className="wop-container">
          <div className="wop-section-head worldflow-head">
            <div className="wop-eyebrow">One Day. 195 Nations. One Table.</div>

            <h2 className="wop-section-title">
              The city becomes a <span>global table</span>
            </h2>

            <p className="wop-section-text">
              World on a Plate transforms Pioneer Square into an immersive culinary corridor where cultures, traditions, music, flavors, and stories converge into one unforgettable civic celebration.
            </p>
          </div>

          <div className="worldflow-grid">
            {flowCards.map((card) => (
              <div key={card.title} className="worldflow-card">
                <div className="worldflow-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <div className="worldflow-glow" />
              </div>
            ))}
          </div>

          <div className="worldflow-banner">
            <Sparkles size={18} />
            <span>
              The first 8,000 visitors receive tasting access to authentic international dishes prepared by culinary institutions and chefs.
            </span>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="eventstats-section">
        <div className="wop-container eventstats-grid">
          {stats.map((item) => (
            <div className="eventstat-card" key={item.label}>
              <div className="eventstat-icon">{item.icon}</div>
              <strong>{item.number}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RIBBON ================= */}
      <section className="wop-ribbon">
        <div className="wop-ribbon-track">
          {[...ribbonItems, ...ribbonItems, ...ribbonItems].map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </section>

      {/* ================= WORLD MAP ================= */}
      <section className="world-map-section">
        <div className="map-glow map-glow-one" />
        <div className="map-glow map-glow-two" />

        <div className="wop-container world-map-layout">
          <div className="world-map-copy">
            <div className="wop-eyebrow">Connected Through Culture</div>

            <h2 className="wop-section-title">
              One city. <span>Every culture.</span>
            </h2>

            <p className="wop-section-text">
              World on a Plate transforms Seattle into a living map of global heritage — where every booth, dish, performance, and conversation represents a nation’s story.
            </p>

            <div className="map-mini-stats">
              <div className="map-mini-card">
                <strong>195</strong>
                <span>Countries</span>
              </div>

              <div className="map-mini-card">
                <strong>8</strong>
                <span>City Blocks</span>
              </div>

              <div className="map-mini-card">
                <strong>1</strong>
                <span>World Record</span>
              </div>
            </div>
          </div>

          <div className="world-map-visual">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="World Map"
              className="world-map-img"
            />

            <div className="map-pin pin-1"><span>India</span></div>
            <div className="map-pin pin-2"><span>Mexico</span></div>
            <div className="map-pin pin-3"><span>Morocco</span></div>
            <div className="map-pin pin-4"><span>Japan</span></div>

            <div className="map-center-orb">
              <strong>Seattle</strong>
              <span>Pioneer Square</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COUNTRY SHOWCASE ================= */}
      <section className="wop-section country-showcase">
        <div className="country-orb country-orb-one" />
        <div className="country-orb country-orb-two" />

        <div className="wop-container country-layout">
          <div className="country-copy">
            <div className="wop-eyebrow">Explore the World</div>

            <h2 className="wop-section-title">
              Every country has a story. <span>Every dish has a memory.</span>
            </h2>

            <p className="wop-section-text">
              Visitors will discover national dishes from 195 countries, each representing heritage, home, celebration, and community.
            </p>

            <a href="/countries" className="wop-btn wop-btn-primary country-btn">
              Explore 195 Nations <ArrowRight size={18} />
            </a>
          </div>

          <div className="country-stack">
            {countries.map((item, index) => (
              <div className={`country-card country-card-${index + 1}`} key={item.name}>
                <img src={item.image} alt={item.name} />

                <div className="country-card-info">
                  <span>
                    <MapPin size={14} />
                    {item.name}
                  </span>
                  <strong>{item.dish}</strong>
                </div>
              </div>
            ))}

            <div className="country-center-badge">
              <strong>195</strong>
              <span>National Dishes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VOLUNTEER SECTION ================= */}
      <section id="volunteer" className="volunteer-section">
        <div className="wop-container volunteer-card">
          <div className="volunteer-copy">
            <div className="wop-eyebrow">Volunteer With Us</div>

            <h2 className="wop-section-title">
              Help bring the world <span>to the table.</span>
            </h2>

            <p className="wop-section-text">
              Volunteers will support country booths, visitor experience, tickets, merchandise, information booths, and event operations.
            </p>
          </div>

          {volunteersClosed ? (
            <div className="volunteer-form" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", padding: "48px 24px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 28 }}>🔒</span>
              </div>
              <h3 style={{ fontFamily: "’DM Serif Display’, serif", fontSize: 26, color: "#1A1A14", margin: 0 }}>Sorry, Registrations Closed</h3>
              <p style={{ fontSize: 16, color: "#6B6B5A", maxWidth: 300, margin: 0, lineHeight: 1.6 }}>
                Volunteer registration is currently closed. Please check back later or contact us for more information.
              </p>
            </div>
          ) : (
            <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
              <div className="form-row">
                <input name="firstName" placeholder="First Name *" value={volunteerForm.firstName} onChange={handleVolunteerChange} />
                <input name="lastName" placeholder="Last Name *" value={volunteerForm.lastName} onChange={handleVolunteerChange} />
              </div>

              <div className="form-row">
                <div style={{ display: "flex", gap: 8 }}>
                    <input name="countryCode" placeholder="+1" value={volunteerForm.countryCode} onChange={handleVolunteerCountryCode} style={{ width: 72, flexShrink: 0, textAlign: "center" }} />
                    <input name="phone" placeholder="Phone *" value={volunteerForm.phone} onChange={handleVolunteerPhone} style={{ flex: 1 }} />
                  </div>
                <input name="email" type="email" placeholder="Email *" value={volunteerForm.email} onChange={handleVolunteerChange} />
              </div>

              <select name="role" value={volunteerForm.role} onChange={handleVolunteerChange}>
                <option value="">Which role are you interested in? *</option>
                <option value="Country Booth Volunteer">Country Booth Volunteer</option>
                <option value="Merchandise Booth Volunteer">Merchandise Booth Volunteer</option>
                <option value="Ticket / Visitor Experience">Ticket / Visitor Experience</option>
                <option value="Information Booth">Information Booth</option>
                <option value="Children’s Area">Children’s Area</option>
              </select>

              <textarea name="notes" placeholder="Country booth preference or notes" value={volunteerForm.notes} onChange={handleVolunteerChange} />

              <button type="submit" className="wop-btn wop-btn-primary" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Interest"}
              </button>

              {volunteerStatus && <p className="form-status">{volunteerStatus}</p>}
            </form>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="wop-section cta-section">
        <div className="cta-glow cta-glow-one" />
        <div className="cta-glow cta-glow-two" />

        <div className="wop-container">
          <div className="cta-hero-card">
            <div className="wop-eyebrow">Join the Celebration</div>

            <h2>
              This is bigger than food. <span>It’s Seattle at one table.</span>
            </h2>

            <p>
              Whether you volunteer, sponsor, perform, cook, or simply show up, World on a Plate is built by people who believe culture is best shared together.
            </p>

            <div className="cta-action-grid">
              {actions.map((item) =>
                item.type === "volunteer" ? (
                  <button
                    type="button"
                    className="cta-action-card"
                    key={item.title}
                    onClick={() => setShowVolunteer(true)}
                  >
                    <div className="cta-action-icon">{item.icon}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                    <ArrowRight className="cta-arrow" size={20} />
                  </button>
                ) : (
                  <a href={item.link} className="cta-action-card" key={item.title}>
                    <div className="cta-action-icon">{item.icon}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                    <ArrowRight className="cta-arrow" size={20} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VOLUNTEER POPUP MODAL ================= */}
      {showVolunteer && (
        <div className="volunteer-modal-backdrop">
          <div className="volunteer-modal">
            <button className="volunteer-modal-close" onClick={() => setShowVolunteer(false)}>
              ×
            </button>

            <div className="wop-eyebrow">Volunteer</div>

            <h2>Support the celebration.</h2>

            <p>
              Thank you for your support! Volunteer time commitment is approximately five hours during the event on September 26 and a 30-to-60-minute online training shortly beforehand. All volunteers must be 18 or older.
            </p>

            <div className="volunteer-role-list">
              <div>
                <strong>Country Booth Volunteers</strong>
                <span>Decorate booths, collect tickets, serve samples, engage guests, distribute materials, maintain sanitation, and clean up booth décor.</span>
              </div>

              <div>
                <strong>Merchandise Booth Volunteers</strong>
                <span>Help transport, arrange, sell, collect payments, pack, and return merchandise.</span>
              </div>

              <div>
                <strong>Ticket / Visitor Experience Volunteers</strong>
                <span>Set up signage, distribute tickets, explain ticket redemption, support donations, answer questions, and staff key event areas.</span>
              </div>
            </div>

            {volunteersClosed ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 24 }}>🔒</span>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1A1A14", margin: 0 }}>Sorry, Registrations Closed</h3>
                <p style={{ fontSize: 15, color: "#6B6B5A", maxWidth: 280, margin: 0, lineHeight: 1.6 }}>
                  Volunteer registration is currently closed. Please check back later.
                </p>
              </div>
            ) : (
              <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
                <div className="form-row">
                  <input name="firstName" placeholder="First Name *" value={volunteerForm.firstName} onChange={handleVolunteerChange} />
                  <input name="lastName" placeholder="Last Name *" value={volunteerForm.lastName} onChange={handleVolunteerChange} />
                </div>

                <div className="form-row">
                  <div style={{ display: "flex", gap: 8 }}>
                    <input name="countryCode" placeholder="+1" value={volunteerForm.countryCode} onChange={handleVolunteerCountryCode} style={{ width: 72, flexShrink: 0, textAlign: "center" }} />
                    <input name="phone" placeholder="Phone *" value={volunteerForm.phone} onChange={handleVolunteerPhone} style={{ flex: 1 }} />
                  </div>
                  <input name="email" type="email" placeholder="Email *" value={volunteerForm.email} onChange={handleVolunteerChange} />
                </div>

                <select name="role" value={volunteerForm.role} onChange={handleVolunteerChange}>
                  <option value="">Which role(s) are you interested in? *</option>
                  <option value="Country Booth Volunteer">Country Booth Volunteer</option>
                  <option value="Merchandise Booth Volunteer">Merchandise Booth Volunteer</option>
                  <option value="Ticket / Visitor Experience Volunteer">Ticket / Visitor Experience Volunteer</option>
                </select>

                <textarea
                  name="notes"
                  placeholder="If interested in booth staffing, note country preferences or other notes."
                  value={volunteerForm.notes}
                  onChange={handleVolunteerChange}
                />

                <button type="submit" className="wop-btn wop-btn-primary" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Volunteer Interest"}
                </button>

                {volunteerStatus && <p className="form-status">{volunteerStatus}</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}