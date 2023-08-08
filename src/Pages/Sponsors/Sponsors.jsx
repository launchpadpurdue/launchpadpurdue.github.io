import React from 'react'
import "./sponsors.css"
import back from './back.jpg'
import comcast from './comcast.png'
import nthg from './NorthropGrummanLogo.png'
import att from './att.png'
import xtern from './xtern.png'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Sponsors() {

  document.title = "Corporate Sponsors - LaunchPad";

  return (
    <div className='sponsors pageContainer'>

      <h1 className='title'> Corporate Sponsors </h1>
      <img src={back} className="background" alt="" />

      <p>
      LaunchPad is committed to hosting engaging events for our mentors and mentees. A substantial part of these events' success is from the generosity of our corporate sponsors.
        <br /><br />
        Our corporate sponsors help us organize events, provide food, and ensure LaunchPad continues providing fun, free, and educational opportunities for students. LanuchPad sponsors can simultaneously support our work and receive exposure from our knowledgeable students, who are excited by technology's endless possibilities and eager to expand their horizons, among other benefits. Learn more about our sponsorship opportunities in our <a href="https://drive.google.com/file/d/1SLgKCQAMUmMWrkxCraTo-mLFsAD7PvQo/view?usp=sharing" target="_blank">sponsorship packet</a>.
      </p>

      <div className='prev-sponsors' data-aos="flip-up">
        <div className='prev-text'>Past Sponsors</div>

        <div className='sponsorsContainer'>
          <div><a href="https://www.att.com/" target='_blank'>
            <img src={att} className="pic" alt="AT&T Logo" />
          </a></div>
            

          <div><a href="https://corporate.comcast.com/" target='_blank'>
            <img src={comcast} className="pic" alt="Comcast Logo" />
          </a></div>

          <div><a href="https://www.northropgrumman.com/" target='_blank'>
            <img src={nthg} className="pic" alt="Northrop Grumman Logo" />
          </a></div>

          <div><a href="https://techpoint.org/xtern/" target='_blank'>
            <img src={xtern} className="pic" alt="Xtern Logo" />
          </a></div>
        </div>
      </div>

    </div>
  )
}
