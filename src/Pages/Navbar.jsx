import React from 'react'
import "./navbar.css"
import logo from './Website.png'
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
        <div className="left">
            <a href = "/"><img src={logo} width="60" height="60" /></a>
            <h1>
                LaunchPad
            </h1>
        </div>
        <div className="right">
            <a href = "/"><button component = {Link} className = "signin">About</button></a>
            <a href = "/faq"><button component = {Link} className = "signin">FAQ</button></a>
            <a href = "/sponsors"><button component = {Link} className = "signin">Sponsors</button></a>
            <a href = "/team"><button component = {Link} className = "signin">Team</button></a>
            <a href = "/contact"><button component = {Link} className = "signin">Contact</button></a>
        </div>
    </div>
  )
}
