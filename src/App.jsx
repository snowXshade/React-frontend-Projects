
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Zerodha from "./pages/Zerodha";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/zerodha" element={<Zerodha />} />
      </Routes>
    </>
  );
}

export default App;