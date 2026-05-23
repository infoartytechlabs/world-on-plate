import { useState, useEffect } from "react";
import { ArrowRight, Building2, X, CheckCircle2, ExternalLink, Users, Trophy, Globe2, Radio, MapPin, Sparkles, Star, Leaf, Award, Newspaper, Globe, Heart } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";

const officialPartners = [
  {
    initials: "CS",
    name: "City of Seattle",
    description: "Providing civic infrastructure, permitting support, and public resources to bring this unprecedented event to Pioneer Square.",
    link: "https://seattle.gov",
    contributionType: "Government Support",
    contributionColor: "#2A3C8A",
    contributionBg: "#EEF1FB",
  },
  {
    initials: "KC",
    name: "King County",
    description: "Supporting regional outreach, public health coordination, and county-wide promotion of this landmark cultural celebration.",
    link: "https://kingcounty.gov",
    contributionType: "Government Support",
    contributionColor: "#2A6B3C",
    contributionBg: "#E8F4EC",
  },
  {
    initials: "KW",
    name: "Mayor Katie Wilson",
    description: "Championing World on a Plate as a flagship initiative celebrating Seattle's diversity, international community, and global spirit.",
    link: null,
    contributionType: "Government Support",
    contributionColor: "#8A2A2A",
    contributionBg: "#FBF0EE",
  },
  {
    initials: "WC",
    name: "Washington State Chefs Association",
    description: "Leading the culinary preparation of national dishes alongside subsidiary culinary schools and programs, essential to the Guinness World Record attempt.",
    link: "https://wsca.org",
    contributionType: "Culinary Partner",
    contributionColor: "#633806",
    contributionBg: "#FAEEDA",
  },
];


