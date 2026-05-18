import { useState } from "react";
import { ArrowRight, ChefHat, CheckCircle2 } from "lucide-react";
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
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState("");

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
    return /^\d{10}$/.test(phone || "");
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
  phone: form.phone,
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
    backgroundImage: `url(${culinaryBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />

     

        <div className="wop-container auth-layout">
          <div className="auth-copy">
            <div className="wop-eyebrow">
              Culinary Registration
            </div>

            <h1 className="wop-title">
              Join the <span>culinary team.</span>
            </h1>

            <p className="wop-subtitle">
              Culinary professionals, chefs, culinary schools,
              restaurants, and institutions may apply to
              participate in preparing national dishes for
              World on a Plate.
            </p>


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

              <input
                name="phone"
                placeholder="Phone Number *"
                maxLength={10}
                value={form.phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setForm((prev) => ({
                    ...prev,
                    phone: onlyNumbers,
                  }));
                }}
              />

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