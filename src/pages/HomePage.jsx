import "../HomePage.css";
import pathoryLogo from "../assets/pathory-logo.png";

const features = [
  "🧭 Life Path Analytics",
  "📖 Story Collection",
  "🌍 Place Detection",
  "📅 Event Maker",
  "📸 Memory Timeline",
  "🕒 Journey Tracing",
];

function Home() {
  return (
    <section className="hero">
      <div className="center-circle">
        <img
          src={pathoryLogo}
          alt="Pathory Logo"
          className="center-logo"
        />

        <h2 className="logo-title">PATHORY</h2>

        <p className="tagline">
          Every Life Has a Story
        </p>
      </div>

      <div className="orbit">
        {features.map((feature, index) => (
          <div
            key={feature}
            className="orbit-item"
            style={{
              "--angle": `${index * (360 / features.length)}deg`,
            }}
          >
            <div className="node">
              {feature}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;