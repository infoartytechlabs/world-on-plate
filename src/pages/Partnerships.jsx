import { useState } from "react";
import { ArrowRight, Building2, Store, Music4, X, CheckCircle2 } from "lucide-react";

const partnerCards = [
  {
    type: "sponsor",
    icon: <Building2 />,
    title: "Sponsors",
    text: "Support Seattle’s global culinary celebration through monetary or in-kind contributions.",
    note: "Business, organization, and private sponsorship interest.",
  },
  {
    type: "vendor",
    icon: <Store />,
    title: "Vendors",
    text: "Join the World Marketplace or food truck experience with products, food, or cultural goods.",
    note: "$50 application fee + 10% of sales. Permits are vendor responsibility.",
  },
  {
    type: "musician",
    icon: <Music4 />,
    title: "Musicians",
    text: "Share cultural music, performance, and global artistic traditions with the Seattle community.",
    note: "All performances are voluntary.",
  },
];

export default function Partnerships() {
  const [activeForm, setActiveForm] = useState(null);
  const [partnerForm, setPartnerForm] = useState({});
  const [partnerStatus, setPartnerStatus] = useState("");
  const [successPopup, setSuccessPopup] = useState("");

  const current = partnerCards.find((item) => item.type === activeForm);

  const openForm = (type) => {
    setActiveForm(type);
    setPartnerForm({});
    setPartnerStatus("");
  };

  const closeForm = () => {
    setActiveForm(null);
    setPartnerForm({});
    setPartnerStatus("");
  };

  const handlePartnerChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPartnerForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  };

  
  const isPhoneValid = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10;
};

