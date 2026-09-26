import "./App.css";

// import Zorodha from "./Pages/Zorodha";
import Weather from "./pages/Weather";

import { Routes, Route, Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

function Home() {
  return (
    <div>
      <h1>Main Page</h1>

      <Stack direction="row" spacing={2}>
        {/* <Button
          component={Link}
          to="/zorodha"
          variant="contained"
        >
          Zorodha
        </Button> */}

        <Button
          component={Link}
          to="/weather"
          variant="contained"
        >
          Weather
        </Button>
      </Stack>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/zorodha" element={<Zorodha />} /> */}
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}

export default App;