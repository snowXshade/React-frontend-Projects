import { Box, Paper, Stack, Typography } from "@mui/material";

export default function WeatherDetail({ icon, title, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minWidth: 0,
        minHeight: 108,
        boxSizing: "border-box",
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        bgcolor: "rgba(30,41,59,0.85)",
        color: "#F8FAFC",
        border: "1px solid rgba(103,232,249,0.15)",
        transition:
          "border-color 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor: "rgba(103,232,249,0.6)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 32,
          }}
        >
          {icon}
        </Box>

        {/* Title and value */}
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#CBD5E1",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              lineHeight: 1.5,
              mb: 0.25,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: { xs: "1.15rem", sm: "1.35rem" },
              lineHeight: 1.4,
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}