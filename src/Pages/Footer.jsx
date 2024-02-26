import React from 'react'
import "./footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Navbar() {

  return (
    <div className="footer">
      <p>Copyright 2024 ┃ LaunchPad ┃ All rights reserved.</p>
      <div className='socials'>
        <a className='instagram' href="https://www.instagram.com/launchpadpurdue/" target="_blank"><InstagramIcon /></a>
        <a className='linkedIn' href="https://www.linkedin.com/company/launchpad-purdue-university/" target="_blank"><LinkedInIcon /></a>
        <a className='email' href="mailto:launchpadpurdue@gmail.com" target="_blank"><EmailIcon /></a>
      </div>
    </div>
  )
}
