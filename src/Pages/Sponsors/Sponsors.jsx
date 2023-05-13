import React from 'react'
import "./sponsors.css"
import back from './back.jpg'
import comcast from './comcast.png'
import nthg from './NorthropGrummanLogo.png'
import att from './att.png'
import xtern from './xtern.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Sponsors() {
  return (
   <div className="sponsors">
      <div className='BackgroundImage'>
        <img src={back} className="background" alt="logo" />
      </div>

      <div className='FlipUp'>
        Corporate Sponsors
      </div>

      <div className='Bottom-Half'>
      LaunchPad is committed to hosting engaging events for our Mentors and Mentees. A large part of these events being successful is from the generosity of our corporate sponsors. Our corporate sponsors help us provide food, host events, and much more to make sure LaunchPad is able to be as great as it is. These sponsorships help LaunchPad be as engaging as it can be, while also providing our corporate sponsors an amazing set of knowledgeable students who are eager to expand their horizons with opportunities, among other benefits. More information about our sponsorship opportunities can be found in our <a href="https://drive.google.com/file/d/1SLgKCQAMUmMWrkxCraTo-mLFsAD7PvQo/view?usp=sharing" target="_blank">sponsorship packet</a>
      </div>

      <div className='prev-sponsors'>
        <div className='prev-text'>Previous Sponsors</div>
    
      <Container className='center'>
        <Row>
          <Col md = "3"><img src={att}  className="pic" alt="AT&T Logo" /></Col>

          <Col md = "3"><img src={comcast} className="pic" alt="Comcast Logo" /></Col>

          <Col md = "3"><img src={nthg} className="pic" alt="Northrop Grumman Logo" /></Col>

          <Col md = "3"><img src={xtern} className="pic" alt="Xtern Logo" /></Col>
        </Row>
      </Container>
      </div>
      
   </div>
  )
}
