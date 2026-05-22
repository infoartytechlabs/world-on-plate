import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  ChefHat,
  CookingPot,
  Flag,
  Flame,
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
import CursorTrail from "../components/CursorTrail";

import food1 from "../assets/food1.webp";
import food2 from "../assets/food2.webp";
import market from "../assets/market.webp";
import culinaryBg from "../assets/culinary-template-bg.webp";
import oliver from "../assets/oliver.webp";
import tony from "../assets/tony.webp";
import carrie from "../assets/carrie.webp";
import chefPlatingVideo from "../assets/chef-plating.mp4";
import worldfoodmarket from "../assets/world-food-market.mp4";
import foodFilmWorldMap from "../assets/food-film-world-map.png";
import worldArrival from "../assets/world.webp";
import seattleMap from "../../map.jpg";
import spaceNeedle from "../assets/spaceneedleicon.png";
import icon1 from "../assets/icons/icon_1.png";
import icon2 from "../assets/icons/icon_2.png";
import icon3 from "../assets/icons/icon_3.png";
import icon4 from "../assets/icons/icon_4.png";
import icon5 from "../assets/icons/icon_5.png";
import icon6 from "../assets/icons/icon_6.png";
import icon7 from "../assets/icons/icon_7.png";
import icon8 from "../assets/icons/icon_8.png";
import icon9 from "../assets/icons/icon_9.png";

const CURSOR_IMAGES = [food1, food2, market, culinaryBg];

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

const statAccents = ["#e87b32", "#1d8f5f", "#d8a441", "#b83b2f"];

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

const flavorBursts = [
  {
    icon: Globe2,
    word: "STAMP",
    kicker: "Passport",
    text: "Pick a country booth and turn one bite into a tiny travel story.",
    image: market,
    accent: "#e86635",
  },
  {
    icon: UtensilsCrossed,
    word: "TASTE",
    kicker: "Samples",
    text: "Small plates, big flavor, and a route that changes with every stop.",
    image: food1,
    accent: "#28795b",
  },
  {
    icon: Music4,
    word: "MOVE",
    kicker: "Culture",
    text: "Follow the sound of live music, marketplace stalls, and street energy.",
    image: food2,
    accent: "#b83b2f",
  },
];

const routeLayers = ["Pick a booth", "Trade a ticket", "Taste the story", "Find the next flavor"];

const ribbonWidgets = [
  { icon: Store, title: "Food Cart", text: "Marketplace energy keeps the route moving.", image: icon1 },
  { icon: Flag, title: "Flags Up", text: "Every dish carries a country story.", image: icon2 },
  { icon: Flame, title: "Fire Line", text: "A little heat, a lot of appetite.", image: icon3 },
  { icon: CookingPot, title: "Big Pot", text: "Shared food turns strangers into neighbors.", image: icon4 },
  { icon: UtensilsCrossed, title: "Plate Tent", text: "Country booths open like tiny festival tents.", image: icon5 },
  { icon: ChefHat, title: "Chef Hat", text: "Cooks bring home recipes into the street.", image: icon6 },
  { icon: Store, title: "Market Walk", text: "Each stop adds color to the tasting route.", image: icon7 },
  { icon: Globe2, title: "World Bite", text: "Small plates carry big cultural stories.", image: icon8 },
  { icon: Sparkles, title: "Street Spark", text: "Festival energy fills every block.", image: icon9 },
  { icon: UtensilsCrossed, title: "Sample Stop", text: "Guests follow the flavors booth by booth.", image: icon4 },
  { icon: Music4, title: "Culture Beat", text: "Food, music, and movement share the street.", image: icon7 },
];

