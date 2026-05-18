import { useState } from "react"
import axios from "axios"
import "../index.css"

function Register() {
  const [form, setForm] = useState({
    registrationType: "participant",
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    dishName: "",
    recipeLink: "",
    contactInfo: "",
    notes: "",
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Submitting your registration...")

    try {
      await axios.post("/api/register", form)

      setMessage("Registration submitted successfully!")
      setForm({
        registrationType: "participant",
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        country: "",
        dishName: "",
        recipeLink: "",
        contactInfo: "",
        notes: "",
      })
    } catch {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-hero">
        <p>Join the Movement</p>
        <h1>
          Register for
          <br />
          <span>World on a Plate</span>
        </h1>
        <small>
          Chefs, schools, vendors, sponsors, volunteers, and visitors can join
          Seattle’s global culinary record attempt.
        </small>
      </section>

      <section className="register-shell">
        <div className="register-info">
          <h2>Be part of history.</h2>
          <p>
            Help represent a country, dish, organization, or community in a
            one-of-a-kind global food celebration.
          </p>

          <div className="info-list">
            <div><strong>194+</strong><span>Countries</span></div>
            <div><strong>195</strong><span>National Dishes</span></div>
            <div><strong>8 Blocks</strong><span>Seattle Event Route</span></div>
          </div>
        </div>

        <form onSubmit={submitForm} className="register-form">
          <label>Registration Type</label>
          <select name="registrationType" value={form.registrationType} onChange={handleChange}>
            <option value="participant">Participant</option>
            <option value="vendor">Vendor</option>
            <option value="sponsor">Sponsor</option>
            <option value="volunteer">Volunteer</option>
            <option value="visitor">Visitor</option>
          </select>

          <div className="form-grid">
            <input name="fullName" placeholder="Full Name *" value={form.fullName} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <input name="organization" placeholder="School / Organization" value={form.organization} onChange={handleChange} />
            <input name="country" placeholder="Country Representing" value={form.country} onChange={handleChange} />
            <input name="dishName" placeholder="Dish Name" value={form.dishName} onChange={handleChange} />
          </div>

          <input name="recipeLink" placeholder="Recipe Link" value={form.recipeLink} onChange={handleChange} />

          <textarea name="contactInfo" placeholder="Additional Contact Info" value={form.contactInfo} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes / Requirements" value={form.notes} onChange={handleChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </section>
    </main>
  )
}

export default Register