const isNameValid = (name) => {
  return /^[A-Za-z\s'-]{2,40}$/.test(name || "");
};

const validatePartnerForm = () => {
  const requiredBase = ["firstName", "lastName", "phone", "email"];

  for (const field of requiredBase) {
    if (!partnerForm[field]?.trim()) {
      return "Please fill all required contact fields.";
    }
  }

  if (!isNameValid(partnerForm.firstName)) {
    return "First name should contain only letters.";
  }

  if (!isNameValid(partnerForm.lastName)) {
    return "Last name should contain only letters.";
  }

  if (!isPhoneValid(partnerForm.phone)) {
    return "Phone number must be exactly 10 digits.";
  }

  if (!isEmailValid(partnerForm.email)) {
    return "Please enter a valid email.";
  }

  return "";
};


  const handlePartnerSubmit = async (e) => {
    e.preventDefault();

    const validationError = validatePartnerForm();

    if (validationError) {
      setPartnerStatus(validationError);
      return;
    }

    setPartnerStatus("Submitting...");

    try {
      const response = await fetch(
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec",
  {
    method: "POST",
    body: JSON.stringify({
      formType: activeForm,
      ...partnerForm,
    }),
  }
);

      const result = await response.json();

      if (result.success) {
        const submittedType = current?.title || "Form";

        closeForm();
        setSuccessPopup(`${submittedType} interest submitted successfully. An organizer will contact you shortly.`);

        setTimeout(() => {
          setSuccessPopup("");
        }, 4200);
      } else {
        setPartnerStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setPartnerStatus("Server error. Please try again.");
    }
  };

  return (
    <main className="wop-page inner-page">
      <section className="partner-hero">
        <div className="wop-container">
          <div className="wop-eyebrow">Partnerships</div>

          <h1 className="wop-title">
            Build the celebration <span>with us.</span>
          </h1>

          <p className="wop-subtitle">
            This community-led event has been organized in collaboration
            with the City of Seattle, King County, and Mayor Katie Wilson.
            The event has further been made possible through generous
            monetary and in-kind contributions from the Seattle-area
            business community and culinary partners.
          </p>

          <div className="partnership-highlight">
            <strong>Special Thanks</strong>

            <p>
              The organizers particularly wish to thank the Washington
              State Chefs Association and subsidiary culinary schools
              and programs, who were instrumental in leading the
              preparation of national dishes for this event.
            </p>
          </div>
        </div>
      </section>

      <section className="partner-section">
        <div className="wop-container partner-grid">
          {partnerCards.map((card) => (
            <article className="partner-card" key={card.title}>
              <div className="partner-icon">{card.icon}</div>

              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <span>{card.note}</span>

              <button
                type="button"
                className="wop-btn wop-btn-primary"
                onClick={() => openForm(card.type)}
              >
                Open Form <ArrowRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {activeForm && (
        <div className="partner-modal-backdrop">
          <div className="partner-modal">
            <button
              type="button"
              className="partner-modal-close"
              onClick={closeForm}
            >
              <X size={20} />
            </button>

            <div className="partner-modal-head">
              <div className="partner-icon">{current.icon}</div>

              <div>
                <span className="partner-modal-kicker">World on a Plate</span>

                <h2>{current.title} Interest Form</h2>

                <p>
                  Kindly complete the fields below. An event organizer
                  will be in contact shortly.
                </p>
              </div>
            </div>

            <form className="partner-modal-form" onSubmit={handlePartnerSubmit} noValidate>
              <div className="form-row">
                <input
                  name="firstName"
                  placeholder="First Name *"
                  value={partnerForm.firstName || ""}
                  onChange={handlePartnerChange}
                />

                <input
                  name="lastName"
                  placeholder="Last Name *"
                  value={partnerForm.lastName || ""}
                  onChange={handlePartnerChange}
                />
              </div>

              <div className="form-row">
               <input
                name="phone"
                placeholder="Phone *"
                value={partnerForm.phone || ""}
                maxLength={10}
                onChange={(e) => {
                  const onlyNumbers = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPartnerForm((prev) => ({
                    ...prev,
                    phone: onlyNumbers,
                  }));
                }}
              />

                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  value={partnerForm.email || ""}
                  onChange={handlePartnerChange}
                />
              </div>

              {activeForm === "sponsor" && (
                <>
                  <input
                    name="businessName"
                    placeholder="Business / Organization Name *"
                    value={partnerForm.businessName || ""}
                    onChange={handlePartnerChange}
                  />

                  <input
                    name="title"
                    placeholder="Title *"
                    value={partnerForm.title || ""}
                    onChange={handlePartnerChange}
                  />
                </>
              )}

              {activeForm === "vendor" && (
                <>
                  <input
                    name="businessName"
                    placeholder="Business / Organization Name *"
                    value={partnerForm.businessName || ""}
                    onChange={handlePartnerChange}
                  />

                  <textarea
                    name="productDetail"
                    placeholder="Product Detail *"
                    value={partnerForm.productDetail || ""}
                    onChange={handlePartnerChange}
                  />

                  <label className="form-check">
                    <input
                      name="vendorAgreement"
                      type="checkbox"
                      checked={partnerForm.vendorAgreement || false}
                      onChange={handlePartnerChange}
                    />

                    <span>
                      I understand vendors choosing to submit an eventual vendor
                      application will pay a $50 application fee and 10% of
                      sales. All permitting is the responsibility of the vendor.
                    </span>
                  </label>
                </>
              )}

              {activeForm === "musician" && (
                <>
                  <input
                    name="performerName"
                    placeholder="Name of Performer / Group *"
                    value={partnerForm.performerName || ""}
                    onChange={handlePartnerChange}
                  />

                    <input
                      name="groupMembers"
                      placeholder="Number of Group Members *"
                      value={partnerForm.groupMembers || ""}
                      maxLength={3}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 3);

                        setPartnerForm((prev) => ({
                          ...prev,
                          groupMembers: onlyNumbers,
                        }));
                      }}
                    />

                  <textarea
                    name="musicStyle"
                    placeholder="Please briefly tell us about your musical style/genre and which country or countries influence your performance. *"
                    value={partnerForm.musicStyle || ""}
                    onChange={handlePartnerChange}
                  />

                  <label className="form-check">
                    <input
                      name="musicianAgreement"
                      type="checkbox"
                      checked={partnerForm.musicianAgreement || false}
                      onChange={handlePartnerChange}
                    />

                    <span>
                      I understand all performances are on a voluntary basis only.
                    </span>
                  </label>
                </>
              )}

              <button type="submit" className="wop-btn wop-btn-primary">
                Submit Interest <ArrowRight size={18} />
              </button>

              {partnerStatus && <p className="form-status">{partnerStatus}</p>}
            </form>
          </div>
        </div>
      )}

      {successPopup && (
        <div className="success-toast">
          <CheckCircle2 size={20} />
          <span>{successPopup}</span>
        </div>
      )}
    </main>
  );
}