
import "./Hero.css";

function Home() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <h1>
          Build Something <span>Amazing</span>
        </h1>

        <p>
          Welcome to our website. We create modern,
          responsive and beautiful digital experiences
          to help your business grow.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>

      </div>

    </section>
  );
}

export default Home;
