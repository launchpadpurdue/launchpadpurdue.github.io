import './App.css';
import { useState } from 'react';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Faq from './Pages/FAQ/Faq';
import Sponsors from './Pages/Sponsors/Sponsors';
import Team from './Pages/Team/Team';
import Received from './Pages/Received/Received';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    setTimeout(() => {
      AOS.init();
    }, 120);
    AOS.refresh();
  }, []); // here is a site with info about the aos library: http://michalsnik.github.io/aos/

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
          <Route path="/received" element={<Received />} />
        </Routes>
        <Footer />
        {/* {timeout} */}
        <a href='https://youtu.be/dQw4w9WgXcQ' target="_blank"><button className='apply'><NotificationsIcon className='notificationBell' />Apply to be a LaunchPad Mentee!</button></a>
        {/*      ^^^Enter link to the application form here */}
      </div>
    </BrowserRouter>
  );
}

export default App;
