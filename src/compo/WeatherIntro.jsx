import "./WeatherIntro.css";

function WeatherIntro({ onComplete }) {
  return (
    <div className="weather-intro" onAnimationEnd={onComplete}>
      <h1>Weather App</h1>
    </div>
  );
}

export default WeatherIntro;