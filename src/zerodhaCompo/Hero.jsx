
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Hero Image */}
      <div className="hero-image">
        <img
          src="https://zerodha.com/static/images/landing.png"
          alt="Zerodha Trading Platform"
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">

        <h1>Invest in everything</h1>

        <p>
          Online platform to invest in stocks, derivatives,
          mutual funds, ETFs, bonds, and more.
        </p>

        <button className="hero-button">
          Sign up for free
        </button>

      </div>

    </section>
  );
}

export default Hero;
