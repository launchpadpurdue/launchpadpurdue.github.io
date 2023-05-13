import './App.css';
import { useState } from 'react';
import Navbar from './Pages/Navbar';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Faq from './Pages/FAQ/Faq';
import Sponsors from './Pages/Sponsors/Sponsors';
import Team from './Pages/Team/Team';
import {FaBell} from "react-icons/fa"
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [buttonText, setButtonText] = useState("Apply to be a LaunchPad Mentee!")

  const mouseOver = () => {
    setButtonText("Apply to be a LaunchPad Mentee!");
  }

  const mouseOut = () => {
    setButtonText(<FaBell></FaBell>);
  }

  const timeout = setTimeout(function() {
    setButtonText(<FaBell></FaBell>)
  }, 3000);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<About/>}/>
          <Route path = "/contact" element = {<Contact/>}/>
          <Route path = "/faq" element={<Faq/>} />
          <Route path = "/sponsors" element = {<Sponsors/>}/>
          <Route path = "/team" element = {<Team/>}/>
        </Routes>
        {/* {timeout} */}
        <a href='https://google.com' target="_blank"><button onMouseOver={mouseOver} onMouseOut={mouseOut} className='apply'>{buttonText}</button></a>
        {/*      ^^^Enter link to the application form here */}
      </div>
    </BrowserRouter>
  );
}

export default App;
