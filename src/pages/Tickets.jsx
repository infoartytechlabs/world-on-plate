import "../index.css"

const ticketOptions = [
  {
    name: "General Entry",
    price: "Free",
    desc: "Access to the public festival area, cultural performances, and community experience.",
  },
  {
    name: "Food Sampling Pass",
    price: "$25",
    desc: "Sample selected national dishes from participating culinary teams and vendors.",
  },
  {
    name: "VIP Experience",
    price: "$95",
    desc: "Priority access, premium tasting zone, sponsor lounge, and record-moment viewing.",
  },
]

function Tickets() {
  return (
    <main className="tickets-page">
      <section className="tickets-hero">
        <p className="kicker">Tickets & Access</p>
        <h1>
          Join the World’s
          <br />
          <span>Largest Culinary Celebration.</span>
        </h1>
        <p>
          Choose your access level for World on a Plate — from free public entry
          to premium tasting experiences.
        </p>
      </section>

      <section className="ticket-grid">
        {ticketOptions.map((ticket, i) => (
          <div key={i} className={`ticket-card ${i === 1 ? "featured" : ""}`}>
            {i === 1 && <span className="popular">Most Popular</span>}
            <h3>{ticket.name}</h3>
            <strong>{ticket.price}</strong>
            <p>{ticket.desc}</p>
            <button>{ticket.price === "Free" ? "Reserve Spot" : "Get Ticket"}</button>
          </div>
        ))}
      </section>

      <section className="ticket-note">
        <h2>Important Note</h2>
        <p>
          Final ticket availability, tasting pass details, and partner links can
          be updated once event logistics are confirmed.
        </p>
      </section>
    </main>
  )
}

export default Tickets