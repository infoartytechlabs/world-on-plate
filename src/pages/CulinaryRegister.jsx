import { useState, useEffect } from "react";
import { ArrowRight, ChefHat, CheckCircle2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import culinaryBg from "../assets/culinary-template-bg.webp";

//import topSplash from "../assets/culinary-top.png";
//import bottomFood from "../assets/culinary-bottom.png";
//import rightFood from "../assets/culinary-right.png";

export default function CulinaryRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    institution: "",
    countryCode: "+1",
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState("");

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
  const isClosed = !!closedRegs["culinary"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  };

  const isPhoneValid = (phone) => {
    return /^\d{7,15}$/.test(phone || "");
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "title",
      "institution",
      "phone",
      "email",
    ];

    for (const field of requiredFields) {
      if (!form[field]?.trim()) {
        return "Please complete all required fields.";
      }
    }

    if (!isEmailValid(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!isPhoneValid(form.phone)) {
      return "Phone number must be exactly 10 digits.";
    }

    if (!/^[A-Za-z\s'-]{2,40}$/.test(form.firstName)) {
  return "First name should contain only letters.";
}

if (!/^[A-Za-z\s'-]{2,40}$/.test(form.lastName)) {
  return "Last name should contain only letters.";
}


    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setStatus(validationError);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec",
  {
    method: "POST",
body: JSON.stringify({
  formType: "culinary",
  firstName: form.firstName,
  lastName: form.lastName,
  professionalTitle: form.title,
  institution: form.institution,
  phone: `${form.countryCode} ${form.phone}`,
  email: form.email,
}),
  }
);

      const result = await response.json();

      if (result.success) {
        setSuccessPopup(
          "Application submitted successfully. Your culinary registration is now under review."
        );

        setTimeout(() => {
          navigate("/auth/pending");
        }, 2500);

        setForm({
          firstName: "",
          lastName: "",
          title: "",
          institution: "",
          countryCode: "+1",
          phone: "",
          email: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="wop-page inner-page">
      <section
  className="auth-section"
  style={{
    marginTop: "-130px",
    paddingTop: "130px",
    position: "relative",
  }}
>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url(${culinaryBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 90%",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          transform: "scale(1.05)",
        }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.08)" }} />
        <div className="auth-glow auth-glow-one" style={{ zIndex: 1 }} />
        <div className="auth-glow auth-glow-two" style={{ zIndex: 1 }} />

     

        <div className="wop-container auth-layout" style={{ position: "relative", zIndex: 2 }}>
          <div className="auth-copy">
            <div className="wop-eyebrow">
              Culinary Registration
            </div>

            <h1 className="wop-title">
              Join the <br /><span>culinary team.</span>
            </h1>

            <p className="wop-subtitle">
              Culinary professionals, chefs, culinary schools,
              restaurants, and institutions may apply to
              participate in preparing national dishes for
              World on a Plate.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 28px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Participants commit to preparing approximately 4,000 sample servings per dish.",
                "Participants may sign up for multiple national dishes.",
                "Participants are responsible for transport, serving equipment, and post-event cleanup.",
                "Recipes may be refined while maintaining authenticity.",
              ].map((point) => (
                <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ marginTop: 3, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#C8993A", display: "inline-block" }} />
                  <span style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.88, fontWeight: 900 }}>{point}</span>
                </li>
              ))}
            </ul>

            <div className="culinary-feature-cards">
            <div className="culinary-feature-card green">
                <div className="feature-emoji">👨‍🍳</div>
                <h3>National dish participation</h3>
                <p>Represent your culture and showcase authentic national flavors.</p>
            </div>

            <div className="culinary-feature-card gold">
                <div className="feature-emoji">🏆</div>
                <h3>Guinness World Record attempt</h3>
                <p>Be part of history as Seattle brings the world to one table.</p>
            </div>

            <div className="culinary-feature-card blue">
                <div className="feature-emoji">🌎</div>
                <h3>Seattle culinary collaboration</h3>
                <p>Collaborate with chefs, schools, and community partners.</p>
            </div>
            </div>

          </div>

          <div className="auth-card">
            {isClosed ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: "60px 32px", background: "rgba(255,255,255,0.85)", borderRadius: 24, backdropFilter: "blur(12px)" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Lock size={32} color="#791F1F" />
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#1A1A14", margin: 0 }}>
                  Sorry, Registrations Closed
                </h3>
                <p style={{ fontSize: 16, color: "#6B6B5A", maxWidth: 320, margin: 0, lineHeight: 1.6 }}>
                  Culinary Partner registration is currently closed. Please check back later or contact us for more information.
                </p>
              </div>
            ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
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

              <input
                name="title"
                placeholder="Professional Title *"
                value={form.title}
                onChange={handleChange}
              />

              <input
                name="institution"
                placeholder="Affiliate Culinary Institution / Business *"
                value={form.institution}
                onChange={handleChange}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <input
                  name="countryCode"
                  placeholder="+1"
                  value={form.countryCode}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d+]/g, "").slice(0, 5);
                    setForm(prev => ({ ...prev, countryCode: v }));
                  }}
                  style={{ width: 90, flexShrink: 0, textAlign: "center" }}
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 15);
                    setForm(prev => ({ ...prev, phone: v }));
                  }}
                  style={{ flex: 1 }}
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="wop-btn wop-btn-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
                <ArrowRight size={18} />
              </button>

              {status && (
                <p className="form-status">{status}</p>
              )}
            </form>
            )}
          </div>
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