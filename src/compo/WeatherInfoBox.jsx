import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import WeatherDetail from "./WeatherDetail";

const ICON_URL = "https://openweathermap.org/img/wn";
const accentColor = "#67E8F9";
const mutedText = "#CBD5E1";

const defaultGlassCard = {
  bgcolor: "rgba(15, 23, 42, 0.82)",
  color: "#F8FAFC",
  border: "1px solid rgba(148,163,184,0.22)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
};

export default function WeatherInfoBox({
  weather,
  forecast = [],
  glassCard = defaultGlassCard,
}) {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      {/* Main weather card */}
      <Card
        sx={{
          ...glassCard,
          width: "100%",
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            "&:last-child": {
              pb: { xs: 2, sm: 3, md: 4 },
            },
          }}
        >
          {/* Location and condition */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            {/* Location */}
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
              spacing={1.5}
              sx={{ minWidth: 0 }}
            >
              <LocationOnIcon
                sx={{
                  color: accentColor,
                  fontSize: 30,
                  mt: 0.5,
                  flexShrink: 0,
                }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    lineHeight: 1.2,
                    overflowWrap: "anywhere",
                  }}
                >
                  {weather.city}
                </Typography>

                <Typography
                  sx={{
                    ml: 0.25,
                    mt: 0.5,
                    color: mutedText,
                    lineHeight: 1.4,
                  }}
                >
                  {weather.country}
                </Typography>
              </Box>
            </Stack>

            {/* Weather condition badge */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{
                bgcolor: "rgba(103,232,249,0.10)",
                border: "1px solid rgba(103,232,249,0.2)",
                px: 2,
                py: 1,
                minHeight: 64,
                borderRadius: 4,
                flexShrink: 0,
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <Box
                component="img"
                src={`${ICON_URL}/${weather.icon}.png`}
                alt={weather.condition}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  display: "block",
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  color: accentColor,
                  textTransform: "capitalize",
                  lineHeight: 1.3,
                  pt: 1.5,
                }}
              >
                {weather.condition}
              </Typography>
            </Stack>
          </Stack>

          {/* Divider */}
          <Divider
            sx={{
              my: 3,
              borderColor: "rgba(148,163,184,0.2)",
            }}
          />

          {/* Current temperature */}
          <Box>
            <Typography
              variant="h1"
              fontWeight={700}
              sx={{
                fontSize: { xs: "3.5rem", sm: "4.5rem", md: "6rem" },
                lineHeight: 1.1,
                letterSpacing: { xs: "-2px", md: "-3px" },
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
              }}
            >
              Current temperature
            </Typography>
          </Box>

          {/* Weather detail cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 1.5, md: 2 },
              mt: 3,
              width: "100%",
              alignItems: "stretch",
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

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <Box sx={{ width: "100%" }}>
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
              gap: { xs: 1.5, md: 2 },
              width: "100%",
            }}
          >
            {forecast.map((day) => (
              <Paper
                key={day.date}
                elevation={0}
                sx={{
                  ...glassCard,
                  p: { xs: 1.5, md: 2 },
                  minWidth: 0,
                  boxSizing: "border-box",
                  borderRadius: 3,
                  textAlign: "center",
                  transition:
                    "transform 0.25s ease, border-color 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: accentColor,
                  },
                }}
              >
                <Typography fontWeight={700}>
                  {day.dayName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: mutedText }}
                >
                  {day.formattedDate}
                </Typography>

                <Box
                  component="img"
                  src={`${ICON_URL}/${day.icon}@2x.png`}
                  alt={day.condition}
                  sx={{
                    display: "block",
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    mx: "auto",
                    my: 1,
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    color: accentColor,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  {day.temp}°C
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: mutedText,
                    textTransform: "capitalize",
                    mt: 0.5,
                    overflowWrap: "anywhere",
                  }}
                >
                  {day.condition}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </motion.div>
  );
}