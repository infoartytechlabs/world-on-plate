import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  HandHeart,
  MapPin,
  Music4,
  Store,
  Trophy,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Event",
  "Tickets",
  "Volunteer",
  "Partners",
  "Culinary",
  "Access",
];

const faqs = [
  {
    category: "Event",
    icon: Trophy,
    question: "What is World on a Plate?",
    answer:
      "World on a Plate is Seattle's global culinary celebration and Guinness World Record attempt. National dishes from every UN member and associate country will be prepared, displayed, and shared along Occidental Avenue in Pioneer Square.",
  },
  {
    category: "Event",
    icon: CalendarDays,
    question: "When is the event?",
    answer:
      "The event is scheduled for Saturday, September 26, 2026, from 12 PM to 3 PM.",
  },
  {
    category: "Event",
    icon: MapPin,
    question: "Where will it take place?",
    answer:
      "World on a Plate will take place on Occidental Avenue in Seattle's Pioneer Square neighborhood, transforming roughly eight blocks into a global culinary corridor.",
  },
  {
    category: "Tickets",
    icon: CircleDollarSign,
    question: "Is admission free?",
    answer:
      "Yes. Admission is free and open to all. Visitors may make an optional Venmo contribution to help support event operating costs.",
  },
  {
    category: "Tickets",
    icon: UtensilsCrossed,
    question: "How do food samples work?",
    answer:
      "Food sample tickets will be distributed to the first 8,000 visitors at event entry points. Each ticket may be redeemed to sample the national dish of a country of the visitor's choice.",
  },
  {
    category: "Event",
    icon: Music4,
    question: "What else can visitors do besides sample dishes?",
    answer:
      "Guests can shop in the Global Marketplace, enjoy full international meals from food trucks, experience live international music and cultural performances, and visit the children's area to learn games from around the world.",
  },
  {
    category: "Volunteer",
    icon: HandHeart,
    question: "How can I volunteer?",
    answer:
      "Use the Volunteer form on the site to share your name, phone, email, preferred role, and any country booth interests. A volunteer coordinator will follow up shortly.",
  },
  {
    category: "Volunteer",
    icon: Users,
    question: "What volunteer roles are available?",
    answer:
      "Volunteer roles include Country Booth Volunteers, Merchandise Booth Volunteers, and Ticket Distributors/Visitor Experience Volunteers. Some volunteers may also help with information booths, the volunteer tent, the medical tent, or children's area support.",
  },
  {
    category: "Volunteer",
    icon: ClipboardList,
    question: "What is the volunteer time commitment?",
    answer:
      "Volunteers should expect approximately five hours during the event on September 26, plus a 30-to-60-minute online training shortly before the event. All volunteers must be 18 or older.",
  },
  {
    category: "Partners",
    icon: Store,
    question: "Can sponsors, vendors, or musicians participate?",
    answer:
      "Yes. Sponsors, vendors, and musicians can submit interest forms through the Partnerships page. An event organizer will review submissions and contact applicants with next steps.",
  },
  {
    category: "Partners",
    icon: Store,
    question: "What should vendors know before applying?",
    answer:
      "Vendors choosing to submit an eventual vendor application should expect a $50 application fee and 10% of sales. All permitting is the responsibility of the vendor.",
  },
  {
    category: "Partners",
    icon: Music4,
    question: "Are musical performances paid?",
    answer:
      "The current event information states that musical performances are on a voluntary basis only.",
  },
  {
    category: "Culinary",
    icon: UtensilsCrossed,
    question: "Who can become a culinary partner?",
    answer:
      "Culinary professionals, chefs, restaurants, culinary schools, programs, and institutions may register interest in preparing one or more national dishes for the record-setting event.",
  },
  {
    category: "Culinary",
    icon: ClipboardList,
    question: "What information is needed for culinary registration?",
    answer:
      "Registration asks for first name, last name, professional title, affiliate culinary institution or business, phone number, and email address. Applications are reviewed before access to the culinary partner portal is granted.",
  },
  {
    category: "Culinary",
    icon: Users,
    question: "What are culinary partners responsible for?",
    answer:
      "For each selected dish, culinary partners are responsible for preparing 4,000 sample-size servings, transporting pre-portioned or packaged servings to Pioneer Square, providing needed warming or cooling service items, removing those items after the event, and helping transport unconsumed food to participating soup kitchens.",
  },
  {
    category: "Culinary",
    icon: CalendarDays,
    question: "What is the June 19 culinary deadline?",
    answer:
      "Culinary participants must test their dish and send a photograph of the plated final dish to the Culinary Lead by June 19. Recipe changes and ingredient orders for 4,000 samples must also be finalized by that date.",
  },
  {
    category: "Culinary",
    icon: CircleDollarSign,
    question: "Will ingredients and packaging be provided?",
    answer:
      "Event organizers will provide ingredients and packaging materials for the event itself. Practice preparation before the event is not covered.",
  },
  {
    category: "Culinary",
    icon: UtensilsCrossed,
    question: "Can a culinary partner claim multiple dishes?",
    answer:
      "Yes. Participants are encouraged to commit to more than one national dish and may prepare as many as 15. Anyone interested in more than 15 dishes should contact Tony Parker, President of the Washington Chefs Association, at 253-355-0412.",
  },
  {
    category: "Access",
    icon: MapPin,
    question: "How should visitors get there?",
    answer:
      "Traffic around Occidental Avenue will be diverted and managed by the City of Seattle. More detailed parking, transportation, rideshare, and transit guidance will be provided closer to the event date.",
  },
  {
    category: "Event",
    icon: Trophy,
    question: "Who is organizing the event?",
    answer:
      "World on a Plate is community-led, with Oliver Bangera serving as Event Director, Tony Parker as Culinary Director, and Carrie Antal as Deputy Director. The event has been organized in collaboration with local government and community partners.",
  },
];

const highlights = [
  { icon: CalendarDays, label: "Date", value: "September 26, 2026" },
  { icon: MapPin, label: "Location", value: "Occidental Ave, Seattle" },
  { icon: Users, label: "Samples", value: "First 8,000 visitors" },
  { icon: Trophy, label: "Record", value: "195 national dishes" },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "All") return faqs;
    return faqs.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategory = (category) => {
    setActiveCategory(category);
    setOpenIndex(0);
  };

  return (
    <main className="wop-page inner-page faq-page">
      <section className="faq-hero">
        <div className="wop-container faq-hero-grid">
          <motion.div
            className="faq-hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="wop-eyebrow">FAQ</div>

            <h1 className="wop-title">
              Good answers, <span>served warm.</span>
            </h1>

            <p className="wop-subtitle">
              Everything visitors, volunteers, culinary partners, vendors,
              musicians, and sponsors need to know about World on a Plate.
            </p>
          </motion.div>

          <motion.div
            className="faq-highlight-stack"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="faq-highlight-card"
                  key={item.label}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16 + index * 0.08 }}
                >
                  <Icon size={22} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="faq-section">
        <div className="wop-container">
          <motion.div
            className="faq-category-row"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45 }}
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`faq-category-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div className="faq-list" layout>
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((item, index) => {
                const Icon = item.icon;
                const isOpen = openIndex === index;

                return (
                  <motion.article
                    layout
                    className={`faq-item ${isOpen ? "open" : ""}`}
                    key={`${activeCategory}-${item.question}`}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-icon">
                        <Icon size={21} />
                      </span>

                      <span className="faq-question-copy">
                        <small>{item.category}</small>
                        <strong>{item.question}</strong>
                      </span>

                      <ChevronDown className="faq-chevron" size={24} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                        >
                          <p>{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
