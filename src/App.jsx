
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Weather from "./pages/Weather";
// import Zorodha from "./Pages/Zorodha";

import Particles from "./compo/Particles";

function App() {
  return (
    <>
      <Particles />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        {/* <Route path="/zorodha" element={<Zorodha />} /> */}
      </Routes>
    </>
  );
}

export default App;
