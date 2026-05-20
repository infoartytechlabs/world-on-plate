import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChefHat,
  CheckCircle2,
  HandHeart,
  Mail,
  MapPin,
  MessageSquare,
  Music4,
  Send,
  Store,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";

const contactCards = [
  {
    icon: Users,
    title: "General Event Questions",
    text: "For guest questions about timing, location, admission, sample tickets, and the visitor experience.",
    to: "/faq",
    action: "Read FAQ",
  },
  {
    icon: Building2,
    title: "Sponsors",
    text: "For corporate, private, monetary, or in-kind sponsorship interest.",
    to: "/partnerships",
    action: "Sponsor Form",
  },
  {
    icon: Store,
    title: "Vendors",
    text: "For World Marketplace, food truck, product, and booth participation interest.",
    to: "/partnerships",
    action: "Vendor Form",
  },
  {
    icon: Music4,
    title: "Musicians",
    text: "For community artists interested in voluntary cultural performances.",
    to: "/partnerships",
    action: "Musician Form",
  },
  {
    icon: ChefHat,
    title: "Culinary Partners",
    text: "For culinary schools, programs, chefs, restaurants, and institutions preparing national dishes.",
    to: "/auth/register",
    action: "Culinary Register",
  },
  {
    icon: HandHeart,
    title: "Volunteers",
    text: "For country booth, merchandise, ticket, visitor experience, and event support roles.",
    to: "/registration",
    action: "Volunteer Form",
  },
];

const topics = [
  "General Event Question",
  "Sponsorship",
  "Vendor Participation",
  "Musician Participation",
  "Culinary Partnership",
  "Volunteer Support",
  "Media Inquiry",
  "Other",
];

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
const isPhoneValid = (phone) => !phone || /^\d{7,15}$/.test(phone.replace(/\D/g, ""));

export default function Contact() {
  useEffect(() => { document.title = "Contact | World on a Plate"; }, []);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "General Event Question",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [successPopup, setSuccessPopup] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhone = (event) => {
    const phone = event.target.value.replace(/\D/g, "").slice(0, 15);
    setForm((prev) => ({ ...prev, phone }));
  };

  const validate = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "Please enter your first and last name.";
    }

    if (!isEmailValid(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!isPhoneValid(form.phone)) {
      return "Please enter a valid phone number.";
    }

    if (!form.topic.trim()) {
      return "Please choose a topic.";
    }

    if (form.message.trim().length < 12) {
      return "Please add a brief message.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = validate();
    if (error) {
      setStatus(error);
      return;
    }

    setStatus("Submitting...");
    setSubmitting(true);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ formType: "contact", ...form }),
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "General Event Question",
        message: "",
      });
      setStatus("");
      setSuccessPopup("Message sent. An event organizer will be in contact shortly.");
      setTimeout(() => setSuccessPopup(""), 4200);
    } catch {
      setStatus("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="wop-page inner-page contact-page">
      <section className="contact-hero">
        <div className="wop-container contact-hero-grid">
          <motion.div
            className="contact-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="wop-eyebrow">Contact</div>

            <h1 className="wop-title">
              Reach the right <span>event team.</span>
            </h1>

            <p className="wop-subtitle">
              Send a message, choose the right participation path, or find the
              most useful page for your World on a Plate question.
            </p>
          </motion.div>

          <motion.div
            className="contact-event-card"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <div className="contact-event-icon">
              <CalendarDays size={28} />
            </div>

            <span>World on a Plate</span>
            <strong>September 26, 2026</strong>

            <div className="contact-event-row">
              <MapPin size={18} />
              <p>Occidental Ave, Pioneer Square, Seattle</p>
            </div>

            <div className="contact-event-row">
              <Mail size={18} />
              <p>Use the form below for general inquiries.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-path-section">
        <div className="wop-container contact-path-grid">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                className="contact-path-card"
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
              >
                <div className="contact-path-icon">
                  <Icon size={24} />
                </div>

                <h2>{card.title}</h2>
                <p>{card.text}</p>

                <Link to={card.to} className="contact-path-link">
                  {card.action}
                  <ArrowRight size={16} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="contact-form-section">
        <div className="wop-container contact-form-layout">
          <div className="contact-form-copy">
            <div className="contact-mini-icon">
              <MessageSquare size={26} />
            </div>

            <h2>Send a message.</h2>

            <p>
              Choose the closest topic so the message can be routed to the right
              organizer. For sponsor, vendor, musician, culinary partner, or
              volunteer applications, the linked forms above are the fastest path.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <input
                name="firstName"
                placeholder="First Name *"
                value={form.firstName}
                onChange={handleChange}
              />

              <input
                name="lastName"
                placeholder="Last Name *"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                name="email"
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handlePhone}
              />
            </div>

            <select name="topic" value={form.topic} onChange={handleChange}>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="How can we help? *"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" className="wop-btn wop-btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Send Message"}
              <Send size={18} />
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </section>

      {successPopup && (
        <div className="success-toast">
          <CheckCircle2 size={20} />
          <span>{successPopup}</span>
        </div>
      )}
    </main>
  );
}
