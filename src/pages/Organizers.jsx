import { useEffect } from "react";
import oliver from "../assets/oliver.webp";
import tony from "../assets/tony.webp";
import carrie from "../assets/carrie.webp";

const organizers = [
  {
    image: oliver,
    name: "Oliver Bangera",
    role: "Event Director",
    text: "The vision behind World on a Plate belongs to Oliver Bangera, a Seattle restaurateur since 1994 and owner of Nirmal's restaurant since 2015. A vivacious host, passionate foodie, and devoted history buff, Oliver has spent decades cultivating a deep love for authentic cuisine and the stories behind it. World on a Plate is the natural expression of that passion — a platform for Seattle community members to discover traditional dishes rooted in the culinary heritage of cultures from around the world.",
  },
  {
    image: tony,
    name: "Tony Parker",
    role: "Culinary Director",
    text: "Tony Parker brings extraordinary culinary credentials to World on a Plate. As President of the Washington State Chefs Association and a proud recipient of its Chef of the Year award, Tony is one of the region's most respected culinary leaders. He channels that expertise into shaping the next generation of talent as Lead Chef Instructor of the culinary program at Renton Technical College. Tony is also a highly decorated competitive ice sculptor, having earned numerous medals at international competitions.",
  },
  {
    image: carrie,
    name: "Carrie Antal",
    role: "Deputy Director",
    text: "Carrie Antal is a retired Foreign Service Officer and recently returned Seattle native who brings a wealth of global experience to World on a Plate. Her career abroad honed a rare talent for complex intercultural project and event management, while her personal passion for food led her to launch a popular international cooking channel on YouTube in 2010. Carrie is thrilled to help bring this uplifting celebration of food and fellowship to life in her hometown.",
  },
];

export default function Organizers() {
  useEffect(() => { document.title = "Organizers | World on a Plate"; }, []);
  return (
    <main className="wop-page inner-page">
      <section className="organizer-hero">
        <div className="wop-container organizer-hero-content">
          <div className="wop-eyebrow">Organizers</div>

          <h1 className="wop-title">
            The people behind <span>the celebration.</span>
          </h1>

          <p className="wop-subtitle">
            World on a Plate is a community-led event celebrating Seattle's rich
            cultural heritage, vibrant food scene, and spirit of unity and discovery.
          </p>
        </div>
      </section>

      <section className="organizer-section">
        <div className="wop-container organizer-grid">
          {organizers.map((person) => (
            <article className="organizer-card" key={person.name}>
              <div className="organizer-image-wrap">
                <img src={person.image} alt={person.name} />
              </div>

              <div className="organizer-info">
                <span>{person.role}</span>
                <h2>{person.name}</h2>
                <p>{person.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}