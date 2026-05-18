export default function VolunteerModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="premium-modal wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <p className="page-kicker">Volunteer</p>
        <h2>Thank you for your support!</h2>
        <p>
          Volunteer time commitment is approximately five hours during the event
          and a 30-to-60-minute online training shortly beforehand. Volunteers
          must be 18 or older.
        </p>

        <div className="volunteer-roles">
          <div><h4>Country Booth Volunteers</h4><p>Decorate booths, collect tickets, serve samples, engage visitors, and maintain booth cleanliness.</p></div>
          <div><h4>Merchandise Booth Volunteers</h4><p>Assist with merchandise setup, display, payments, and pack-up.</p></div>
          <div><h4>Ticket / Visitor Experience Volunteers</h4><p>Distribute tickets, explain redemption, answer questions, and support visitor flow.</p></div>
        </div>

        <form className="premium-form">
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Phone" />
          <input placeholder="Email" />
          <textarea placeholder="Which role(s) are you interested in?" />
          <textarea placeholder="If booth staffing, which country or countries are you interested in?" />
          <button className="primary-btn">Submit Volunteer Interest</button>
        </form>
      </div>
    </div>
  )
}