import "../index.css"

const vendorTypes = [
  {
    title: "Food Vendors",
    desc: "Serve authentic national dishes and represent global cuisine.",
  },
  {
    title: "Market Vendors",
    desc: "Sell cultural products, crafts, and specialty items.",
  },
  {
    title: "Beverage Partners",
    desc: "Offer drinks, specialty beverages, and branded experiences.",
  },
  {
    title: "Pop-ups",
    desc: "Interactive booths, tasting counters, and brand activations.",
  },
]

function Vendors() {
  return (
    <main className="vendors-page">

      {/* HERO */}
      <section className="vendors-hero">
        <p className="kicker">Vendor Opportunities</p>
        <h1>
          Showcase Your Brand
          <br />
          <span>At a Global Stage.</span>
        </h1>
        <p>
          Join World on a Plate and connect with thousands of attendees
          through food, culture, and unforgettable experiences.
        </p>
      </section>

      {/* GRID */}
      <section className="vendor-grid">
        {vendorTypes.map((v, i) => (
          <div key={i} className="vendor-card">
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </section>

      {/* REQUIREMENTS */}
      <section className="vendor-requirements">
        <h2>Requirements</h2>

        <ul>
          <li>Health & safety compliance</li>
          <li>Food handling permits</li>
          <li>Setup within assigned event zone</li>
          <li>Commitment to event schedule</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="vendor-cta">
        <h2>Apply as a Vendor</h2>
        <p>Secure your spot at Seattle’s largest global food celebration.</p>

        <a href="/register" className="primary-btn">
          Apply Now
        </a>
      </section>

    </main>
  )
}

export default Vendors