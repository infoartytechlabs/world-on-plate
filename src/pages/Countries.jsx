import { Search, Globe2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import food1 from "../assets/food1.webp";
import food2 from "../assets/food2.webp";
import market from "../assets/market.webp";

const countries = [
  {
    country: "India",
    dish: "Biryani",
    image: food1,
    status: "Available",
  },
  {
    country: "Mexico",
    dish: "Mole",
    image: food2,
    status: "Assigned",
  },
  {
    country: "Morocco",
    dish: "Couscous",
    image: market,
    status: "Available",
  },
  {
    country: "Japan",
    dish: "Sushi",
    image: food1,
    status: "Available",
  },
  {
    country: "Italy",
    dish: "Risotto",
    image: food2,
    status: "Assigned",
  },
  {
    country: "Thailand",
    dish: "Pad Thai",
    image: market,
    status: "Available",
  },
];

export default function Countries() {
  useEffect(() => { document.title = "Countries & Dishes | World on a Plate"; }, []);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDish, setSelectedDish] = useState(null);

  const filteredCountries = countries.filter((item) => {
    const matchesSearch = `${item.country} ${item.dish}`
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesFilter = filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="wop-page inner-page">
      <section className="countries-hero">
        <div className="countries-glow countries-glow-one" />
        <div className="countries-glow countries-glow-two" />

        <div className="wop-container countries-hero-content">
          <div className="wop-eyebrow">195 Nations</div>

          <h1 className="wop-title">
            Explore the world <span>through food.</span>
          </h1>

          <p className="wop-subtitle">
            Every participating country brings its own culinary identity,
            cultural history, and national dish to Seattle’s global table.
          </p>

          <div className="countries-search">
            <Search size={18} />
            <input
              placeholder="Search country or dish..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="country-filter-row">
            {["All", "Available", "Assigned"].map((item) => (
              <button
                key={item}
                className={`country-filter-btn ${
                  filter === item ? "active" : ""
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="countries-grid-section">
        <div className="wop-container countries-grid">
          {filteredCountries.length === 0 ? (
            <div style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "64px 24px",
              color: "#6B6B5A",
            }}>
              <Globe2 size={40} style={{ opacity: 0.25, marginBottom: 14 }} />
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1A1A14", margin: "0 0 8px" }}>
                No results found
              </p>
              <p style={{ fontSize: 16, margin: 0 }}>
                Try a different search term or filter.
              </p>
            </div>
          ) : filteredCountries.map((item) => (
            <article className="country-experience-card" key={item.country}>
              <div className="country-image-wrap">
                <img src={item.image} alt={item.country} />

                <div className={`country-status ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
              </div>

              <div className="country-experience-info">
                <div className="country-mini-icon">
                  <Globe2 size={18} />
                </div>

                <h2>{item.country}</h2>
                <p>{item.dish}</p>

                <button type="button" onClick={() => setSelectedDish(item)}>
                  Explore Dish <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedDish && (
        <div className="dish-modal-backdrop">
          <div className="dish-modal">
            <button
              type="button"
              className="dish-modal-close"
              onClick={() => setSelectedDish(null)}
              aria-label="Close dish details"
            >
              ×
            </button>

            <img src={selectedDish.image} alt={selectedDish.country} />

            <div className="dish-modal-content">
              <span
                className={`country-status ${selectedDish.status.toLowerCase()}`}
              >
                {selectedDish.status}
              </span>

              <h2>{selectedDish.country}</h2>
              <h3>{selectedDish.dish}</h3>

              <p>
                This dish represents the culinary identity of{" "}
                {selectedDish.country}. Full recipe details and preparation
                notes will be available to approved culinary partners.
              </p>

              <div className="dish-modal-actions">
                <button
                  type="button"
                  className="dashboard-secondary-btn"
                  onClick={() => navigate("/auth/login")}
                >
                  View Recipe
                </button>

                {selectedDish.status === "Available" && (
                  <button
                    type="button"
                    className="wop-btn wop-btn-primary"
                    onClick={() => navigate("/auth/register")}
                  >
                    Claim Dish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}