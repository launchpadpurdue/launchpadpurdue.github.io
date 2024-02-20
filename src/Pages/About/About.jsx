import React, { useState } from 'react'
import "./about.css"
import groupPic from './Group Picture.jpg';
import PeopleIcon from '@mui/icons-material/People';
import TerminalIcon from '@mui/icons-material/Terminal';
import InterestsIcon from '@mui/icons-material/Interests';

export default function About() {

  document.title = "About - LaunchPad";

  return (
    <div className="about pageContainer">
      <div className="ourMission">
        <h1>We are <span className="title">LaunchPad</span>.</h1>
        <img src={groupPic} alt="" />
        <h2>Our Mission</h2>
        <p>LaunchPad is a community of computer science and data science students at Purdue University dedicated to learning, building, and growing together. We provide a one-on-one, semester-long mentorship program to help freshmen students hit the ground running. We pair each incoming student with a talented upperclassman mentor who will introduce them to the CS/DS community at Purdue and guide them in creating a technical project of their choosing.
          <br /><br />
          Throughout the semester, we host events to foster a sense of community and build technical skills. Our goal is to ensure that every incoming student is equipped with the knowledge and connections they’ll need to get the most out of their time at Purdue.</p>
      </div>

      <div className="whyUs" data-aos="fade-left">
        <h1>Why Us?</h1>
        <div className="whyColumns">
          <div>
            <PeopleIcon className="icon" />
            <p>Work with a peer mentor specifically matched with you.</p>
          </div>
          <div>
            <TerminalIcon className="icon" />
            <p>Create a functional product with your new coding skills.</p>
          </div>
          <div>
            <InterestsIcon className="icon" />
            <p>Attend social events with a group of like-minded indiviauls (and food!).</p>
          </div>
        </div>
      </div>
      {/* When we are not recruiting, comment out the div below */}
      <div className="applyToday">
        <h3>Are you ready to join us? Fill out the mentee application form!</h3>
        <a href="https://forms.gle/muSebiaceSmsNZar8" target="_blank"><button>Get Started</button></a>
      </div>

    </div>
  )
}







