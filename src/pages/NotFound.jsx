import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe2, ArrowRight } from "lucide-react";

export default function NotFound() {
  useEffect(() => { document.title = "Page Not Found | World on a Plate"; }, []);
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "130px 24px 80px",
        background:
          "radial-gradient(circle at 20% 20%, rgba(200,153,58,0.12), transparent 40%), #FAFAF7",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#F8F0E4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <Globe2 size={32} color="#C8993A" />
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#C8993A",
            marginBottom: 12,
          }}
        >
          404 — Page Not Found
        </div>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#1A1A14",
            margin: "0 0 18px",
          }}
        >
          Lost at the table.
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#6B6B5A",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          This page doesn't exist — but there's a whole world of food waiting
          back home.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 26px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #E87B32, #B83B2F)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(232,123,50,0.28)",
            }}
          >
            Back to Home <ArrowRight size={17} />
          </button>

          <button
            onClick={() => navigate("/event-details")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 26px",
              borderRadius: 10,
              border: "1px solid rgba(200,153,58,0.3)",
              background: "#fff",
              color: "#1A1A14",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Event Details
          </button>
        </div>
      </div>
    </main>
  );
}
