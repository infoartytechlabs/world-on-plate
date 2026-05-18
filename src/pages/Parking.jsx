import "../index.css"

function Parking() {
  return (
    <main className="parking-page">

      {/* HERO */}
      <section className="parking-hero">
        <h1>
          Parking & Location
          <br />
          <span>Pioneer Square, Seattle</span>
        </h1>

        <p>
          Plan your visit to World on a Plate. Explore parking options,
          directions, and transportation for a smooth experience.
        </p>
      </section>

      {/* MAP */}
      <section className="parking-map">
        <iframe
          title="Event Location"
          src="https://www.google.com/maps?q=Pioneer+Square+Seattle&output=embed"
          loading="lazy"
        />
      </section>

      {/* DETAILS */}
      <section className="parking-info">

        <div className="info-card">
          <h3>📍 Event Location</h3>
          <p>Occidental Avenue, Pioneer Square, Seattle, WA</p>
        </div>

        <div className="info-card">
          <h3>🚗 Parking</h3>
          <p>Nearby paid garages and street parking available. Arrive early for best access.</p>
        </div>

        <div className="info-card">
          <h3>🚆 Public Transport</h3>
          <p>Light rail and bus stops within walking distance. Recommended for convenience.</p>
        </div>

        <div className="info-card">
          <h3>⚠️ Tips</h3>
          <p>Expect crowds. Consider carpooling, rideshare, or public transit.</p>
        </div>

      </section>

    </main>
  )
}

export default Parking