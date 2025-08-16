import './App.css';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Faq from './Pages/FAQ/Faq';
import Sponsors from './Pages/Sponsors/Sponsors';
import Team from './Pages/Team/Team';
import Received from './Pages/Received/Received';
import { HashRouter, Routes, Route } from "react-router-dom";

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
    <HashRouter basename='/'>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
          <Route path="/received" element={<Received />} />
        </Routes>
        <Footer />
        {/* {timeout} */}
        {/* When we are not recruiting, comment out the a tag below */}
        {/*
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfTeYyi77Bi0RGDXG8SuAam0bVOhFkDJ2fon0nw5pNKoyjMwQ/viewform?usp=sf_link' target="_blank"><button className='apply'><NotificationsIcon className='notificationBell' />Fill out the Mentor application form!</button></a>
        */}
        {/*      ^^^Enter link to the application form here */}
      </div>
    </HashRouter>
  );
}

export default App;