function ScrollRibbon() {
  return (
    <section className="atelier-ribbon">
      <div className="atelier-ribbon-track">
        {[...ribbonWidgets, ...ribbonWidgets].map((item, index) => (
          <article className="atelier-ribbon-widget" key={`${item.title}-${index}`}>
            <figure className="atelier-ribbon-media">
              <img src={item.image} alt={item.title} />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}

function TastePlayground() {
  return (
    <section className="taste-playground">
      <div className="wop-container taste-playground-layout">
        <motion.div
          className="taste-playground-copy"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.36 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wop-eyebrow">Fun Route</div>
          <h2>Make the event feel snackable.</h2>
          <p>
            Jump between country booths, sample-size surprises, live sounds, and quick choices that make the route feel playful from the first bite.
          </p>
        </motion.div>

        <motion.div
          className="taste-video-card"
          initial={{ opacity: 0, rotate: 4, y: 40 }}
          whileInView={{ opacity: 1, rotate: -2, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <video src={worldfoodmarket} poster={market} autoPlay loop muted playsInline preload="metadata" />
          <div className="taste-video-label">
            <span>Festival pulse</span>
            <strong>8 blocks alive</strong>
          </div>
        </motion.div>
      </div>

      <div className="wop-container taste-burst-grid">
        {flavorBursts.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              className="taste-burst-card"
              key={item.word}
              style={{ "--taste-accent": item.accent }}
              initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
              viewport={{ once: true, amount: 0.42 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.image} alt="" aria-hidden="true" />
              <div className="taste-burst-content">
                <Icon size={22} />
                <small>{item.kicker}</small>
                <strong>{item.word}</strong>
                <p>{item.text}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="wop-container taste-route-builder">
        <motion.div
          className="taste-route-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wop-eyebrow">Your Journey</div>
          <h3>Build your route</h3>
          <p>No wrong order. Just follow what smells good.</p>
        </motion.div>
        <div className="taste-route-layers">
          {[
            { step: "01", label: "Pick a booth",       accent: "#E86635" },
            { step: "02", label: "Trade a ticket",     accent: "#28795B" },
            { step: "03", label: "Taste the story",    accent: "#D8A441" },
            { step: "04", label: "Find the next flavor", accent: "#B83B2F" },
          ].map(({ step, label, accent }, index) => (
            <motion.div
              className="taste-route-card"
              key={step}
              style={{ "--card-accent": accent }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.09, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="taste-route-card-num">{step}</span>
              <strong>{label}</strong>
            </motion.div>
          ))}
        </div>
      </div>
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
      <div className="food-film-map" aria-hidden="true">
        <div className="food-film-map-sticky">
          <img src={foodFilmWorldMap} alt="" />
        </div>
      </div>
      <div className="wop-container food-film-layout">
        <div className="food-film-sticky">
          <div className="food-film-copy">
            <div className="wop-eyebrow">Food Film</div>
            <h2>A moving route across one world table.</h2>
            <p>
              Follow the day from prep to plate to a city-wide memory. The cards drift in like passport stamps while the background keeps the global route in view.
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
          {filmScenes.slice(1).map((scene, index) => {
            const fromLeft = index % 2 === 0;

            return (
              <motion.article
                className="food-storyline-card"
                key={scene.title}
                initial={{
                  opacity: 0,
                  x: fromLeft ? -58 : 58,
                  y: 40,
                  rotate: fromLeft ? -5 : 5,
                  scale: 0.92,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.5, margin: "-10% 0px -16% 0px" }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              >
                <figure>
                  <img src={scene.image} alt="" aria-hidden="true" />
                  <b>{scene.number}</b>
                </figure>
                <div>
                  <small>{scene.kicker}</small>
                  <h3>{scene.title}</h3>
                  <p>{scene.text}</p>
                </div>
              </motion.article>
            );
          })}
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
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
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
      style={{ cursor: "none" }}
      onMouseMove={(e) => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      }}
    >
      <CursorTrail images={CURSOR_IMAGES} />
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
        <motion.img
          src={worldArrival}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.76,
            scale: heroBgScale,
            y: heroBgY,
            filter: "saturate(1.02) contrast(1.04)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(90deg, rgba(255,249,244,0.74) 0%, rgba(255,249,244,0.48) 34%, rgba(255,249,244,0.16) 68%, rgba(255,249,244,0.34) 100%), radial-gradient(circle at 46% 34%, rgba(255,249,244,0.78), rgba(255,249,244,0.18) 58%, rgba(255,249,244,0.42) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* ── Large solid amber blob at the bottom (Feastie's pink blob equivalent) ── */}
        <div style={{
          position: "absolute",
          bottom: -80, left: -120, right: -120,
          height: "50%",
          background: "linear-gradient(135deg, #F4B66D, #F07B45)",
          borderRadius: "52% 48% 0 0 / 30% 30% 0 0",
          zIndex: 1,
          opacity: 0.24,
        }} />

        {/* ── Decorative icons spread across left side ── */}
        {/* ── Food icons between Festival and countdown ── */}
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

            <div style={{ position: "relative", height: 0, overflow: "visible" }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.6 }}
                style={{ position: "absolute", top: 48, left: 0, right: 0, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
              >
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Mins" },
                  { value: countdown.seconds, label: "Secs" },
                ].map(({ value, label }, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      background: "rgba(255,255,255,0.82)",
                      border: "2px solid rgba(232,102,53,0.22)",
                      borderRadius: 14,
                      padding: "14px 22px",
                      minWidth: 82,
                      boxShadow: "0 4px 18px rgba(232,102,53,0.12)",
                      backdropFilter: "blur(6px)",
                    }}>
                      <span style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "clamp(36px, 4.2vw, 56px)",
                        lineHeight: 1,
                        color: "#D95C2E",
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                      }}>
                        {String(value).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#888",
                        marginTop: 5,
                      }}>{label}</span>
                    </div>
                    {i < 3 && (
                      <span style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "clamp(28px, 3.4vw, 44px)",
                        color: "#D95C2E",
                        lineHeight: 1,
                        opacity: 0.45,
                        marginTop: -6,
                      }}>:</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* ── Meet us text below countdown ── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            position: "absolute",
            top: "44%",
            left: "55%",
            transform: "translateX(-50%)",
            zIndex: 3,
            pointerEvents: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 1.1vw, 15px)",
            color: "#888",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 800,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          📍 Meet us at Occidental Ave
        </motion.p>


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
            background: "linear-gradient(135deg, #F4A056, #E86635)",
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
          }}>FREE<br />ENTRY</span>
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
            right: "-2%",
            bottom: "12%",
            top: "2%",
            zIndex: 2,
            height: "clamp(320px, 47vw, 3000px)",
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
          paddingTop: "0px",
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
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(32px, 5vw, 72px)",
                lineHeight: 1,
                color: "#E86635",
                letterSpacing: "-0.02em",
                fontStyle: "italic",
                transform: "rotate(-3deg)",
                textShadow: "3px 4px 0px rgba(184,59,47,0.35), 0 8px 24px rgba(232,102,53,0.18)",
              }}>Festival</span>

            </div>


            {/* CTAs */}
            <div style={{ position: "relative", marginTop: 60 }}>
              {/* Scattered icons near buttons */}
              <Sparkles size={22} color="#D8A441" strokeWidth={1.4} style={{ opacity: 0.7, position: "absolute", top: -28, left: -10, transform: "rotate(-15deg)" }} />
              <ChefHat size={26} color="#28795B" strokeWidth={1.4} style={{ opacity: 0.6, position: "absolute", top: -32, left: 180, transform: "rotate(10deg)" }} />
              <UtensilsCrossed size={20} color="#E86635" strokeWidth={1.4} style={{ opacity: 0.55, position: "absolute", top: -24, left: 340, transform: "rotate(-20deg)" }} />
              <Globe2 size={22} color="#D95C2E" strokeWidth={1.4} style={{ opacity: 0.5, position: "absolute", bottom: -22, left: 80, transform: "rotate(8deg)" }} />
              <Music4 size={20} color="#D8A441" strokeWidth={1.4} style={{ opacity: 0.55, position: "absolute", bottom: -20, left: 260, transform: "rotate(-12deg)" }} />
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-start" }}>
                <a href="/auth/register" className="wop-btn wop-btn-primary" style={{ fontSize: 18, padding: "17px 38px", borderRadius: 12 }}>
                  Culinary Register <ArrowRight size={18} />
                </a>
                <a href="/registration" style={{
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
        <div className="wop-container atelier-stat-shell">
          <div className="atelier-stat-head">
            <span>Event Scale</span>
            <h2>A record-setting table for Seattle.</h2>
            <p>Four numbers explain the ambition: every country represented, thousands of samples, and one city-scale celebration.</p>
          </div>

          <div className="atelier-stat-grid">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="atelier-stat"
                  key={item.label}
                  style={{ "--stat-accent": statAccents[index] }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="atelier-stat-icon">
                    <Icon size={22} />
                    <i aria-hidden="true" />
                  </span>
                  <strong>{item.number}</strong>
                  <span className="atelier-stat-label">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <TastePlayground />

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
