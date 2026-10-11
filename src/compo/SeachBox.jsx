
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({
  city,
  setCity,
  searchWeather,
  loading,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchWeather();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "rgba(15, 23, 42, 0.82)",
        color: "#F8FAFC",
        border: "1px solid rgba(148,163,184,0.22)",
        backdropFilter: "blur(16px)",
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
          disabled={loading}
          onChange={(event) => setCity(event.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#67E8F9",
  },
  "& .MuiOutlinedInput-root": {
    color: "#F8FAFC",
    borderRadius: 2.5,
    backgroundColor: "rgba(2, 6, 23, 0.95)",

    "& fieldset": {
      borderColor: "rgba(148, 163, 184, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "#67E8F9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#67E8F9",
    },

    // Prevent white background after typing/autofill
    "& input": {
      color: "#F8FAFC",
      backgroundColor: "transparent",
      WebkitTextFillColor: "#F8FAFC",
      caretColor: "#67E8F9",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #020617 inset",
      WebkitTextFillColor: "#F8FAFC",
      caretColor: "#67E8F9",
      borderRadius: "inherit",
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
            "&:hover": {
              background:
                "linear-gradient(135deg, #A5F3FC, #67E8F9)",
            },
          }}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
