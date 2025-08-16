import "./home.css"
import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import gallery1 from './gallery1.jpg';
import gallery2 from './gallery2.jpg';
import gallery3 from './gallery3.jpg';
import bioBoards from './bioboards.png';
import boilerHunt from './boilerhunt.jpeg';
import putMeOn from './putMeOn.png';
import colorPalette from './colorPalette.png';
import githubIcon from './githubIcon.png';
import Stephan from './stephan.jpeg';
import Nilisha from './nilisha.jpg';
import Dev from './dev.jpeg';

export default function Home() {

  var displayZero = "block";
  var displayOne = "none";
  var displayTwo = "none";
  var headerBGColor = "rgba(0, 10, 17, 0.7)";

  const gallery = [
    { id: 1, name: "Picture 1", url: gallery1 },
    { id: 2, name: "Picture 2", url: gallery2 },
    { id: 3, name: "Picture 3", url: gallery3 },
  ]

  const [current, changeCurrent] = useState(0);

  const generateCalendarUrl = (date, title) => {
    const eventDate = new Date(date);
    const dateString = eventDate.toISOString().split('T')[0].replace(/-/g, '');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateString}/${dateString}&details=${encodeURIComponent('LaunchPad Mentee Callout - Learn more about our mentorship program! Time and location details will be provided closer to the event.')}&location=${encodeURIComponent('Purdue University')}`;
    
    return googleCalendarUrl;
  };

  const addToCalendar = (dateStr) => {
    const currentYear = new Date().getFullYear();
    let eventDate;
    
    if (dateStr === 'August 28th') {
      eventDate = `${currentYear}-08-28`;
    } else if (dateStr === 'September 2nd') {
      eventDate = `${currentYear}-09-02`;
    }
    
    const calendarUrl = generateCalendarUrl(eventDate, `LaunchPad Mentee Callout - ${dateStr}`);
    window.open(calendarUrl, '_blank');
  };

  if (current === 0) {
    displayZero = "block";
    displayOne = "none";
    displayTwo = "none";
    headerBGColor = "rgba(0, 10, 17, 0.7)";
  } else if (current === 1) {
    displayZero = "none";
    displayOne = "block";
    displayTwo = "none";
    headerBGColor = "rgba(0, 10, 17, 0.5)";
  } else {
    displayZero = "none";
    displayOne = "none";
    displayTwo = "block";
    headerBGColor = "rgba(0, 10, 17, 0.5)";
  }

  const moveLeft = () => {
    if (current > 0) {
      changeCurrent(current - 1);
    }
    else {
      changeCurrent(2);
    }
  }

  const moveRight = () => {
    if (current < 2) {
      changeCurrent(current + 1);
    }
    else {
      changeCurrent(0);
    }
  }

  return (
    <div className="home">
      <div className="page gallery">
        <ArrowBackIosIcon onClick={moveLeft} className="leftButton" />
        <div className="banner" style={{ backgroundColor: `${headerBGColor}` }}>
          <div className="headerZero" style={{ display: `${displayZero}` }}>
            <h2 className="bannerTitle">LaunchPad</h2>
            <h2 className="bannerHeader">LaunchPad is an organization at Purdue that offers a one-on-one mentorship program, events, and technical project guidance to incoming students, aiming to provide them with the necessary knowledge and connections to thrive during their time here.</h2>
            <div className="calloutBox">
              <div className="calloutContent">
                <h3 className="calloutTitle">Mentee Callouts</h3>
                <p className="calloutSubtitle">Add to your calendar!</p>
                <div className="calloutDates">
                  <button className="date" onClick={() => addToCalendar('August 28th')}>August 28th</button>
                  <span className="separator">&</span>
                  <button className="date" onClick={() => addToCalendar('September 2nd')}>September 2nd</button>
                </div>
              </div>
            </div>
            {/* <a href="https://forms.gle/SHWpxka2bq4numTV8" target="_blank"><button>Apply to be a mentee!</button></a> */}
          </div>
          <div className="headerOne" style={{ display: `${displayOne}` }}>
            <h2 className="bannerHeader">Prior to starting their projects, mentors and mentees meet at our pairing night event to figure out who they would work best with.</h2>
          </div>
          <div className="headerOne" style={{ display: `${displayTwo}` }}>
            <h2 className="bannerHeader">Throughout the semester, we have several events that build a stronger connection between mentors and mentees and also help with projects.</h2>
          </div>
        </div>
        <div className="backgroundSlider" style={{ transform: `translateX(-${current * 100}vw)` }}>
          {gallery.map((item) => (
            <div className="slide">
              <img className="backgroundImg" src={item.url} alt={item.name} />

            </div>

          ))}
        </div>
        <ArrowForwardIosIcon onClick={moveRight} className="rightButton" />
      </div>

      <div className="projects">
        <h1>Past Projects</h1>
        <h5>Throughout the year, mentees and mentors work together to code a functional project.</h5>

        <div className='normalProj odd'>
          <div className="projImageContainer">
            <a href="https://github.com/visvshah/bioboards" target="_blank" rel="noreferrer">
              <img className="projImage" src={bioBoards} alt="Screenshot of BioBoards platform showing custom board creation interface" />
              <div className="centeredOverlay">Visit the Github Repositoty</div>
            </a>
          </div>
          <div className="projDesc">
            <a href="https://github.com/visvshah/bioboards" target="_blank" rel="noreferrer"><img className="github" src={githubIcon} width="30px" alt="GitHub repository link" /></a>
            <h2>Bioboards - <i>Visv Shah</i></h2>
            <p>BioBoards is a platform that allows users to create a custom “board” and share it through a link in their social media bio (similar to Linktree or VSCO).</p>
          </div>
        </div>

        <div className='normalProj even'>
          <div className="projDesc">
            <a href="https://github.com/dasare467/Put-Me-On" target="_blank" rel="noreferrer"><img className="github" src={githubIcon} width="30px" alt="GitHub repository link" /></a>
            <h2>Put Me On - <i>Dwayne Asare</i></h2>
            <p>Put Me On is a web application that allows users to share their Spotify playlists with others, and like each other's playlists. The app is built using React for the frontend and Flask for the backend, and leverages the Spotify API to retrieve playlist details.</p>
          </div>
          <div className="projImageContainer">
            <a href="https://github.com/dasare467/Put-Me-On" target="_blank" rel="noreferrer">
              <img className="projImage" src={putMeOn} alt="Screenshot of Put Me On web application showing Spotify playlist sharing interface" />
              <div className="centeredOverlay">Visit the Github Repositoty</div>
            </a>
          </div>
        </div>

        <div className='normalProj odd'>
          <div className="projImageContainer">
            <a href="https://github.com/PeterS-Kang/BoilerHunt-v2" target="_blank" rel="noreferrer">
              <img className="projImage" src={boilerHunt} alt="Screenshot of BoilerHunt mobile app showing interactive Purdue campus guide" />
              <div className="centeredOverlay">Visit the Github Repositoty</div>
            </a>
          </div>
          <div className="projDesc">
            <a href="https://github.com/PeterS-Kang/BoilerHunt-v2" target="_blank" rel="noreferrer"><img className="github" src={githubIcon} width="30px" alt="GitHub repository link" /></a>
            <h2>Boilerhunt - <i>Peter Kang</i></h2>
            <p>Boilerhunt is an interactive mobile guide of Purdue campus that encourages students to explore campus and go to new places.</p>
          </div>
        </div>

        <div className='normalProj even'>
          <div className="projDesc">
            <a href="https://github.com/njsumi/Playlist-Cover-Generator" target="_blank" rel="noreferrer"><img className="github" src={githubIcon} width="30px" alt="GitHub repository link" /></a>
            <h2>Color Palette - <i>Nina Gruteser</i></h2>
            <p>Color Palette is a website where users can get unique playlist cover images for their playlists. The website takes a Spotify playlist URL and extracts features such as the energy, time signature, tempo, and danceability of the songs.</p>
          </div>

          <div className="projImageContainer">
            <a href="https://github.com/njsumi/Playlist-Cover-Generator" target="_blank" rel="noreferrer">
              <img className="projImage" src={colorPalette} alt="Screenshot of Color Palette website showing playlist cover generation interface" />
              <div className="centeredOverlay">Visit the Github Repositoty</div>
            </a>
          </div>
        </div>

      </div>
      <div className="page testimonialsSection" data-aos="fade-up">
        <h1>Testimonials</h1>
        <h5>Here is what some past mentors and mentees have to say about LaunchPad.</h5>
        <div className="testimonials">
          <div className="testimonial">
            <img src={Dev} alt="Portrait of Dev Patel" />
            <h3>Dev Patel</h3>
            <h5 className="participation"><i>Mentor '24</i></h5>
            <p>Although I never had the chance to be a mentee, I’m grateful I joined Launchpad as a mentor. Mentoring gave me the chance to help my mentee navigate their freshman year more smoothly, sharing advice and tips I wish I had known to make their start in a technical field more rewarding. Launchpad really is what you make of it. Whether you’re a mentor or mentee, the more effort you put in, the more you will grow. Beyond the mentor-mentee connection, it’s a welcoming community where everyone can make connections and learn something new, regardless of experience.</p>
          </div>
          <div className="testimonial">
            <img src={Stephan} alt="Portrait of Stephen Feria" />
            <h3>Stephen Feria</h3>
            <h5 className="participation"><i>Mentee '20, Mentor '21, '22, '23</i></h5>
            <p>LaunchPad has been an exceptional organization that has had a profound impact on me since my freshman year. The absolute best part of LaunchPad, for me, has been the opportunity to immerse myself in various projects.<br /><br />As a mentor, I relished in the chance to contemplate the high-level design decisions that went into my mentees' projects. And as a mentee myself, I experienced the entire design process, from its inception to its completion, while being guided by a talented mentor. In both roles, I derived immense satisfaction from working on diverse projects that spanned across various realms of computer science.</p>
          </div>
          <div className="testimonial">
            <img src={Nilisha} alt="Portrait of Nilisha Bhandari" />
            <h3>Nilisha Bhandari</h3>
            <h5 className="participation"><i>Mentee '21, Mentor '22, '23</i></h5>
            <p>LaunchPad provided me with a valuable experience as a mentee as well as a mentor. As a mentee, I learned new and valuable technical skills, while as a mentor, I had the privilege of sharing my knowledge and experience. I also got the opportunity to network with like-minded people in CS.<br /><br />I highly recommend the LaunchPad program to anyone looking to gain new skills and make meaningful connections!</p>
          </div>
        </div>
      </div>
    </div>
  )
}