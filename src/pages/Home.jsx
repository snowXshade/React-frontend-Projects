
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CodeIcon from "@mui/icons-material/Code";

const projects = [
  {
    id: 1,
    title: "Weather App",
    description:
      "Check current weather conditions, temperature, humidity, wind speed, and a 5-day forecast for your city.",
    status: "Completed",
    type: "Weather Dashboard",
    icon: <CloudOutlinedIcon sx={{ fontSize: 38 }} />,
    gradient: "linear-gradient(135deg, #164e63, #2563eb)",
    technologies: [
      "React",
      "Material UI",
      "Framer Motion",
      "OpenWeather API",
    ],
    route: "/weather",
    disabled: false,
  },
  {
    id: 2,
    title: "Zerodha Clone",
    description:
      "A responsive frontend inspired by Zerodha, featuring a clean trading-platform layout. Currently in development.",
    status: "Coming Soon",
    type: "Finance UI",
    icon: <ShowChartIcon sx={{ fontSize: 38 }} />,
    gradient: "linear-gradient(135deg, #334155, #4f46e5)",
    technologies: ["React", "Material UI", "Responsive Design"],
    route: "/zorodha",
    disabled: true,
  },
];

function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "transparent",
        color: "#f8fafc",
        py: { xs: 7, md: 12 },
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: { xs: 6, md: 8 } }}>
            <Chip
              icon={<CodeIcon />}
              label="PROJECTS"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",
                color: "#67e8f9",
                borderColor: "rgba(103,232,249,0.35)",
                bgcolor: "rgba(103,232,249,0.07)",
                "& .MuiChip-icon": { color: "#67e8f9" },
                letterSpacing: 1,
                fontWeight: 600,
              }}
            />

            <Typography
              variant="h1"
              sx={{
                maxWidth: 850,
                fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.055em",
              }}
            >
              My React
              <Box
                component="span"
                sx={{
                  display: "block",
                  background:
                    "linear-gradient(90deg, #67e8f9, #818cf8, #c084fc)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Frontend Projects.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                color: "#cbd5e1",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.8,
              }}
            >
              A collection of projects built while exploring React,
              modern UI design, APIs, animations, and responsive layouts.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
              <Chip
                label="React"
                size="small"
                sx={{
                  color: "#bae6fd",
                  bgcolor: "rgba(14,165,233,0.12)",
                }}
              />
              <Chip
                label="Material UI"
                size="small"
                sx={{
                  color: "#c7d2fe",
                  bgcolor: "rgba(99,102,241,0.12)",
                }}
              />
              <Chip
                label="Responsive UI"
                size="small"
                sx={{
                  color: "#ddd6fe",
                  bgcolor: "rgba(139,92,246,0.12)",
                }}
              />
            </Stack>
          </Stack>
        </motion.div>

        {/* Projects heading */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              Featured Projects
            </Typography>

            <Typography sx={{ color: "#94a3b8", mt: 0.5 }}>
              Things I've built and what I'm working on.
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#67e8f9",
              fontSize: "0.85rem",
              display: { xs: "none", sm: "block" },
            }}
          >
            02 PROJECTS
          </Typography>
        </Stack>

        {/* Project cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {projects.map((project, index) => (
            <Box
              key={project.id}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: 4,
                  color: "#f8fafc",
                  bgcolor: "rgba(15,23,42,0.78)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  transition:
                    "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: project.disabled
                      ? "rgba(148,163,184,0.35)"
                      : "rgba(103,232,249,0.55)",
                    boxShadow: project.disabled
                      ? "0 12px 30px rgba(0,0,0,0.12)"
                      : "0 12px 35px rgba(8,145,178,0.12)",
                  },
                }}
              >
                {/* Card visual header */}
                <Box
                  sx={{
                    minHeight: 145,
                    p: 3,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    background: project.gradient,
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      right: -55,
                      bottom: -105,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.13)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {project.icon}
                  </Box>

                  <Chip
                    label={project.status}
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: project.disabled
                        ? "rgba(15,23,42,0.45)"
                        : "rgba(15,23,42,0.35)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Card content */}
                <CardContent
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    "&:last-child": { pb: 3 },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#67e8f9",
                      letterSpacing: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    {project.type}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mt: 0.5, mb: 1.5 }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      lineHeight: 1.8,
                      fontSize: "0.94rem",
                      mb: 3,
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: 1,
                      mb: 1.5,
                    }}
                  >
                    BUILT WITH
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ mb: 3 }}
                  >
                    {project.technologies.map((technology) => (
                      <Chip
                        key={technology}
                        label={technology}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "#e2e8f0",
                          borderColor: "rgba(148,163,184,0.3)",
                          bgcolor: "rgba(255,255,255,0.025)",
                          fontSize: "0.73rem",
                        }}
                      />
                    ))}
                  </Stack>

                  <Button
                    component={project.disabled ? "button" : Link}
                    to={project.disabled ? undefined : project.route}
                    variant="contained"
                    disabled={project.disabled}
                    endIcon={
                      project.disabled ? null : <ArrowOutwardIcon />
                    }
                    fullWidth
                    sx={{
                      py: 1.2,
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#082f49",
                      background:
                        "linear-gradient(90deg, #67e8f9, #38bdf8)",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #a5f3fc, #67e8f9)",
                      },
                      "&.Mui-disabled": {
                        color: "#94a3b8",
                        bgcolor: "rgba(71,85,105,0.3)",
                        backgroundImage: "none",
                        border: "1px solid rgba(148,163,184,0.18)",
                      },
                    }}
                  >
                    {project.disabled ? "Coming Soon" : "Explore Project"}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: { xs: 7, md: 10 },
            pt: 3,
            borderTop: "1px solid rgba(148,163,184,0.18)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
            Built with React · Designed to keep learning.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
