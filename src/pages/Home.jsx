import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  ChefHat,
  Globe2,
  HandHeart,
  Map,
  MapPin,
  Music4,
  Sparkles,
  Store,
  Ticket,
  Trophy,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import "../index.css";

import food1 from "../assets/food1.webp";
import food2 from "../assets/food2.webp";
import market from "../assets/market.webp";
import culinaryBg from "../assets/culinary-template-bg.webp";
import oliver from "../assets/oliver.webp";
import tony from "../assets/tony.webp";
import carrie from "../assets/carrie.webp";
import chefPlatingVideo from "../assets/chef-plating.mp4";
import worldfoodmarket from "../assets/world-food-market.mp4";
import seattleMap from "../../map.jpg";
import spaceNeedle from "../assets/spaceneedle.png";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";

const eventFacts = [
  { icon: CalendarDays, label: "Date", value: "Sep 26, 2026" },
  { icon: MapPin, label: "Place", value: "Occidental Ave" },
  { icon: Ticket, label: "Admission", value: "Free entry" },
];

const stats = [
  { icon: Globe2, number: "195", label: "national dishes" },
  { icon: Users, number: "8,000", label: "sample tickets" },
  { icon: Map, number: "8", label: "city blocks" },
  { icon: Trophy, number: "1", label: "record attempt" },
];

const journey = [
  {
    icon: ChefHat,
    kicker: "Cook",
    title: "Chefs prepare a world map you can taste.",
    text: "Culinary partners take on national dishes from every UN member and associate country.",
    image: culinaryBg,
  },
  {
    icon: UtensilsCrossed,
    kicker: "Share",
    title: "Visitors choose their route through 195 flavors.",
    text: "The first 8,000 guests receive sample access and move through a corridor of country booths.",
    image: food1,
  },
  {
    icon: Music4,
    kicker: "Celebrate",
    title: "Music, vendors, and culture fill the avenue.",
    text: "Performances, marketplace stalls, food trucks, and conversations turn Pioneer Square into a global gathering.",
    image: market,
  },
];

const dishCards = [
  { country: "India", dish: "Biryani", image: food1 },
  { country: "Mexico", dish: "Mole", image: food2 },
  { country: "Morocco", dish: "Couscous", image: market },
  { country: "Seattle", dish: "One shared table", image: culinaryBg },
];

const actions = [
  {
    icon: HandHeart,
    title: "Volunteer",
    text: "Support booths, tickets, guest experience, and event operations.",
    type: "volunteer",
  },
  {
    icon: ChefHat,
    title: "Culinary Partners",
    text: "Prepare national dishes and help make the record attempt possible.",
    link: "/auth/login",
  },
  {
    icon: Building2,
    title: "Sponsors and Vendors",
    text: "Partner with one of Seattle's most ambitious community celebrations.",
    link: "/partnerships",
  },
];

const leaders = [
  { name: "Oliver Bangera", role: "Event Director", image: oliver },
  { name: "Tony Parker", role: "Culinary Director", image: tony },
  { name: "Carrie Antal", role: "Deputy Director", image: carrie },
];

const moments = [
  {
    number: "01",
    kicker: "Arrival",
    title: "The avenue opens like a passport.",
    text: "Guests enter the corridor and receive their sample path into the world's national dishes.",
    image: market,
    accent: "#e87b32",
  },
  {
    number: "02",
    kicker: "Taste",
    title: "Every booth becomes a country story.",
    text: "Tickets turn into moments: a dish, a memory, a conversation, a culture brought close.",
    image: food1,
    accent: "#1d8f5f",
  },
  {
    number: "03",
    kicker: "Gather",
    title: "Music and marketplace energy pull people forward.",
    text: "Performances, vendors, and food trucks create movement between the tasting stations.",
    image: food2,
    accent: "#d8a441",
  },
  {
    number: "04",
    kicker: "Record",
    title: "Seattle becomes the table everyone remembers.",
    text: "The day culminates in a Guinness World Record attempt built from participation, care, and scale.",
    image: culinaryBg,
    accent: "#b83b2f",
  },
];

