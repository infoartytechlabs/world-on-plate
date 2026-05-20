import { useEffect } from "react";
import {
  Ticket,
  UtensilsCrossed,
  Music4,
  MapPinned,
  HeartHandshake,
  Bus,
} from "lucide-react";

export default function EventDetails() {
  useEffect(() => { document.title = "Event Details | World on a Plate"; }, []);
  return (
    <main className="wop-page inner-page">

      <section className="event-details-hero">

        <div className="event-details-glow glow-one" />
        <div className="event-details-glow glow-two" />

        <div className="wop-container">

          <div className="wop-eyebrow">
            Event Details
          </div>

          <h1 className="wop-title">
            A global celebration <span>across Seattle.</span>
          </h1>

          <p className="wop-subtitle">
            World on a Plate is a celebration of Seattle’s dynamism and
            fellowship through shared enjoyment of cuisines reflecting
            our diverse roots.
          </p>

        </div>

      </section>

      <section className="event-experience-section">

        <div className="wop-container">

          <div className="event-grid">

            <article className="event-card">
              <div className="event-card-icon">
                <UtensilsCrossed size={26} />
              </div>

              <h2>Experiences</h2>

              <p>
                All 194 national dishes of the world will be prepared in an
                attempt to set a new Guinness World Record. The first 8,000
                visitors to this free event will be able to redeem tickets
                to sample the national dish of a country of their choice.
              </p>

              <p>
                Visitors will also be able to shop in the Global Marketplace,
                enjoy full international meals from food trucks, discover live
                international music performances, and learn games in the
                children’s area.
              </p>
            </article>

            <article className="event-card">
              <div className="event-card-icon">
                <Ticket size={26} />
              </div>

              <h2>Tickets & Admission</h2>

              <p>
                Entrance to World on a Plate is completely free of charge.
                Visitors may optionally make a voluntary Venmo contribution
                to support event operating costs.
              </p>

              <p>
                Food sample tickets will be distributed to the first 8,000
                visitors at the event’s entry points throughout Pioneer Square.
              </p>
            </article>

            <article className="event-card">
              <div className="event-card-icon">
                <Music4 size={26} />
              </div>

              <h2>Performances</h2>

              <p>
                Seattle’s international arts community will fill Occidental
                Park throughout the day with music, dance, cultural
                storytelling, and performances representing cultures from
                around the world.
              </p>
            </article>

            <article className="event-card">
              <div className="event-card-icon">
                <Bus size={26} />
              </div>

              <h2>Access & Transportation</h2>

              <p>
                The event will take place along Occidental Avenue in Pioneer
                Square. Traffic in the area will be diverted and managed by
                the City of Seattle.
              </p>

              <p>
                Additional parking, transportation, rideshare, and transit
                guidance will be shared closer to the event date.
              </p>
            </article>

          </div>

        </div>

      </section>

      <section className="event-map-section">

        <div className="wop-container event-map-layout">

          <div className="event-map-copy">

            <div className="wop-eyebrow">
              Location
            </div>

            <h2 className="wop-section-title">
              Occidental Avenue <span>Pioneer Square.</span>
            </h2>

            <p className="wop-section-text">
              Eight blocks of Pioneer Square will transform into a global
              culinary corridor celebrating food, music, culture, and
              community.
            </p>

            <div className="event-location-cards">

              <div className="event-location-mini">
                <MapPinned size={20} />
                <span>Occidental Ave South</span>
              </div>

              <div className="event-location-mini">
                <HeartHandshake size={20} />
                <span>Free & Open to All</span>
              </div>

            </div>

          </div>

          <div className="event-map-card">

            <div className="map-placeholder">

              <MapPinned size={56} />

              <strong>Pioneer Square</strong>

              <span>
                Seattle, Washington
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}