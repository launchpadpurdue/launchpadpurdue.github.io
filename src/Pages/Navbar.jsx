import React from 'react'
import "./navbar.css"
import logo from './LaunchPad Icon.png'
import { Link } from "react-router-dom";

export default function Navbar() {
  var activity = "active";

  const toggleNavClass = () => {
    var navRightElement = document.getElementById("navRight");
    navRightElement.classList.toggle("active");
    var burgerElement = document.getElementById("burger");
    burgerElement.classList.toggle("toggle");
  }

  return (
    <nav>
      <div className="mobile">

        <div className="navLeft">
          <div><a href="/"><img src={logo} /></a></div>
          <div><a href="/"><h1><span style={{ color: '#FF5600' }}>Launch</span><span style={{ color: '#0095f4' }}>Pad</span></h1></a></div>
        </div>

        <a id="burger" onClick={toggleNavClass} className="toggle-button burger burgerinitial">
          <span className="bar line1"></span>
          <span className="bar line2"></span>
          <span className="bar line3"></span>
        </a>

      </div>


      <div id="navRight" className="navRight">
        <ul>
          <li><a href="/about"><button component={Link} className="signin">About</button></a></li>
          <li><a href="/faq"><button component={Link} className="signin">FAQ</button></a></li>
          <li><a href="/sponsors"><button component={Link} className="signin">Sponsors</button></a></li>
          <li><a href="/team"><button component={Link} className="signin">Team</button></a></li>
          <li><a href="/contact"><button component={Link} className="signin">Contact</button></a></li>
        </ul>
      </div>
    </nav>
  )
}
