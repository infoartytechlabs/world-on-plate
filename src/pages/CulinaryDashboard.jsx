import { ExternalLink, CheckCircle2 } from "lucide-react";

const dishes = [
  {
    country: "India",
    dish: "Biryani",
    recipe: "#",
    assigned: false,
    institution: "",
  },
  {
    country: "Mexico",
    dish: "Mole",
    recipe: "#",
    assigned: true,
    institution: "Seattle Culinary Academy",
  },
  {
    country: "Morocco",
    dish: "Couscous",
    recipe: "#",
    assigned: false,
    institution: "",
  },
  {
    country: "Japan",
    dish: "Sushi",
    recipe: "#",
    assigned: true,
    institution: "Renton Technical College",
  },
];

export default function CulinaryDashboard() {
  return (
    <main className="wop-page inner-page">
      <section className="culinary-dashboard-hero">
        <div className="wop-container">
          <div className="wop-eyebrow">Culinary Partner Portal</div>

          <h1 className="wop-title">
            National dish <span>assignment table.</span>
          </h1>

          <p className="wop-subtitle">
            Approved culinary professionals and institutions may review national
            dishes, open recipe links, and sign up to prepare available dishes.
          </p>
        </div>
      </section>

      <section className="culinary-instructions">
        <div className="wop-container culinary-instruction-card">
          <h2>Participation Instructions</h2>

          <p>
            Thank you for your interest in participating in World on a Plate!
            Culinary professionals and institutions are invited to participate
            by committing to prepare one or more dishes below for the World on a
            Plate Guinness Record Setting Event on Saturday, September 26.
          </p>

          <p>
            For each dish selected, the participant will be responsible for
            preparing <strong>4,000 sample-size servings</strong>, transporting
            them in pre-portioned or packaged servings to the event in Pioneer
            Square, Seattle, and providing the necessary warming/cooling trays
            or other relevant service items.
          </p>

          <p>
            After the five-hour event, the participant will also be responsible
            for removing these items from the event site and transporting any
            unconsumed food to nearby participating soup kitchens. Waste must be
            minimized in the packaging of food items.
          </p>

          <p>
            Event organizers will provide ingredients and packaging materials
            for the event, but not for practice preparation in advance of the
            event.
          </p>

          <p>
            Participants must test the dish and send a photograph of the plated
            final dish to the Culinary Lead no later than{" "}
            <strong>June 19</strong>. By this date, any recipe changes must also
            be finalized, and participants must share the ingredient order with
            quantities needed to prepare samples for 4,000 people.
          </p>

          <p>
            Participants may prepare more than one national dish and may elect
            to prepare as many as <strong>15 national dishes</strong>. To prepare
            more than 15 dishes, please contact Tony Parker, President,
            Washington Chefs Association — <strong>253-355-0412</strong>.
          </p>
        </div>
      </section>

      <section className="culinary-table-section">
        <div className="wop-container culinary-table-card">
          <div className="culinary-table-head">
            <div>
              <h2>Available National Dishes</h2>
              <p>
                If a dish is unassigned, click “Sign up!” to claim it. Assigned
                dishes display the institution or business that has claimed it.
              </p>
            </div>
          </div>

          <div className="culinary-table-wrap">
            <table className="culinary-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>National Dish</th>
                  <th>Recipe</th>
                  <th>Assigned</th>
                </tr>
              </thead>

              <tbody>
                {dishes.map((item) => (
                  <tr key={item.country}>
                    <td>{item.country}</td>
                    <td>{item.dish}</td>
                    <td>
                      <a href={item.recipe} target="_blank" rel="noreferrer">
                        View Recipe <ExternalLink size={14} />
                      </a>
                    </td>
                    <td>
                      {item.assigned ? (
                        <span className="assigned-pill">
                          <CheckCircle2 size={14} />
                          {item.institution}
                        </span>
                      ) : (
                        <button className="signup-dish-btn">Sign up!</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}