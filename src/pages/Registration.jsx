import { useState, useRef } from "react";
import {
    ArrowRight, Building2, Store, Music4, HandHeart, CheckCircle2,
} from "lucide-react";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";

const TABS = [
    {
        type: "sponsor",
        label: "Sponsors",
        Icon: Building2,
        description: "Support Seattle's global culinary celebration through monetary or in-kind contributions.",
        note: "Business, organization, and private sponsorship interest.",
    },
    {
        type: "vendor",
        label: "Vendors",
        Icon: Store,
        description: "Join the World Marketplace or food truck experience with products, food, or cultural goods.",
        note: "$50 application fee + 10% of sales. Permits are vendor responsibility.",
    },
    {
        type: "musician",
        label: "Musicians",
        Icon: Music4,
        description: "Share cultural music, performance, and global artistic traditions with the Seattle community.",
        note: "All performances are voluntary.",
    },
    {
        type: "volunteer",
        label: "Volunteers",
        Icon: HandHeart,
        description: "Support guests, booths, tickets, merchandise, and cultural experiences across the event.",
        note: "~5 hours on Sep 26 + 30–60 min online training. Must be 18+.",
    },
];

const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const isPhoneValid = (v) => v?.replace(/\D/g, "").length === 10;
const isNameValid = (v) => /^[A-Za-z\s'-]{2,40}$/.test(v || "");

function validate(form, type) {
    const base = ["firstName", "lastName", "phone", "email"];
    for (const f of base) if (!form[f]?.trim()) return "Please fill all required contact fields.";
    if (!isNameValid(form.firstName)) return "First name should contain only letters.";
    if (!isNameValid(form.lastName)) return "Last name should contain only letters.";
    if (!isPhoneValid(form.phone)) return "Phone number must be exactly 10 digits.";
    if (!isEmailValid(form.email)) return "Please enter a valid email address.";
    if (type === "sponsor") {
        if (!form.businessName?.trim()) return "Please enter your business name.";
        if (!form.title?.trim()) return "Please enter your title.";
    }
    if (type === "vendor") {
        if (!form.businessName?.trim()) return "Please enter your business name.";
        if (!form.productDetail?.trim()) return "Please describe your products.";
        if (!form.vendorAgreement) return "Please accept the vendor terms to continue.";
    }
    if (type === "musician") {
        if (!form.performerName?.trim()) return "Please enter your performer/group name.";
        if (!form.groupMembers?.trim()) return "Please enter the number of group members.";
        if (!form.musicStyle?.trim()) return "Please describe your musical style.";
        if (!form.musicianAgreement) return "Please accept the volunteer terms to continue.";
    }
    if (type === "volunteer") {
        if (!form.role?.trim()) return "Please select a volunteer role.";
    }
    return "";
}

function ContactFields({ form, onChange, onPhone }) {
    return (
        <>
            <div className="form-row">
                <input name="firstName" placeholder="First Name *" value={form.firstName || ""} onChange={onChange} />
                <input name="lastName" placeholder="Last Name *" value={form.lastName || ""} onChange={onChange} />
            </div>
            <div className="form-row">
                <input name="phone" placeholder="Phone *" value={form.phone || ""} maxLength={10} onChange={onPhone} />
                <input name="email" type="email" placeholder="Email *" value={form.email || ""} onChange={onChange} />
            </div>
        </>
    );
}

function SponsorForm({ form, onChange, onPhone }) {
    return (
        <>
            <ContactFields form={form} onChange={onChange} onPhone={onPhone} />
            <input name="businessName" placeholder="Business / Organization Name *" value={form.businessName || ""} onChange={onChange} />
            <input name="title" placeholder="Title *" value={form.title || ""} onChange={onChange} />
        </>
    );
}

function VendorForm({ form, onChange, onPhone }) {
    return (
        <>
            <ContactFields form={form} onChange={onChange} onPhone={onPhone} />
            <input name="businessName" placeholder="Business / Organization Name *" value={form.businessName || ""} onChange={onChange} />
            <textarea
                name="productDetail"
                placeholder="Product Detail *"
                value={form.productDetail || ""}
                onChange={onChange}
            />
            <label className="form-check">
                <input name="vendorAgreement" type="checkbox" checked={form.vendorAgreement || false} onChange={onChange} />
                <span>
                    I understand vendors choosing to submit an eventual vendor application will pay a{" "}
                    <strong>$50 application fee</strong> and <strong>10% of sales</strong>.
                    All permitting is the responsibility of the vendor.
                </span>
            </label>
        </>
    );
}

function MusicianForm({ form, onChange, onPhone, onNumber }) {
    return (
        <>
            <ContactFields form={form} onChange={onChange} onPhone={onPhone} />
            <input name="performerName" placeholder="Name of Performer / Group *" value={form.performerName || ""} onChange={onChange} />
            <input
                name="groupMembers"
                placeholder="Number of Group Members *"
                value={form.groupMembers || ""}
                maxLength={3}
                onChange={onNumber("groupMembers")}
            />
            <textarea
                name="musicStyle"
                placeholder="Please briefly tell us about your musical style/genre and which country or countries influence your performance. *"
                value={form.musicStyle || ""}
                onChange={onChange}
            />
            <label className="form-check">
                <input name="musicianAgreement" type="checkbox" checked={form.musicianAgreement || false} onChange={onChange} />
                <span>I understand all performances are on a voluntary basis only.</span>
            </label>
        </>
    );
}

function VolunteerForm({ form, onChange, onPhone }) {
    return (
        <>
            <ContactFields form={form} onChange={onChange} onPhone={onPhone} />
            <select name="role" value={form.role || ""} onChange={onChange}>
                <option value="">Which role are you interested in? *</option>
                <option value="Country Booth Volunteer">Country Booth Volunteer</option>
                <option value="Merchandise Booth Volunteer">Merchandise Booth Volunteer</option>
                <option value="Ticket / Visitor Experience">Ticket / Visitor Experience</option>
                <option value="Information Booth">Information Booth</option>
                <option value="Children's Area">Children's Area</option>
            </select>
            <textarea
                name="notes"
                placeholder="Country booth preference or other notes"
                value={form.notes || ""}
                onChange={onChange}
            />
        </>
    );
}

export default function Registration() {
    const [activeType, setActiveType] = useState("sponsor");
    const [hoveredType, setHoveredType] = useState(null);
    const [forms, setForms] = useState({ sponsor: {}, vendor: {}, musician: {}, volunteer: {} });
    const [partnerStatus, setPartnerStatus] = useState("");
    const [successPopup, setSuccessPopup] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef(null);

    const currentTab = TABS.find(t => t.type === activeType);
    const form = forms[activeType];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForms(p => ({ ...p, [activeType]: { ...p[activeType], [name]: type === "checkbox" ? checked : value } }));
    };

    const handlePhone = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 10);
        setForms(p => ({ ...p, [activeType]: { ...p[activeType], phone: v } }));
    };

    const handleNumber = (name) => (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 3);
        setForms(p => ({ ...p, [activeType]: { ...p[activeType], [name]: v } }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validate(form, activeType);
        if (errorMsg) { setPartnerStatus(errorMsg); return; }

        setPartnerStatus("Submitting...");
        setSubmitting(true);

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({ formType: activeType, ...form }),
            });

            setForms(p => ({ ...p, [activeType]: {} }));
            setPartnerStatus("");
            setSuccessPopup(`${currentTab?.label || "Form"} interest submitted successfully. An organizer will contact you shortly.`);
            setTimeout(() => setSuccessPopup(""), 4200);
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        } catch {
            setPartnerStatus("Server error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="wop-page inner-page">

            {/* ── Hero ── */}
            <section className="partner-hero">
                <div className="wop-container">
                    <div className="wop-eyebrow">Registration</div>

                    <h1 className="wop-title">
                        Join us at the <span>table.</span>
                    </h1>

                    <p className="wop-subtitle">
                        World on a Plate brings together sponsors, vendors, performers, and
                        volunteers from across the Seattle community to celebrate global cuisine
                        and culture. Whether you're a business, a food artisan, a musician, or
                        simply want to give your time — there's a place for you here.
                    </p>
                </div>
            </section>

            {/* ── Registration form ── */}
            <section className="volunteer-section" ref={formRef}>

                {/* Option menu — above the card */}
                <div className="wop-container" style={{ marginBottom: 24 }}>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        padding: 6,
                        background: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.7)",
                        borderRadius: 16,
                    }}>
                        {TABS.map((tab) => {
                            const Icon = tab.Icon;
                            const isActive = activeType === tab.type;
                            const isHovered = hoveredType === tab.type;
                            return (
                                <button
                                    key={tab.type}
                                    type="button"
                                    onMouseEnter={() => setHoveredType(tab.type)}
                                    onMouseLeave={() => setHoveredType(null)}
                                    onClick={() => { setActiveType(tab.type); setPartnerStatus(""); }}
                                    style={{
                                        flex: 1,
                                        minWidth: 100,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 7,
                                        padding: "10px 14px",
                                        borderRadius: 10,
                                        border: isActive ? "1px solid rgba(16,23,40,0.08)" : "1px solid transparent",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: isActive || isHovered ? "var(--navy)" : "rgba(16,23,40,0.55)",
                                        background: isActive
                                            ? "#fff"
                                            : isHovered
                                                ? "rgba(255,255,255,0.7)"
                                                : "transparent",
                                        boxShadow: isActive ? "0 4px 14px rgba(54,34,18,0.1)" : "none",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Icon size={15} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="wop-container volunteer-card">

                    {/* Left copy */}
                    <div className="volunteer-copy">
                        <div className="wop-eyebrow">Register Your Interest</div>

                        <h2 className="wop-section-title">
                            {currentTab.label === "Volunteers"
                                ? <>Help bring the world <span>to the table.</span></>
                                : <>Partner with us <span>at the table.</span></>
                            }
                        </h2>

                        <p className="wop-section-text">{currentTab.description}</p>

                        <p className="wop-section-text" style={{ fontStyle: "italic", opacity: 0.7, marginTop: 8 }}>
                            {currentTab.note}
                        </p>
                    </div>

                    {/* Right form */}
                    <form className="volunteer-form" onSubmit={handleSubmit} noValidate>

                        {activeType === "sponsor" && <SponsorForm form={form} onChange={handleChange} onPhone={handlePhone} />}
                        {activeType === "vendor" && <VendorForm form={form} onChange={handleChange} onPhone={handlePhone} />}
                        {activeType === "musician" && <MusicianForm form={form} onChange={handleChange} onPhone={handlePhone} onNumber={handleNumber} />}
                        {activeType === "volunteer" && <VolunteerForm form={form} onChange={handleChange} onPhone={handlePhone} />}

                        <button
                            type="submit"
                            className="wop-btn wop-btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting…" : "Submit Interest"}
                            {!submitting && <ArrowRight size={18} />}
                        </button>

                        {partnerStatus && <p className="form-status">{partnerStatus}</p>}

                    </form>

                </div>

                {/* Volunteer roles — below the card */}
                {activeType === "volunteer" && (
                    <div className="wop-container" style={{ marginTop: 40 }}>
                        <div className="volunteer-role-list">
                            <div>
                                <strong>Country Booth Volunteers</strong>
                                <span>Decorate booths, collect tickets, serve samples, engage guests, distribute materials, maintain sanitation, and clean up booth décor.</span>
                            </div>
                            <div>
                                <strong>Merchandise Booth Volunteers</strong>
                                <span>Help transport, arrange, sell, collect payments, pack, and return merchandise.</span>
                            </div>
                            <div>
                                <strong>Ticket / Visitor Experience Volunteers</strong>
                                <span>Set up signage, distribute tickets, explain ticket redemption, support donations, answer questions, and staff key event areas.</span>
                            </div>
                            <div>
                                <strong>Information Booth</strong>
                                <span>Answer general event questions and guide visitors throughout the event grounds.</span>
                            </div>
                            <div>
                                <strong>Children's Area</strong>
                                <span>Support activities and programming in the children's section of the event.</span>
                            </div>
                        </div>
                    </div>
                )}

            </section>

            {/* ── Success toast ── */}
            {successPopup && (
                <div className="success-toast">
                    <CheckCircle2 size={20} />
                    <span>{successPopup}</span>
                </div>
            )}

        </main>
    );
}