import pathoryLogo from "../assets/pathory-logo.png";
import "../HomePage.css";

const features = [
  {
    title: "Life Path Analytics",
    icon: "🧭",
    desc: "Visualize your personal journey and milestones.",
  },
  {
    title: "Story Collection",
    icon: "📖",
    desc: "Capture and preserve meaningful memories.",
  },
  {
    title: "Place Detection",
    icon: "🌍",
    desc: "Automatically connect stories to locations.",
  },
  {
    title: "Event Maker",
    icon: "📅",
    desc: "Create timelines of important life events.",
  },
];

function Home() {
  return (
    <main className="homepage">
      <section className="hero">
        <div className="hero-left">
          <img
            src={pathoryLogo}
            alt="Pathory"
            className="hero-logo"
          />

          <span className="badge">
            Every Life Has A Story
          </span>

          <h1>
            Turn Your Life Journey Into
            <span> A Living Story</span>
          </h1>

          <p>
            Capture memories, track milestones, map experiences,
            and create a visual timeline of your life.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              Start Your Journey
            </button>

            <button className="secondary-btn">
              Explore Features
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="dashboard-preview">
            <div className="stat-card large">
              <h3>Journey Progress</h3>
              <div className="circle">72%</div>
            </div>

            <div className="stat-card">
              <h3>Stories Saved</h3>
              <p>124</p>
            </div>

            <div className="stat-card">
              <h3>Places Visited</h3>
              <p>48</p>
            </div>

            <div className="timeline-card">
              <h3>Recent Memories</h3>

              <div className="timeline-item">
                📸 Summer in Lisbon
              </div>

              <div className="timeline-item">
                🎓 Graduation Day
              </div>

              <div className="timeline-item">
                ✈️ First Solo Trip
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;