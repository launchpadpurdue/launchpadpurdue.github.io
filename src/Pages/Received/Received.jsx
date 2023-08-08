import React from 'react'
import "./received.css"

export default function Contact() {
  
  document.title = "Received - LaunchPad";

  return (
    <div className="received pageContainer">
      <h1>Thank you for contacting us!</h1>
      <p>We have received your message. Expect to hear back within the next few days.</p>
      <a href="/"><button>Back to home page</button></a>

    </div>
  )
}
