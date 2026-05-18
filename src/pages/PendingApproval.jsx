import {
  Clock3,
  MailCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function PendingApproval() {
  return (
    <main className="wop-page inner-page">

      <section className="pending-section">

        <div className="pending-glow pending-glow-one" />
        <div className="pending-glow pending-glow-two" />

        <div className="wop-container pending-layout">

          <div className="pending-card">

            <div className="pending-icon">
              <Clock3 />
            </div>

            <div className="wop-eyebrow">
              Application Submitted
            </div>

            <h1 className="pending-title">
              Your institution is <span>under review.</span>
            </h1>

            <p className="pending-text">
              Thank you for applying to participate in World on a Plate.
              Our organizers are reviewing your culinary institution
              submission and will contact you once approved.
            </p>

            <div className="pending-steps">

              <div className="pending-step completed">
                <div className="pending-step-icon">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Application Submitted</strong>
                  <span>Your registration form was received.</span>
                </div>
              </div>

              <div className="pending-step active">
                <div className="pending-step-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Organizer Review</strong>
                  <span>Applications are reviewed manually.</span>
                </div>
              </div>

              <div className="pending-step">
                <div className="pending-step-icon">
                  <MailCheck size={18} />
                </div>

                <div>
                  <strong>Email Confirmation</strong>
                  <span>Approved institutions receive dashboard access.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}