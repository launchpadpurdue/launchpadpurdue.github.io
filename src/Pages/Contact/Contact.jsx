import React from 'react'
import "./contact.css"
import formimage from './formimage.jpg';

export default function Contact() {

  document.title = "Contact Us - LaunchPad";

  return (
    <div className="contact pageContainer">
      <div className="headers">
        <h1 className="contact_title">Contact Us!</h1>
        <p className="contactHeader">Fill out the form below or email <a href='mailto:launchpadpurdue@gmail.com'>launchpadpurdue@gmail.com</a>.</p>
      </div>
      <div className="formContainer" data-aos="flip-left">
        <div className="formImage">
          <img src={formimage} className="pic" alt="" />
        </div>
        <div className="actualForm">
          <form onsubmit="setTimeout(cleareverything, 10);" action="https://formsubmit.co/launchpadpurdue@gmail.com" method="POST">

            <input type="hidden" name="_subject" value="LaunchPad Contact Form Submission" />
            <input type="hidden" name="_next" value="https://launchpadpurdue.github.io/received" />

            <label for="fname">Full Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Enter your name" required />

            <label for="email">Email Address</label>
            <input type="email" id="lname" name="email" placeholder="Enter your email" required />

            <label for="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write your message here." required></textarea>

            <input type="submit" value="Submit" />

          </form>
        </div>
      </div>
    </div>
  )
}
