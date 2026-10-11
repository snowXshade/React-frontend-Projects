
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import WeatherIntro from "../compo/WeatherIntro";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ICON_URL = "https://openweathermap.org/img/wn";

// Reusable glass card styling
const glassCard = {
  bgcolor: "rgba(15, 23, 42, 0.82)",
  color: "#F8FAFC",
  border: "1px solid rgba(148, 163, 184, 0.22)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
};

const mutedText = "#CBD5E1";
const accentColor = "#67E8F9";

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
      const query = `q=${encodeURIComponent(
        cityName
      )}&appid=${API_KEY}&units=metric`;

      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?${query}`),
        fetch(`${BASE_URL}/forecast?${query}`),
      ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
          throw new Error("City not found. Please check the spelling.");
        }

        if (currentResponse.status === 401) {
          throw new Error("Invalid API key. Check your OpenWeather API key.");
        }

        throw new Error(
          currentData.message || "Unable to fetch current weather."
        );
      }

      if (!forecastResponse.ok) {
        if (forecastResponse.status === 401) {
          throw new Error("Invalid API key. Check your OpenWeather API key.");
        }

        throw new Error(
          forecastData.message || "Unable to fetch the weather forecast."
        );
      }

      // Current weather
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

      // Select the forecast reading closest to noon for each date.
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
          dayName: new Date(`${day.date}T12:00:00`).toLocaleDateString(
            "en-US",
            { weekday: "short" }
          ),
          formattedDate: new Date(`${day.date}T12:00:00`).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short" }
          ),
        }));

      setForecast(dailyForecast);
    } catch (err) {
      console.error("Weather request failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <>
      {showIntro && (
        <WeatherIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Transparent wrapper: background is handled separately */}
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "#F8FAFC",
                  fontWeight: 800,
                  fontSize: { xs: "2.4rem", md: "3.5rem" },
                  textAlign: "center",
                  letterSpacing: "-1px",
                  textShadow: "0 0 30px rgba(103, 232, 249, 0.18)",
                }}
              >
                Weather App
              </Typography>

              <Typography
                sx={{
                  color: mutedText,
                  textAlign: "center",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Check today's weather and 5-day forecast
              </Typography>
            </Stack>
          </motion.div>

          {/* Search */}
          <Paper
            elevation={0}
            sx={{
              ...glassCard,
              maxWidth: 650,
              mx: "auto",
              p: { xs: 1.5, sm: 2 },
              mb: 4,
              borderRadius: 4,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
            >
              <TextField
                fullWidth
                label="City"
                placeholder="e.g. Ranchi"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                onKeyDown={handleKeyDown}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: mutedText,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: accentColor,
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#F8FAFC",
                    borderRadius: 2.5,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    "& fieldset": {
                      borderColor: "rgba(148,163,184,0.35)",
                    },
                    "&:hover fieldset": {
                      borderColor: accentColor,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: accentColor,
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={searchWeather}
                disabled={loading}
                sx={{
                  minWidth: { sm: 130 },
                  py: { xs: 1.5, sm: 0 },
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#082F49",
                  background:
                    "linear-gradient(135deg, #67E8F9, #38BDF8)",
                  boxShadow: "0 4px 20px rgba(56,189,248,0.18)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #A5F3FC, #67E8F9)",
                    boxShadow: "0 6px 24px rgba(56,189,248,0.3)",
                  },
                  "&.Mui-disabled": {
                    color: "#64748B",
                    background: "#334155",
                  },
                }}
              >
                Search
              </Button>
            </Stack>
          </Paper>

          {/* Error */}
          {error && (
            <Paper
              role="alert"
              sx={{
                p: 2,
                mb: 3,
                textAlign: "center",
                color: "#FCA5A5",
                bgcolor: "rgba(127, 29, 29, 0.55)",
                border: "1px solid rgba(248,113,113,0.35)",
                borderRadius: 3,
                backdropFilter: "blur(12px)",
              }}
            >
              {error}
            </Paper>
          )}

          {/* Loading */}
          {loading && (
            <Stack alignItems="center" spacing={2} sx={{ my: 5 }}>
              <CircularProgress
                sx={{ color: accentColor }}
                aria-label="Loading weather"
              />
              <Typography sx={{ color: "#F8FAFC" }}>
                Fetching weather...
              </Typography>
            </Stack>
          )}

          {/* Current weather */}
          {!loading && weather && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  ...glassCard,
                  mb: 4,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                  {/* City and condition */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <LocationOnIcon
                          sx={{ color: accentColor, fontSize: 30 }}
                        />

                        <Typography
                          variant="h4"
                          fontWeight={700}
                          sx={{
                            color: "#F8FAFC",
                            fontSize: { xs: "1.8rem", md: "2.2rem" },
                          }}
                        >
                          {weather.city}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{ ml: 4.5, color: mutedText }}
                      >
                        {weather.country}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        bgcolor: "rgba(103,232,249,0.10)",
                        border: "1px solid rgba(103,232,249,0.2)",
                        px: 2,
                        py: 1,
                        borderRadius: 5,
                      }}
                    >
                      <img
                        src={`${ICON_URL}/${weather.icon}.png`}
                        alt={weather.condition}
                        width="40"
                        height="40"
                      />

                      <Typography
                        sx={{
                          color: accentColor,
                          textTransform: "capitalize",
                          fontWeight: 500,
                        }}
                      >
                        {weather.condition}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider
                    sx={{
                      my: 3,
                      borderColor: "rgba(148,163,184,0.2)",
                    }}
                  />

                  {/* Temperature */}
                  <Typography
                    variant="h1"
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: "4rem", md: "6rem" },
                      lineHeight: 1.1,
                      color: "#F8FAFC",
                      letterSpacing: "-3px",
                    }}
                  >
                    {weather.temperature}
                    <Box
                      component="span"
                      sx={{
                        color: accentColor,
                        ml: 0.5,
                      }}
                    >
                      °C
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: mutedText,
                      fontSize: "0.95rem",
                    }}
                  >
                    Current temperature
                  </Typography>

                  {/* Weather details */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(3, minmax(0, 1fr))",
                      },
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <WeatherDetail
                      icon={
                        <DeviceThermostatIcon
                          sx={{ color: accentColor, fontSize: 30 }}
                        />
                      }
                      title="Feels Like"
                      value={`${weather.feelsLike}°C`}
                    />

                    <WeatherDetail
                      icon={
                        <WaterDropIcon
                          sx={{ color: "#60A5FA", fontSize: 30 }}
                        />
                      }
                      title="Humidity"
                      value={`${weather.humidity}%`}
                    />

                    <WeatherDetail
                      icon={
                        <AirIcon
                          sx={{ color: "#A5B4FC", fontSize: 30 }}
                        />
                      }
                      title="Wind Speed"
                      value={`${weather.wind} m/s`}
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Five-day forecast */}
              {forecast.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      color: "#F8FAFC",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CalendarMonthIcon sx={{ color: accentColor }} />
                    5-Day Forecast
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, minmax(0, 1fr))",
                        sm: "repeat(3, minmax(0, 1fr))",
                        md: "repeat(5, minmax(0, 1fr))",
                      },
                      gap: 2,
                    }}
                  >
                    {forecast.map((day) => (
                      <Paper
                        key={day.date}
                        elevation={0}
                        sx={{
                          ...glassCard,
                          p: 2,
                          borderRadius: 3,
                          textAlign: "center",
                          transition:
                            "transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            borderColor: accentColor,
                            bgcolor: "rgba(30, 41, 59, 0.94)",
                          },
                        }}
                      >
                        <Typography
                          fontWeight={700}
                          sx={{ color: "#F8FAFC" }}
                        >
                          {day.dayName}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{ color: mutedText }}
                        >
                          {day.formattedDate}
                        </Typography>

                        <Box sx={{ my: 1 }}>
                          <img
                            src={`${ICON_URL}/${day.icon}@2x.png`}
                            alt={day.condition}
                            width="60"
                            height="60"
                          />
                        </Box>

                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{ color: accentColor }}
                        >
                          {day.temp}°C
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: mutedText,
                            textTransform: "capitalize",
                            mt: 0.5,
                          }}
                        >
                          {day.condition}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </motion.div>
              )}
            </motion.div>
          )}
        </Container>
      </Box>
    </>
  );
}

function WeatherDetail({ icon, title, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "rgba(30, 41, 59, 0.85)",
        color: "#F8FAFC",
        border: "1px solid rgba(103, 232, 249, 0.15)",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor: "rgba(103,232,249,0.6)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        {icon}

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ color: "#CBD5E1" }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: "#F8FAFC" }}
          >
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Weather;
