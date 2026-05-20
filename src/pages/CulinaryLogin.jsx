import { useState, useEffect } from "react";
import { ChefHat, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CULINARY_SESSION_KEY = "wop_culinary_session";

export default function CulinaryLogin() {
  const navigate = useNavigate();
  useEffect(() => { document.title = "Partner Login | World on a Plate"; }, []);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email) { setError("Please enter your institution email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Please enter your password."); return; }

    // Store minimal session and navigate to dashboard
    sessionStorage.setItem(CULINARY_SESSION_KEY, JSON.stringify({ email, ts: Date.now() }));
    navigate("/culinary/dashboard");
  };

  return (
    <main className="wop-page inner-page">
      <section className="culinary-login-section">
        <div className="login-glow login-glow-one" />
        <div className="login-glow login-glow-two" />

        <div className="wop-container culinary-login-layout">

          <div className="culinary-copy">
            <div className="wop-eyebrow">
              Culinary Partner Portal
            </div>

            <h1 className="wop-title">
              Prepare the world. <span>One dish at a time.</span>
            </h1>

            <p className="wop-subtitle">
              Culinary schools, chefs, and institutions participating in
              World on a Plate may log in to claim national dishes and
              coordinate preparation for the Guinness World Record attempt.
            </p>
          </div>

          <div className="culinary-login-card">

            <div className="culinary-login-icon">
              <ChefHat />
            </div>

            <h2>Partner Login</h2>

            <p>
              Approved culinary participants may access the event portal below.
            </p>

            <form className="culinary-form" onSubmit={handleSubmit} noValidate>

              <input
                type="email"
                name="email"
                placeholder="Institution Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              {error && (
                <p style={{ color: "#8A2A2A", fontSize: 14, margin: "0 0 4px" }}>
                  {error}
                </p>
              )}

              <button type="submit" className="wop-btn wop-btn-primary">
                Login <ArrowRight size={18} />
              </button>

            </form>

            <div className="culinary-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            <button
              type="button"
              className="culinary-register-btn"
              onClick={() => navigate("/auth/register")}
            >
              Register Institution
            </button>

          </div>

        </div>
      </section>
    </main>
  );
}
