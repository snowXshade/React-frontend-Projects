import { useState } from "react";
import { motion } from "framer-motion";

import WeatherIntro from "../compo/WeatherIntro";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

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


function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // OpenWeather current weather API
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      console.log("Request URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found.");
        }

        if (response.status === 401) {
          throw new Error("Invalid API key.");
        }

        throw new Error("Unable to fetch weather data.");
      }

      const data = await response.json();

      console.log("OpenWeather response:", data);

      // Convert OpenWeather response
      // into the structure used by our UI
      const weatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };

      setWeather(weatherData);
    } catch (error) {
      console.error(error);
      setError(error.message);
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
      {/* Intro */}
      {showIntro && (
        <WeatherIntro
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Main Page */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
          py: 6,
        }}
      >
        <Container maxWidth="lg">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack
              spacing={1}
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  fontSize: {
                    xs: "2.3rem",
                    md: "3.5rem",
                  },
                }}
              >
                Weather App
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
              >
                Check today's weather
              </Typography>
            </Stack>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                maxWidth: 650,
                margin: "0 auto",
                padding: 2,
                marginBottom: 4,
                borderRadius: 3,
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={1.5}
              >
                <TextField
                  fullWidth
                  label="City"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={searchWeather}
                  sx={{
                    minWidth: {
                      xs: "100%",
                      sm: 130,
                    },
                  }}
                >
                  Search
                </Button>
              </Stack>
            </Paper>
          </motion.div>

          {/* Error */}
          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ mb: 3 }}
            >
              {error}
            </Typography>
          )}

          {/* Loading */}
          {loading && (
            <Stack
              alignItems="center"
              spacing={2}
              sx={{ mt: 6 }}
            >
              <CircularProgress />

              <Typography color="text.secondary">
                Fetching weather...
              </Typography>
            </Stack>
          )}

          {/* Weather Result */}
          {!loading && weather && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <Card
                elevation={3}
                sx={{
                  borderRadius: 4,
                }}
              >
                <CardContent
                  sx={{
                    p: {
                      xs: 3,
                      md: 4,
                    },
                  }}
                >

                  {/* Location + Condition */}
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    justifyContent="space-between"
                    alignItems={{
                      xs: "flex-start",
                      sm: "center",
                    }}
                    spacing={2}
                  >

                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <LocationOnIcon color="primary" />

                        <Typography
                          variant="h4"
                          fontWeight={600}
                        >
                          {weather.city}
                        </Typography>
                      </Stack>

                      <Typography
                        color="text.secondary"
                        sx={{ ml: 4 }}
                      >
                        {weather.country}
                      </Typography>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 5,
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                      }}
                    >
                      <Typography fontWeight={500}>
                        {weather.condition}
                      </Typography>
                    </Paper>

                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  {/* Temperature */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                  >
                    <Typography
                      variant="h1"
                      fontWeight={600}
                      sx={{
                        fontSize: {
                          xs: "4rem",
                          md: "6rem",
                        },
                      }}
                    >
                      {weather.temperature}°C
                    </Typography>
                  </motion.div>

                  {/* Details */}
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    sx={{ mt: 3 }}
                  >

                    <WeatherDetail
                      icon={<DeviceThermostatIcon />}
                      title="Feels Like"
                      value={`${weather.feelsLike}°C`}
                    />

                    <WeatherDetail
                      icon={<WaterDropIcon />}
                      title="Humidity"
                      value={`${weather.humidity}%`}
                    />

                    <WeatherDetail
                      icon={<AirIcon />}
                      title="Wind"
                      value={`${weather.wind} m/s`}
                    />

                  </Stack>

                </CardContent>
              </Card>
            </motion.div>
          )}

        </Container>
      </Box>
    </>
  );
}

/* Reusable Weather Detail */

function WeatherDetail({ icon, title, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 3,
        backgroundColor: "#f8fafc",
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
      >
        {icon}

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={600}
          >
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Weather;