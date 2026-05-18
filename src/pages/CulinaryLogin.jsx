import { ChefHat, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CulinaryLogin() {
  const navigate = useNavigate();

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

            <form className="culinary-form">

              <input type="email" placeholder="Institution Email" />

              <input type="password" placeholder="Password" />

                  <button
      className="wop-btn wop-btn-primary"
      onClick={() => navigate("/culinary/dashboard")}
    >
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