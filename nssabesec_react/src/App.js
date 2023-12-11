import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import Error from "./components/error/Error.jsx";
import Home from "./components/home/Home.jsx";
import Team from "./components/team/Team.jsx";
import Events from "./components/event/Event.jsx";
import Gallery from "./components/gallery/Gallery.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