const filmScenes = [
  {
    number: "01",
    kicker: "Prep",
    title: "The day starts in kitchens.",
    text: "Ingredients, hands, heat, and timing come together before the avenue opens.",
    image: culinaryBg,
    video: chefPlatingVideo,
  },
  {
    number: "02",
    kicker: "Plate",
    title: "Dishes become invitations.",
    text: "Each sample is a small doorway into a national story.",
    image: food1,
  },
  {
    number: "03",
    kicker: "Move",
    title: "The crowd follows the flavor.",
    text: "Visitors drift between booths, performances, and marketplace stalls.",
    image: market,
  },
  {
    number: "04",
    kicker: "Remember",
    title: "The record attempt becomes a memory.",
    text: "One city, one table, and 195 dishes turn into a moment people can carry home.",
    image: food2,
  },
];

function ScrollRibbon() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  return (
    <section className="atelier-ribbon" ref={ref}>
      <motion.div className="atelier-ribbon-track" style={{ x }}>
        {[
          "195 National Dishes",
          "Seattle",
          "Global Music",
          "Free Admission",
          "World Record Attempt",
          "Pioneer Square",
          "Food Culture Community",
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </motion.div>
    </section>
  );
}

function FoodFilmSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });

  const frameOneOpacity = useTransform(progress, [0, 0.2, 0.3], [1, 1, 0]);
  const frameTwoOpacity = useTransform(progress, [0.2, 0.34, 0.48], [0, 1, 0]);
  const frameThreeOpacity = useTransform(progress, [0.42, 0.58, 0.72], [0, 1, 0]);
  const frameFourOpacity = useTransform(progress, [0.66, 0.82, 1], [0, 1, 1]);
  const frameOpacities = [frameOneOpacity, frameTwoOpacity, frameThreeOpacity, frameFourOpacity];
  const filmScale = useTransform(progress, [0, 1], [1.08, 1]);
  const filmY = useTransform(progress, [0, 1], [24, -24]);

  return (
    <section className="food-film-section" ref={ref}>
      <div className="wop-container food-film-layout">
        <div className="food-film-sticky">
          <div className="food-film-copy">
            <div className="wop-eyebrow">Food Film</div>
            <h2>Let the story move before the words arrive.</h2>
            <p>
              This behaves like a quiet food video now, using layered animated frames. When you have a real event or plating video, this section is ready for it.
            </p>
          </div>

          <div className="food-film-frame">
            {filmScenes.map((scene, index) =>
              scene.video ? (
                <motion.video
                  key={scene.title}
                  src={scene.video}
                  poster={scene.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{ opacity: frameOpacities[index], scale: filmScale, y: filmY }}
                />
              ) : (
                <motion.img
                  key={scene.title}
                  src={scene.image}
                  alt={scene.title || ""}
                  aria-hidden="true"
                  style={{ opacity: frameOpacities[index], scale: filmScale, y: filmY }}
                />
              )
            )}

            <div className="food-film-vignette" />
            <div className="food-film-play" aria-hidden="true">
              <span />
            </div>
            <div className="food-film-caption">
              <strong>World on a Plate</strong>
              <span>Seattle - 195 dishes - one route</span>
            </div>
          </div>

          <div className="food-film-progress" aria-hidden="true">
            <motion.span style={{ scaleX: progressScale }} />
          </div>
        </div>

        <div className="food-storyline">
          {filmScenes.map((scene, index) => (
            <motion.article
              className="food-storyline-card"
              key={scene.title}
              initial={{ opacity: 0, y: 46 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{scene.number}</span>
              <small>{scene.kicker}</small>
              <h3>{scene.title}</h3>
              <p>{scene.text}</p>
              {index < filmScenes.length - 1 && <i aria-hidden="true" />}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceModule() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progressScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  return (
    <section className="atelier-module-section" ref={ref}>
      <div className="wop-container atelier-module-layout">
        <div className="atelier-module-sticky">
          <div className="wop-eyebrow">Scroll Story</div>
          <h2>Four moments, one continuous celebration.</h2>
          <p>
            The page now moves like a guided event route: each scroll reveals a new beat, while the story stays anchored.
          </p>
          <div className="atelier-module-progress" aria-hidden="true">
            <motion.span style={{ scaleX: progressScale }} />
          </div>
        </div>

        <div className="atelier-module-cards">
          {moments.map((item, index) => (
            <motion.article
              className="atelier-module-card"
              key={item.title}
              style={{
                "--module-accent": item.accent,
                "--stick-offset": `${index * 18}px`,
              }}
              initial={{ opacity: 0, y: 80, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="atelier-module-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="atelier-module-copy">
                <span>{item.kicker}</span>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = "World on a Plate | Seattle's Global Food Festival 2026"; }, []);
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgScale = useSpring(useTransform(heroProgress, [0, 1], [1.04, 1.18]), {
    stiffness: 80,
    damping: 24,
  });
  const heroBgY = useSpring(useTransform(heroProgress, [0, 1], ["0%", "10%"]), {
    stiffness: 80,
    damping: 24,
  });
  const heroCopyY = useSpring(useTransform(heroProgress, [0, 1], [0, -72]), {
    stiffness: 90,
    damping: 28,
  });
  const heroPlateY = useSpring(useTransform(heroProgress, [0, 1], [0, 94]), {
    stiffness: 90,
    damping: 28,
  });

  const EVENT_DATE = new Date("2026-09-26T09:00:00");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE - Date.now();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setCountdown({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const [showVolunteer, setShowVolunteer] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+1",
    phone: "",
    email: "",
    role: "",
    notes: "",
  });
  const [volunteerStatus, setVolunteerStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [closedRegs, setClosedRegs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wop_reg_closed") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handler = () => {
      try {
        setClosedRegs(JSON.parse(localStorage.getItem("wop_reg_closed") || "{}"));
      } catch {
        setClosedRegs({});
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const volunteersClosed = !!closedRegs.volunteers;

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVolunteerPhone = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setVolunteerForm((prev) => ({ ...prev, phone: value }));
  };

  const handleVolunteerCountryCode = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "").slice(0, 5);
    setVolunteerForm((prev) => ({ ...prev, countryCode: value }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, role } = volunteerForm;

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !role.trim()) {
      setVolunteerStatus("Please fill all required fields.");
      return;
    }
    if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ""))) {
      setVolunteerStatus("Please enter a valid phone number with 7 to 15 digits.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVolunteerStatus("Please enter a valid email address.");
      return;
    }

    setVolunteerStatus("Submitting...");
    setSubmitting(true);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          formType: "volunteer",
          ...volunteerForm,
          phone: `${volunteerForm.countryCode} ${volunteerForm.phone}`,
        }),
      });
      setVolunteerForm({
        firstName: "",
        lastName: "",
        countryCode: "+1",
        phone: "",
        email: "",
        role: "",
        notes: "",
      });
      setVolunteerStatus("Thank you! Your volunteer interest was submitted.");
      setTimeout(() => setVolunteerStatus(""), 4200);
    } catch {
      setVolunteerStatus("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const VolunteerForm = ({ compact = false }) =>
    volunteersClosed ? (
      <div className="volunteer-closed">
        <div className="volunteer-closed-icon">!</div>
        <h3>Registrations Closed</h3>
        <p>Volunteer registration is currently closed. Please check back later.</p>
      </div>
    ) : (
      <form className={`volunteer-form ${compact ? "volunteer-form-compact" : ""}`} onSubmit={handleVolunteerSubmit}>
        <div className="form-row">
          <input name="firstName" placeholder="First Name *" value={volunteerForm.firstName} onChange={handleVolunteerChange} />
          <input name="lastName" placeholder="Last Name *" value={volunteerForm.lastName} onChange={handleVolunteerChange} />
        </div>

        <div className="form-row">
          <div className="phone-row">
            <input name="countryCode" placeholder="+1" value={volunteerForm.countryCode} onChange={handleVolunteerCountryCode} />
            <input name="phone" placeholder="Phone *" value={volunteerForm.phone} onChange={handleVolunteerPhone} />
          </div>
          <input name="email" type="email" placeholder="Email *" value={volunteerForm.email} onChange={handleVolunteerChange} />
        </div>

        <select name="role" value={volunteerForm.role} onChange={handleVolunteerChange}>
          <option value="">Which role are you interested in? *</option>
          <option value="Country Booth Volunteer">Country Booth Volunteer</option>
          <option value="Merchandise Booth Volunteer">Merchandise Booth Volunteer</option>
          <option value="Ticket / Visitor Experience">Ticket / Visitor Experience</option>
          <option value="Information Booth">Information Booth</option>
          <option value="Children's Area">Children's Area</option>
        </select>

        <textarea name="notes" placeholder="Country booth preference or notes" value={volunteerForm.notes} onChange={handleVolunteerChange} />

        <button type="submit" className="wop-btn wop-btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Interest"}
        </button>

        {volunteerStatus && <p className="form-status">{volunteerStatus}</p>}
      </form>
    );

  return (
    <main
      className="wop-page home-page home-atelier"
      onMouseMove={(e) => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      }}
    >
      <section
        ref={heroRef}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "110vh",
          background: "#FFF9F4",
          display: "flex",
          flexDirection: "column",
          paddingTop: "clamp(80px, 10vw, 110px)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Large solid amber blob at the bottom (Feastie's pink blob equivalent) ── */}
        <div style={{
          position: "absolute",
          bottom: -80, left: -120, right: -120,
          height: "50%",
          background: "linear-gradient(135deg, #F4B66D, #F07B45)",
          borderRadius: "52% 48% 0 0 / 30% 30% 0 0",
          zIndex: 0,
          opacity: 0.38,
        }} />

        {/* Scattered short dash decorations (like feastie) */}
        {[
          { top: "19%", left: "7%",   r: 10  },
          { top: "16%", left: "11%",  r: -25 },
          { top: "23%", left: "5.5%", r: 40  },
          { top: "36%", left: "48%",  r: 15  },
          { top: "39%", left: "50%",  r: -10 },
          { top: "28%", right: "3%",  r: 20  },
          { top: "32%", right: "1%",  r: -30 },
          { bottom: "38%", right: "3%", r: 5 },
        ].map((d, i) => (
          <div key={i} aria-hidden="true" style={{
            position: "absolute", zIndex: 1,
            width: 18, height: 3,
            background: "#E86635",
            borderRadius: 3,
            opacity: 0.55,
            transform: `rotate(${d.r}deg)`,
            top: d.top, bottom: d.bottom,
            left: d.left, right: d.right,
          }} />
        ))}

        {/* ── FULL-WIDTH TITLE spanning top ── */}
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 56px) 0", textAlign: "center" }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(64px, 11.5vw, 158px)",
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "#1A1A14",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            World on <span style={{ color: "#D95C2E" }}>a Plate</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginTop: 16, paddingLeft: 650 }}
          >
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(22px, 3vw, 42px)",
              color: "#D95C2E",
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}>
              September 26, 2026
            </span>
          </motion.div>
        </div>

        {/* ── FREE ENTRY starburst sticker ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 15 }}
          transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "26%",
            right: "5%",
            zIndex: 3,
            width: 160,
            height: 160,
            clipPath: "polygon(50% 0%, 59.8% 13.3%, 75% 6.7%, 76.9% 23.1%, 93.3% 25%, 86.7% 40.2%, 100% 50%, 86.7% 59.8%, 93.3% 75%, 76.9% 76.9%, 75% 93.3%, 59.8% 86.7%, 50% 100%, 40.2% 86.7%, 25% 93.3%, 23.1% 76.9%, 6.7% 75%, 13.3% 59.8%, 0% 50%, 13.3% 40.2%, 6.7% 25%, 23.1% 23.1%, 25% 6.7%, 40.2% 13.3%)",
            background: "linear-gradient(135deg, #E86635, #28795B)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "default",
            boxShadow: "0 8px 32px rgba(232,123,50,0.45)",
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}>✦ admission ✦</span>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}>FREE<br/>ENTRY</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
            marginTop: 2,
          }}>Sep 26, 2026</span>
        </motion.div>

        {/* ── Space Needle image on the right ── */}
        <motion.img
          src={spaceNeedle}
          alt="Space Needle"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            right: "4%",
            bottom: "12%",
            top: "10%",
            zIndex: 2,
            height: "clamp(220px, 28vw, 1520px)",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.18))",
            pointerEvents: "none",
          }}
        />

        {/* ── Center images ── */}
        <div style={{
          position: "absolute",
          top: "90%",
          left: "0",
          right: "0",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(16px, 2.5vw, 32px)",
          zIndex: 2,
          pointerEvents: "none",
        }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            gap: "clamp(16px, 2.5vw, 32px)",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <div style={{
            width: "clamp(380px, 45vw, 640px)",
            height: "clamp(500px, 62vw, 860px)",
            borderRadius: "999px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
            transform: "rotate(8deg)",
          }}>
            <img src={food1} alt="International dish" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{
            width: "clamp(380px, 45vw, 640px)",
            height: "clamp(560px, 70vw, 960px)",
            borderRadius: "999px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
            transform: "translateY(-60px) rotate(-8deg)",
          }}>
            <img src={food2} alt="Global cuisine" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </motion.div>
        </div>

        {/* ── Content below title ── */}
        <div style={{
          position: "relative", zIndex: 2,
          paddingTop: "clamp(16px,3vw,32px)",
          paddingRight: "clamp(16px,4vw,56px)",
          paddingBottom: "clamp(60px,8vw,100px)",
          paddingLeft: "clamp(200px, 28vw, 480px)",
        }}>

          {/* ── LEFT: Stacked word blocks + content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {/* Stacked colored word blocks — like feastie's SIP / SNACK / FESTIVAL */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, marginBottom: 22, width: "100%" }}>

              {/* Row 1: "Culinary" block + "&" */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  display: "inline-block",
                  padding: "6px 22px",
                  background: "#FFF2EA",
                  border: "2.5px solid #B83B2F",
                  borderRadius: 10,
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(18px, 2.4vw, 32px)",
                  lineHeight: 1.15,
                  color: "#B83B2F",
                  fontStyle: "italic",
                  transform: "rotate(-6deg)",
                  display: "inline-block",
                }}>Culinary</span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(20px, 2.8vw, 36px)",
                  color: "#1A1A14",
                  lineHeight: 1,
                }}>&amp;</span>
              </div>

              {/* Row 2: "Cultural" block */}
              <span style={{
                display: "inline-block",
                padding: "6px 22px",
                background: "#F7F4E7",
                border: "2.5px solid #28795B",
                borderRadius: 10,
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(18px, 2.4vw, 32px)",
                lineHeight: 1.15,
                color: "#28795B",
                fontStyle: "italic",
                marginLeft: 40,
              }}>Cultural</span>

              {/* Row 3: FESTIVAL */}
              <span style={{
                display: "inline-block",
                padding: "8px 26px",
                background: "linear-gradient(135deg, #E86635, #B83B2F)",
                borderRadius: 12,
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(18px, 2.4vw, 32px)",
                lineHeight: 1.15,
                color: "#fff",
                letterSpacing: "0.06em",
                fontStyle: "italic",
                transform: "rotate(-3deg)",
                boxShadow: "0 6px 24px rgba(232,123,50,0.4), 0 3px 0 rgba(138,42,42,0.5)",
              }}>FESTIVAL</span>

            </div>


            {/* Countdown */}
            

            {/* CTAs */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 80, justifyContent: "center" }}>
              <a href="/registration" className="wop-btn wop-btn-primary" style={{ fontSize: 18, padding: "17px 38px", borderRadius: 12 }}>
                Culinary Register <ArrowRight size={18} />
              </a>
              <a href="/partnerships" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "17px 34px", borderRadius: 12,
                border: "2px solid rgba(26,26,20,0.16)",
                background: "rgba(255,255,255,0.85)",
                color: "#1A1A14", fontSize: 18, fontWeight: 700,
                textDecoration: "none",
              }}>
                Become a Sponsor
              </a>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom facts bar ── */}
        <div className="atelier-facts" style={{ position: "relative", zIndex: 2 }}>
          {eventFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label}>
                <Icon size={25} />
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <ScrollRibbon />

      <section className="atelier-stat-section">
        <div className="wop-container atelier-stat-grid">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                className="atelier-stat"
                key={item.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ delay: index * 0.06 }}
              >
                <Icon size={24} />
                <strong>{item.number}</strong>
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <FoodFilmSection />

      <ExperienceModule />

      <section className="atelier-story-section">
        <div className="wop-container atelier-story-head">
          <div className="wop-eyebrow">The Experience</div>
          <h2>Not a food fair. A city-scale table.</h2>
          <p>
            The home page now tells the event like a journey: preparation, arrival, movement, celebration, and the record attempt.
          </p>
        </div>

        <div className="wop-container atelier-journey">
          {journey.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="atelier-journey-card"
                key={item.title}
                initial={{ opacity: 0, y: 60, clipPath: "inset(12% 0% 12% 0% round 18px)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 18px)" }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={item.image} alt={item.title} />
                <div className="atelier-journey-copy">
                  <span><Icon size={17} /> {item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="atelier-dishes-section">
        <div className="wop-container atelier-dishes-layout">
          <div className="atelier-dishes-copy">
            <div className="wop-eyebrow">Taste Map</div>
            <h2>Every dish carries a memory of home.</h2>
            <p>
              A compact preview of the scale: hundreds of recipes, thousands of sample portions, and one long corridor of discovery.
            </p>
            <a href="/countries" className="wop-btn wop-btn-primary">
              Explore Countries <ArrowRight size={18} />
            </a>
          </div>

          <div className="atelier-dish-grid">
            {dishCards.map((item, index) => (
              <motion.article
                className="atelier-country-card"
                key={item.country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05 }}
              >
                <img src={item.image} alt={`${item.country} ${item.dish}`} />
                <div>
                  <span>{item.country}</span>
                  <strong>{item.dish}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="atelier-route-section">
        <div className="wop-container atelier-route-layout">
          <div className="atelier-route-map">
            <img src={seattleMap} alt="Pioneer Square event route" />
            <div className="atelier-route-glass">
              <MapPin size={20} />
              <div>
                <span>Pioneer Square</span>
                <strong>Eight blocks of food, music, and community.</strong>
              </div>
            </div>
          </div>

          <div className="atelier-route-copy">
            <div className="wop-eyebrow">The Route</div>
            <h2>Move through the world without leaving Seattle.</h2>
            <p>
              Guests can sample national dishes, shop the Global Marketplace, hear live performances, and watch the record attempt unfold in one walkable corridor.
            </p>

            <div className="atelier-route-list">
              <div><UtensilsCrossed size={18} /> Sample tickets</div>
              <div><Music4 size={18} /> Live performances</div>
              <div><Store size={18} /> Marketplace stalls</div>
              <div><Award size={18} /> Record attempt</div>
            </div>
          </div>
        </div>
      </section>

      <section className="atelier-people-section">
        <div className="wop-container atelier-people-layout">
          <div>
            <div className="wop-eyebrow">Organizers</div>
            <h2>The team behind the table.</h2>
          </div>

          <div className="atelier-people-grid">
            {leaders.map((leader) => (
              <article className="atelier-person" key={leader.name}>
                <img src={leader.image} alt={leader.name} />
                <div>
                  <strong>{leader.name}</strong>
                  <span>{leader.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="volunteer" className="volunteer-section atelier-volunteer-section">
        <div className="wop-container volunteer-card">
          <div className="volunteer-copy">
            <div className="wop-eyebrow">Volunteer With Us</div>
            <h2 className="wop-section-title">
              Help bring the world <span>to the table.</span>
            </h2>
            <p className="wop-section-text">
              Volunteers support country booths, visitor experience, tickets, merchandise, information booths, and event operations.
            </p>
          </div>
          <VolunteerForm />
        </div>
      </section>

      <section className="atelier-cta-section">
        <div className="wop-container atelier-cta">
          <div>
            <div className="wop-eyebrow">Join the Celebration</div>
            <h2>This only happens if the city builds it together.</h2>
            <p>
              Volunteer, cook, sponsor, vend, perform, or simply show up hungry for something bigger than lunch.
            </p>
          </div>

          <div className="atelier-action-grid">
            {actions.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon size={22} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                  <ArrowRight size={18} />
                </>
              );

              return item.type === "volunteer" ? (
                <button type="button" key={item.title} onClick={() => setShowVolunteer(true)}>
                  {content}
                </button>
              ) : (
                <a href={item.link} key={item.title}>
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {showVolunteer && (
        <div className="volunteer-modal-backdrop">
          <div className="volunteer-modal">
            <button className="volunteer-modal-close" onClick={() => setShowVolunteer(false)} aria-label="Close volunteer modal">
              x
            </button>
            <div className="wop-eyebrow">Volunteer</div>
            <h2>Support the celebration.</h2>
            <p>
              Volunteer time commitment is approximately five hours during the event on September 26 and a 30-to-60-minute online training shortly beforehand. All volunteers must be 18 or older.
            </p>

            <div className="volunteer-role-list">
              <div>
                <strong>Country Booth Volunteers</strong>
                <span>Decorate booths, collect tickets, serve samples, engage guests, distribute materials, maintain sanitation, and clean up booth decor.</span>
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

            <VolunteerForm compact />
          </div>
        </div>
      )}
    </main>
  );
}
