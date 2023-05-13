import React from 'react'
import "./contact.css"

export default function Contact() {
  return (
    <div className="contact">
      <h1 className="contact_title">Contact Us!</h1>
      <div className="top_wrapper">
        <h2 className="contact_title">Fill out the form or email: launchpadpurdue@gmail.com</h2>
      </div>

        <iframe
        src="https://c74ugo6c9ml.typeform.com/to/CjwKajSD"
        width="100%"
        height="80%"
        allow="fullscreen; accelerometer; gyroscope; picture-in-picture"
        className='contact_form'
      ></iframe>
    </div>
  )
}
