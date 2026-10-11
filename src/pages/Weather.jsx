
import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import { motion } from "framer-motion";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";

import WeatherIntro from "../compo/WeatherIntro";
import SearchBox from "../compo/SeachBox";
import WeatherInfoBox from "../compo/WeatherInfoBox";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const glassCard = {
  bgcolor: "rgba(15, 23, 42, 0.82)",
  color: "#F8FAFC",
  border: "1px solid rgba(148, 163, 184, 0.22)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
};

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  const searchWeather = async () => {
    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      return;
    }

    if (!API_KEY) {
      setError("API key is missing. Check your .env file.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      const query = new URLSearchParams({
        q: cityName,
        appid: API_KEY,
        units: "metric",
      }).toString();

      const [currentResponse, forecastResponse] =
        await Promise.all([
          fetch(`${BASE_URL}/weather?${query}`),
          fetch(`${BASE_URL}/forecast?${query}`),
        ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
          throw new Error(
            "City not found. Please check the spelling."
          );
        }

        if (currentResponse.status === 401) {
          throw new Error(
            "Invalid API key. Check your OpenWeather API key."
          );
        }

        throw new Error(
          currentData.message || "Unable to fetch current weather."
        );
      }

      if (!forecastResponse.ok) {
        throw new Error(
          forecastData.message ||
            "Unable to fetch the weather forecast."
        );
      }

      setWeather({
        city: currentData.name,
        country: currentData.sys.country,
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        feelsLike: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
      });

      // Choose the forecast reading closest to noon per date.
      const dailyReadings = new Map();

      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
        const distanceFromNoon = Math.abs(hour - 12);
        const existing = dailyReadings.get(date);

        if (!existing || distanceFromNoon < existing.distanceFromNoon) {
          dailyReadings.set(date, {
            date,
            distanceFromNoon,
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
          });
        }
      });

      const dailyForecast = Array.from(dailyReadings.values())
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5)
        .map((day) => ({
          ...day,
          dayName: new Date(
            `${day.date}T12:00:00`
          ).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          formattedDate: new Date(
            `${day.date}T12:00:00`
          ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
        }));

      setForecast(dailyForecast);
    } catch (err) {
      console.error("Weather request failed:", err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showIntro && (
        <WeatherIntro onComplete={() => setShowIntro(false)} />
      )}

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <WbCloudyIcon sx={{ color: "#67E8F9", fontSize: 52 }} />
</Box>
              <Typography
                variant="h2"
                sx={{
                  color: "#F8FAFC",
                  fontWeight: 800,
                  fontSize: { xs: "2.4rem", md: "3.5rem" },
                  textAlign: "center",
                }}
              >
                Weather App
              </Typography>

              <Typography sx={{ color: "#CBD5E1", textAlign: "center" }}>
                Check today's weather and 5-day forecast
              </Typography>
            </Stack>
          </motion.div>

          <SearchBox
            city={city}
            setCity={setCity}
            searchWeather={searchWeather}
            loading={loading}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && (
            <Stack alignItems="center" spacing={2} sx={{ my: 5 }}>
              <CircularProgress sx={{ color: "#67E8F9" }} />
              <Typography sx={{ color: "#F8FAFC" }}>
                Fetching weather...
              </Typography>
            </Stack>
          )}

          {!loading && weather && (
            <WeatherInfoBox
              weather={weather}
              forecast={forecast}
              glassCard={glassCard}
            />
          )}

          {!loading && !weather && !error && (
            <Paper
              elevation={0}
              sx={{
                ...glassCard,
                p: 4,
                textAlign: "center",
                borderRadius: 4,
              }}
            >
              <WbCloudyIcon sx={{ fontSize: 50, color: "#67E8F9" }} />
              <Typography variant="h6">
                Search for a city to get started
              </Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Weather;
