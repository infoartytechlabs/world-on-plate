import "../index.css"

const sponsors = [
  { name: "Amazon", tier: "Title Sponsor" },
  { name: "Google", tier: "Platinum" },
  { name: "Microsoft", tier: "Platinum" },
  { name: "Whole Foods", tier: "Gold" },
  { name: "Starbucks", tier: "Gold" },
]

function Sponsors() {
  return (
    <main className="sponsors-page">

      {/* HERO */}
      <section className="sponsors-hero">
        <p className="kicker">Partners & Sponsors</p>
        <h1>
          Powering a Global Culinary Movement
        </h1>
        <p>
          World on a Plate is made possible by visionary partners supporting
          culture, community, and a Guinness World Record experience.
        </p>
      </section>

      {/* SPONSOR GRID */}
      <section className="sponsor-grid">
        {sponsors.map((s, i) => (
          <div key={i} className="sponsor-card">
            <div className="sponsor-logo">{s.name}</div>
            <span className="tier">{s.tier}</span>
          </div>
        ))}
      </section>

      {/* TIERS */}
      <section className="tiers">
        <h2>Sponsorship Opportunities</h2>

        <div className="tier-grid">

          <div className="tier-card">
            <h3>Title Sponsor</h3>
            <p>Main branding across event, media, and Guinness record attempt.</p>
          </div>

          <div className="tier-card">
            <h3>Platinum</h3>
            <p>Premium visibility, stage presence, and media coverage.</p>
          </div>

          <div className="tier-card">
            <h3>Gold</h3>
            <p>On-site branding, booths, and promotional exposure.</p>
          </div>

          <div className="tier-card">
            <h3>Community Partner</h3>
            <p>Support cultural engagement and local participation.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="sponsor-cta">
        <h2>Become a Sponsor</h2>
        <p>Align your brand with a global cultural milestone.</p>

        <a href="/contact" className="primary-btn">
          Get Sponsorship Details
        </a>
      </section>

    </main>
  )
}

export default Sponsors