export default function Partnerships() {
  useEffect(() => { document.title = "Partnerships | World on a Plate"; }, []);
  const [activeForm, setActiveForm] = useState(null);
  const [partnerForm, setPartnerForm] = useState({});
  const [partnerStatus, setPartnerStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successPopup, setSuccessPopup] = useState("");

  const openForm = () => { setActiveForm("sponsor"); setPartnerForm({ countryCode: "+1" }); setPartnerStatus(""); };
  const closeForm = () => { setActiveForm(null); setPartnerForm({}); setPartnerStatus(""); };

  const handlePartnerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
  const isPhoneValid = (v) => /^\d{7,15}$/.test(v?.replace(/\D/g, "") || "");
  const isNameValid = (v) => /^[A-Za-z\s'-]{2,40}$/.test(v || "");

  const validatePartnerForm = () => {
    for (const f of ["firstName", "lastName", "phone", "email"]) {
      if (!partnerForm[f]?.trim()) return "Please fill all required contact fields.";
    }
    if (!isNameValid(partnerForm.firstName)) return "First name should contain only letters.";
    if (!isNameValid(partnerForm.lastName)) return "Last name should contain only letters.";
    if (!isPhoneValid(partnerForm.phone)) return "Please enter a valid phone number (7–15 digits).";
    if (!isEmailValid(partnerForm.email)) return "Please enter a valid email.";
    return "";
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    const err = validatePartnerForm();
    if (err) { setPartnerStatus(err); return; }
    setPartnerStatus("Submitting...");
    setSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          formType: "sponsor",
          ...partnerForm,
          phone: `${partnerForm.countryCode || "+1"} ${partnerForm.phone}`,
        }),
      });
      closeForm();
      setSuccessPopup("Sponsorship interest submitted. An organizer will contact you within 48 hours.");
      setTimeout(() => setSuccessPopup(""), 4200);
    } catch {
      setPartnerStatus("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const Sticker = ({ label, top, left, right, bottom, rot, bg, color, size = 11 }) => (
    <div className="partnership-sticker" style={{
      position: "absolute", top, left, right, bottom,
      "--rot": rot, transform: `rotate(${rot})`,
      padding: size > 11 ? "11px 20px" : "8px 14px",
      borderRadius: size > 11 ? 10 : 8,
      background: bg, color,
      fontSize: size, fontWeight: 800,
      fontFamily: "'DM Sans', sans-serif",
      textTransform: "uppercase", letterSpacing: "0.1em",
      whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
      zIndex: 20,
    }}>
      {label}
    </div>
  );

  return (
    <main className="wop-page inner-page" style={{ background: "#fff" }}>


      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10,
        backgroundImage: `
          linear-gradient(rgba(200,153,58,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,153,58,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        mixBlendMode: "multiply",
      }} />

      {/* ── Hero ── */}
      <section className="partner-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Sticker label="World Record"   top="15%" right="12%" rot="12deg"  bg="#C8993A"  color="#fff"    size={14} />
        <Sticker label="Official Partner" top="42%" right="15%" rot="-9deg" bg="#EEF1FB" color="#2A3C8A" size={14} />
        <Sticker label="Sep 26 · 2026" top="68%" right="11%" rot="14deg"  bg="#1A1A14"  color="#C8993A" size={14} />
        <div className="wop-container" style={{ width: "min(1500px, calc(100% - 40px))" }}>
          <div className="wop-eyebrow">Partnerships</div>
          <h1 className="wop-title" style={{ lineHeight: 1.15, fontSize: "clamp(38px, 6.4vw, 94px)" }}>
            Partnerships &amp; <span>Community Collaboration</span>
          </h1>
          <p className="wop-subtitle" style={{ maxWidth: 900 }}>
            World on a Plate is made possible through the collaboration of culinary leaders, cultural organizations, local businesses, sponsors, artists, and community supporters.
          </p>
          <button
            type="button"
            className="wop-btn wop-btn-primary"
            style={{ marginTop: 28 }}
            onClick={openForm}
          >
            Become a Sponsor <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Official Partner Organizations ── */}
      <section className="partner-orgs-section" style={{ position: "relative" }}>
        <div className="wop-container" style={{ width: "min(1500px, calc(100% - 40px))" }}>

          {/* Centered header */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="wop-eyebrow" style={{ marginBottom: 14 }}>Official Partner Organizations</div>
            <h2 className="wop-section-title" style={{ marginBottom: 16 }}>
              Proudly supported <span>by Seattle's leaders.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#6B6B5A", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
              World on a Plate is made possible through the commitment of civic institutions, government bodies, and culinary organizations.
            </p>
          </div>

          {/* Partner grid — visual on top, text below */}
          <div className="partner-org-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0 16px" }}>
            {[...officialPartners, {
              initials: "CI", name: "Supporting Culinary Institutions",
              description: "A network of culinary schools and programs affiliated with the Washington State Chefs Association — preparing national dishes for the Guinness World Record attempt.",
              link: null, contributionType: "Culinary Partner",
              contributionColor: "#633806", contributionBg: "#FAEEDA",
            }].map((p, i, arr) => (
              <div key={p.name} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "48px 24px",
                borderRight: i < arr.length - 1 ? "1px solid rgba(200,153,58,0.12)" : "none",
              }}>

                {/* Large logo circle */}
                <div style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: p.contributionBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 28,
                  boxShadow: `0 12px 40px ${p.contributionColor}20`,
                  position: "relative",
                }}>
                  <span style={{
                    fontSize: 26, fontWeight: 800, letterSpacing: "0.04em",
                    color: p.contributionColor, fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {p.initials}
                  </span>
                  {/* Contribution type dot */}
                  <span style={{
                    position: "absolute", bottom: 4, right: 4,
                    width: 22, height: 22, borderRadius: "50%",
                    background: p.contributionColor,
                    border: "2px solid #fff",
                  }} />
                </div>

                {/* Type badge */}
                <span style={{
                  padding: "4px 12px", borderRadius: 20,
                  background: p.contributionBg, color: p.contributionColor,
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                  marginBottom: 12,
                }}>
                  {p.contributionType}
                </span>

                {/* Name */}
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 20, color: "#1A1A14", margin: "0 0 12px", lineHeight: 1.25,
                }}>
                  {p.name}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, color: "#6B6B5A", lineHeight: 1.75, margin: 0 }}>
                  {p.description}
                </p>

                {/* Link */}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16,
                    fontSize: 13, fontWeight: 600, color: p.contributionColor, textDecoration: "none",
                  }}>
                    Visit website <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Sponsorship Intro ── */}
      <section style={{ padding: "100px 0", background: "#fff", position: "relative" }}>
        <div className="wop-container" style={{ width: "min(1500px, calc(100% - 40px))" }}>
          <div className="partner-intro-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="wop-eyebrow" style={{ marginBottom: 18 }}>Become a Sponsor</div>
              <h2 className="wop-section-title" style={{ marginBottom: 24 }}>
                Partner with <span>something bigger.</span>
              </h2>
              <p className="wop-section-text" style={{ marginBottom: 36, lineHeight: 1.85 }}>
                World on a Plate is Seattle's most ambitious civic celebration — a Guinness World Record attempt uniting 195 national dishes, 8,000+ attendees, and a global media audience in Pioneer Square. Sponsoring this event places your brand at the intersection of culture, community, and history.
              </p>
              <button type="button" className="wop-btn wop-btn-primary" onClick={openForm}>
                Become a Sponsor <ArrowRight size={18} />
              </button>
            </div>
            <div className="partner-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { number: "8,000+", label: "Expected Attendees", sub: "First-come tasting access" },
                { number: "195", label: "Nations Represented", sub: "Global cultural reach" },
                { number: "8", label: "City Blocks", sub: "Pioneer Square footprint" },
                { number: "1", label: "World Record Attempt", sub: "Unprecedented media exposure" },
              ].map((s) => (
                <div key={s.label} style={{
                  padding: "28px 24px", borderRadius: 16,
                  background: "#FAFAF4", border: "1px solid rgba(200,153,58,0.2)",
                }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, lineHeight: 1, color: "#C8993A", marginBottom: 8 }}>{s.number}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A14", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "#6B6B5A" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Sponsor ── */}
      <section style={{ padding: "100px 0", background: "#FAFAF7", position: "relative" }}>
        <div className="wop-container" style={{ width: "min(1500px, calc(100% - 40px))" }}>
          <div className="wop-eyebrow" style={{ marginBottom: 14 }}>Why Sponsor World on a Plate</div>
          <h2 className="wop-section-title" style={{ marginBottom: 16 }}>
            Your brand at the <span>heart of history.</span>
          </h2>
          <p className="wop-section-text" style={{ maxWidth: 680, marginBottom: 60 }}>
            This is more than an event. It's a civic moment, a world record attempt, and a gathering of Seattle's most diverse and engaged community — all in one day.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { num: "01", stat: "8,000+", unit: "Attendees", icon: Users, title: "Massive On-Site Reach", desc: "The first 8,000 visitors receive sample tickets — a captive, engaged audience moving through your branded presence across eight city blocks of Pioneer Square.", accent: "#C8993A" },
              { num: "02", stat: "195", unit: "Nations", icon: Trophy, title: "Guinness World Record Exposure", desc: "Your brand becomes part of an unprecedented global record attempt, generating regional, national, and international press and digital coverage.", accent: "#2A3C8A" },
              { num: "03", stat: "50K+", unit: "Online Reach", icon: Radio, title: "Digital & Media Visibility", desc: "Social media campaigns, press coverage, the event website, and email marketing amplify your sponsorship far beyond the event day itself.", accent: "#2A6B3C" },
              { num: "04", stat: "100%", unit: "Cultural", icon: Globe2, title: "Multicultural Alignment", desc: "Align your brand with inclusivity, diversity, and Seattle's vibrant international identity — connecting with communities from every corner of the world.", accent: "#8A2A2A" },
              { num: "05", stat: "1 Day", unit: "One City", icon: MapPin, title: "Deep Local Engagement", desc: "Pioneer Square comes alive with culture, food, and community. Your sponsorship connects you directly with Seattle residents, businesses, and civic leaders.", accent: "#533AB7" },
              { num: "06", stat: "∞", unit: "Impact", icon: Sparkles, title: "Legacy Brand Exposure", desc: "Logo placement on signage, stage backdrops, printed programs, merchandise, digital platforms, and commemorative materials creates lasting visibility.", accent: "#633806" },
            ].map((pt, i) => (
              <div key={pt.title} className="partner-why-row" style={{
                display: "grid",
                gridTemplateColumns: "80px 200px 1px 1fr",
                gap: "0 40px",
                alignItems: "center",
                padding: "40px 0",
                borderBottom: i < 5 ? "1px solid rgba(200,153,58,0.12)" : "none",
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#C8993A", letterSpacing: "0.1em", opacity: 0.6 }}>{pt.num}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${pt.accent}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <pt.icon size={22} color={pt.accent} />
                  </div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, lineHeight: 1, color: pt.accent }}>{pt.stat}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: pt.accent, opacity: 0.65 }}>{pt.unit}</div>
                </div>
                <div className="partner-why-divider" style={{ width: 1, height: 48, background: "rgba(200,153,58,0.2)", alignSelf: "center" }} />
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A14", margin: "0 0 8px", lineHeight: 1.3 }}>{pt.title}</h3>
                  <p style={{ fontSize: 15, color: "#6B6B5A", lineHeight: 1.8, margin: 0, maxWidth: 620 }}>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorship Tiers ── */}
      <section style={{ padding: "100px 0", background: "#FAFAF7", position: "relative" }}>
        <div className="wop-container" style={{ width: "min(1500px, calc(100% - 40px))" }}>
          <div className="wop-eyebrow" style={{ marginBottom: 16 }}>Sponsorship Tiers</div>
          <h2 className="wop-section-title" style={{ marginBottom: 56 }}>
            Choose your <span>level of impact.</span>
          </h2>

          <div className="partner-tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              {
                tier: "Platinum", badge: Trophy, highlight: true,
                benefits: ["Largest logo placement on all materials", "Homepage & digital visibility", "Stage mentions throughout the event", "VIP access for your full team", "Premium booth location", "Dedicated media coverage feature", "Custom brand activation opportunity"],
              },
              {
                tier: "Gold", badge: Star,
                benefits: ["Secondary logo placement", "Event day stage mentions", "Social media promotion", "Sponsor recognition in program", "4 VIP event passes", "Vendor booth space"],
              },
              {
                tier: "Silver", badge: Award,
                benefits: ["Website logo listing", "Printed materials inclusion", "Community sponsor recognition", "2 VIP event passes", "Event program listing"],
              },
              {
                tier: "Community", badge: Leaf,
                benefits: ["Supporter listing on website", "Community acknowledgment", "2 general admission passes", "Event program mention"],
              },
            ].map((t) => (
              <div key={t.tier} style={{
                borderRadius: 20, padding: "36px 28px",
                background: t.highlight ? "#1A1A14" : "#fff",
                border: t.highlight ? "none" : "1px solid rgba(200,153,58,0.2)",
                boxShadow: t.highlight ? "0 8px 32px rgba(26,26,20,0.12)" : "0 2px 16px rgba(0,0,0,0.04)",
                display: "flex", flexDirection: "column", gap: 16,
                position: "relative",
              }}>
                {t.highlight && (
                  <span style={{ position: "absolute", top: -12, left: 28, background: "#C8993A", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", padding: "4px 14px", borderRadius: 20 }}>
                    Premier
                  </span>
                )}
                <div style={{ width: 44, height: 44, borderRadius: 10, background: t.highlight ? "rgba(255,255,255,0.15)" : "rgba(200,153,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <t.badge size={22} color={t.highlight ? "#fff" : "#C8993A"} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.highlight ? "#C8993A" : "#C8993A" }}>
                  {t.tier} Sponsor
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {t.benefits.map(b => (
                    <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: t.highlight ? "rgba(255,255,255,0.8)" : "#6B6B5A", lineHeight: 1.55 }}>
                      <span style={{ color: "#C8993A", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Become a Sponsor — same grid alignment */}
            <div style={{
              borderRadius: 20, padding: "36px 28px",
              border: "1px solid rgba(200,153,58,0.2)",
              background: "#fff",
              display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 20,
            }}>
              <p style={{ fontSize: 16, color: "#6B6B5A", lineHeight: 1.75, margin: 0 }}>
                Custom packages are available. An organizer will reach out within 48 hours of your enquiry.
              </p>
              <button type="button" className="wop-btn wop-btn-primary" onClick={openForm}>
                Become a Sponsor <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Benefits bar */}
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 1, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,153,58,0.15)" }}>
            {[
              { icon: Users, label: "Foot Traffic", value: "8,000+" },
              { icon: Radio, label: "Digital Reach", value: "50K+" },
              { icon: Newspaper, label: "Press Coverage", value: "Regional & National" },
              { icon: Globe, label: "Audience", value: "195 Nations" },
              { icon: Heart, label: "Cultural Reach", value: "Multicultural" },
            ].map((b, i) => (
              <div key={b.label} style={{
                padding: "28px 20px", background: i % 2 === 0 ? "#fff" : "#FAFAF4",
                textAlign: "center",
                borderRight: i < 4 ? "1px solid rgba(200,153,58,0.1)" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}><b.icon size={24} color="#C8993A" /></div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C8993A", marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#1A1A14", lineHeight: 1.3 }}>{b.value}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Sponsor Modal ── */}
      {activeForm && (
        <div className="partner-modal-backdrop">
          <div className="partner-modal">
            <button type="button" className="partner-modal-close" onClick={closeForm}>
              <X size={20} />
            </button>

            <div className="partner-modal-head">
              <div className="partner-icon"><Building2 /></div>
              <div>
                <span className="partner-modal-kicker">World on a Plate</span>
                <h2>Sponsorship Interest Form</h2>
                <p>Kindly complete the fields below. An event organizer will be in contact within 48 hours.</p>
              </div>
            </div>

            <form className="partner-modal-form" onSubmit={handlePartnerSubmit} noValidate>
              <div className="form-row">
                <input name="firstName" placeholder="First Name *" value={partnerForm.firstName || ""} onChange={handlePartnerChange} />
                <input name="lastName" placeholder="Last Name *" value={partnerForm.lastName || ""} onChange={handlePartnerChange} />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <input
                  name="countryCode"
                  placeholder="+1"
                  value={partnerForm.countryCode || "+1"}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d+]/g, "").slice(0, 5);
                    setPartnerForm(prev => ({ ...prev, countryCode: v }));
                  }}
                  style={{ width: 80, flexShrink: 0, textAlign: "center" }}
                />
                <input
                  name="phone"
                  placeholder="Phone *"
                  value={partnerForm.phone || ""}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 15);
                    setPartnerForm(prev => ({ ...prev, phone: v }));
                  }}
                  style={{ flex: 1 }}
                />
              </div>

              <input name="email" type="email" placeholder="Email *" value={partnerForm.email || ""} onChange={handlePartnerChange} />
              <input name="businessName" placeholder="Business / Organization Name *" value={partnerForm.businessName || ""} onChange={handlePartnerChange} />
              <input name="title" placeholder="Your Title *" value={partnerForm.title || ""} onChange={handlePartnerChange} />

              <button type="submit" className="wop-btn wop-btn-primary" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Interest"} {!submitting && <ArrowRight size={18} />}
              </button>

              {partnerStatus && <p className="form-status">{partnerStatus}</p>}
            </form>
          </div>
        </div>
      )}

      {successPopup && (
        <div className="success-toast">
          <CheckCircle2 size={20} />
          <span>{successPopup}</span>
        </div>
      )}
    </main>
  );
}
