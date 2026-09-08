import { Link } from "react-router-dom";
import krishnaSuhas from "../assets/krishna_suhas.jpeg";
import suhasKondu from "../assets/suhas_kondu.jpeg";
import suhanJoshi from "../assets/suhan_joshi.jpeg";

const sections = [
  {
    number: "01",
    title: "Research first",
    text: "We publish equity research pitches using DCF, SOTP, and NAV, plus market watches on current events and catalysts.",
  },
  {
    number: "02",
    title: "Built in public",
    text: "Every pitch moves through research, modeling, and peer review before it goes out. The process stays visible so the thinking can be challenged.",
  },
  {
    number: "03",
    title: "Made to compound",
    text: "As TVM grows, we want to help train the next wave of students trying to break into finance and give them a place to practice the craft.",
  },
  {
    number: "04",
    title: "Independent by design",
    text: "An independent, student-founded organization.",
  },
];

const team = [
  {
    name: "Krishna Suhas",
    role: "Asset Managing Director",
    image: krishnaSuhas,
  },
  {
    name: "Suhas Kondu",
    role: "Investment Banking Director",
    image: suhasKondu,
  },
  {
    name: "Suhan Joshi",
    role: "Investment Banking Director",
    image: suhanJoshi,
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="about-kicker">About Texas Valuation &amp; Modeling</p>
          <h1>Good investing starts with better questions.</h1>
          <p className="about-hero-lede">
            TVM is a student-led research organization for people who want to understand a
            business before they price it.
          </p>
        </div>
        <div className="about-hero-note">
          <span className="about-note-mark">TVM / 2025</span>
          <p>
            Independent equity research, built by students and sharpened through discussion.
          </p>
        </div>
      </section>

      <section className="about-thesis" aria-label="Our approach">
        <p className="about-thesis-label">Our approach</p>
        <h2>We care about the work between the headline and the conclusion.</h2>
        <p>
          That means learning the business, making the assumptions explicit, and being honest
          about what could change the thesis.
        </p>
      </section>

      <section className="about-principles" aria-label="What guides our work">
        <div className="about-section-heading">
          <p className="about-kicker">The way we work</p>
          <h2>Clarity over noise.</h2>
        </div>
        <div className="about-principle-list">
          {sections.map((section) => (
            <article className="about-principle" key={section.title}>
              <span className="about-principle-number">{section.number}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-team">
        <div className="about-section-heading about-team-heading">
          <div>
            <p className="about-kicker">Leadership</p>
            <h2>Meet the team.</h2>
          </div>
        </div>
        <div className="about-team-grid">
          {team.map((member) => (
            <article className="about-member" key={member.name}>
              <img src={member.image} alt={member.name} />
              <div className="about-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <div>
          <p className="about-kicker">Keep reading</p>
          <h2>See the work behind the thesis.</h2>
          <p>Explore our latest ideas and track the thinking behind each recommendation.</p>
        </div>
        <Link to="/research">View our research <span aria-hidden="true">-&gt;</span></Link>
      </section>
    </main>
  );
}
