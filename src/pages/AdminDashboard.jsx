import { useEffect } from "react";
import {
  Users,
  ChefHat,
  HandHeart,
  Building2,
  Music4,
  Download,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const stats = [
  { icon: <ChefHat />, label: "Pending Culinary Partners", value: "12" },
  { icon: <HandHeart />, label: "Volunteer Signups", value: "248" },
  { icon: <Building2 />, label: "Sponsor Leads", value: "31" },
  { icon: <Music4 />, label: "Musician Requests", value: "18" },
];

const approvals = [
  { name: "Seattle Culinary Academy", type: "Culinary Partner", status: "Pending" },
  { name: "Renton Technical College", type: "Culinary Partner", status: "Pending" },
  { name: "Global Bites Collective", type: "Vendor", status: "New" },
];

export default function AdminDashboard() {
  useEffect(() => { document.title = "Admin Dashboard | World on a Plate"; }, []);
  return (
    <main className="wop-page inner-page">
      <section className="admin-hero">
        <div className="admin-glow admin-glow-one" />
        <div className="admin-glow admin-glow-two" />

        <div className="wop-container admin-top">
          <div>
            <div className="wop-eyebrow">Admin Control Center</div>

            <h1 className="wop-title">
              Event operations <span>dashboard.</span>
            </h1>

            <p className="wop-subtitle">
              Review partner requests, manage volunteers, track sponsors,
              monitor dish assignments, and export event data.
            </p>
          </div>

          <button className="wop-btn wop-btn-primary">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </section>

      <section className="admin-section">
        <div className="wop-container admin-stat-grid">
          {stats.map((item) => (
            <article className="admin-stat-card" key={item.label}>
              <div className="admin-stat-icon">{item.icon}</div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="wop-container admin-panels">
          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <h2>Pending Reviews</h2>
                <p>Approve or reject new submissions.</p>
              </div>

              <Users size={26} />
            </div>

            <div className="admin-list">
              {approvals.map((item) => (
                <div className="admin-list-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.type}</span>
                  </div>

                  <div className="admin-row-actions">
                    <button className="approve-btn">
                      <CheckCircle2 size={16} />
                    </button>

                    <button className="reject-btn">
                      <XCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel admin-panel-dark">
            <h2>Dish Assignment Progress</h2>

            <div className="progress-ring">
              <strong>64%</strong>
              <span>Countries Assigned</span>
            </div>

            <p>
              125 of 195 national dishes have mock assignments in the current
              dashboard preview.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}