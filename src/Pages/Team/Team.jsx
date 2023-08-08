import React from 'react'
import "./team.css"
import seanlee from './teampics/seanlee.png'
import josephlee from './teampics/josephlee.png'
import ayushimohanty from './teampics/ayushimohanty.png'
import vidyavuppala from './teampics/vidyavuppala.png'
import jisookim from './teampics/jisookim.png'
import elisemiller from './teampics/elisemiller.png'
import aryanwadhwani from './teampics/aryanwadhwani.png'
import ishaanraja from './teampics/ishaanraja.png'
import joeypowers from './teampics/joeypowers.png'
import rohanpurandare from './teampics/rohanpurandare.png'
import akshayakumar from './teampics/akshayakumar.png'
import shrinivasvenkatesan from './teampics/shrinivasvenkatesan.png'
import dwayneasare from './teampics/dwayneasare.png'
import josephdaugherty from './teampics/josephdaugherty.png'
import visvshah from './teampics/visvshah.png'
import katelynchen from './teampics/katelynchen.jpeg'
import arielledong from './teampics/arielledong.png'
import sanyamehra from './teampics/sanyamehra.png'
import jackjiang from './teampics/jackjiang.png'
import evelynchen from './teampics/evelynchen.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Team() {

  document.title = "Meet the Team - LaunchPad";

  return (
    <div className='team pageContainer'>
      <h1 className='header'>Meet the Team!</h1>
      <h5 className='subheader'>Our team is passionate about providing students with opportunities to explore computer and data science. We ensure LaunchPad runs smoothly and continues thriving.</h5>
      <div className='teamGrid'>
        <div className='profile'>
          <img src={seanlee} alt="Sean Lee" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Sean Lee</h5>
              <p>President</p>
            </div>
            <a href="https://www.linkedin.com/in/seandlee18/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={josephlee} alt="Joseph Lee" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Joseph Lee</h5>
              <p>Treasurer</p>
            </div>
            <a href="https://www.linkedin.com/in/seohyun-lee-886905174/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={vidyavuppala} alt="Vidya Vuppala" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Vidya Vuppala</h5>
              <p>Ads/Comm Lead</p>
            </div>
            <a href="https://www.linkedin.com/in/vidya-vuppala/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={ayushimohanty} alt="Ayushi Mohanty" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Ayushi Mohanty</h5>
              <p>Events Lead</p>
            </div>
            <a href="https://www.linkedin.com/in/ayushi-mohanty-20a9181b1/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={rohanpurandare} alt="Rohan Purandare" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Rohan Purandare</h5>
              <p>Web Dev Lead</p>
            </div>
            <a href="https://www.linkedin.com/in/rohanpurandare/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={akshayakumar} alt="Akshaya Kumar" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Akshaya Kumar</h5>
              <p>Ads/Comm Team</p>
            </div>
            <a href="https://www.linkedin.com/in/akshaya-kumar-/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={arielledong} alt="Arielle Dong" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Arielle Dong</h5>
              <p>Ads/Comm Team</p>
            </div>
            <a href="https://www.linkedin.com/in/arielle-dong-5a3a2a254/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={jisookim} alt="Jisoo Kim" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Jisoo Kim</h5>
              <p>Ads/Comm Team</p>
            </div>
            <a href="https://www.linkedin.com/in/jisoo-kim-1891991a9/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={joeypowers} alt="Joey Powers" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Joey Powers</h5>
              <p>Ads/Comm Team</p>
            </div>
            <a href="https://www.linkedin.com/in/joeyjpowers/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={katelynchen} alt="Katelyn Chen" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Katelyn Chen</h5>
              <p>Ads/Comm Team</p>
            </div>
            <a href="https://www.linkedin.com/in/katelynchen12/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={aryanwadhwani} alt="Aryan Wadhwani" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Aryan Wadhwani</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/aryansw/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={elisemiller} alt="Elise Miller" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Elise Miller</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/elise-a-miller/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={ishaanraja} alt="Ishaan Raja" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Ishaan Raja</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/ishaan-raja/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={jackjiang} alt="Jack Jiang" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Jack Jiang</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/jack-jiang-17bb17263/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={sanyamehra} alt="Sanya Mehra" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Sanya Mehra</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/sanyamehra/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={shrinivasvenkatesan} alt="Shrinivas Venkatesan" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Shrinivas Venkatesan</h5>
              <p>Events Team</p>
            </div>
            <a href="https://www.linkedin.com/in/shrinivas-venkatesan/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={dwayneasare} alt="Dwayne Asare" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Dwayne Asare</h5>
              <p>Web Dev Team</p>
            </div>
            <a href="https://www.linkedin.com/in/dasare467/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={evelynchen} alt="Evelyn Chen" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Evelyn Chen</h5>
              <p>Web Dev Team</p>
            </div>
            <a href="https://www.linkedin.com/in/evelynchen5/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={josephdaugherty} alt="Joseph Daugherty" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Joseph Daugherty</h5>
              <p>Web Dev Team</p>
            </div>
            <a href="https://www.linkedin.com/in/joseph-daugherty/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

        <div className='profile'>
          <img src={visvshah} alt="Visv Shah" className='headshot' />
          <div className='profileDescription'>
            <div>
              <h5>Visv Shah</h5>
              <p>Web Dev Team</p>
            </div>
            <a href="https://www.linkedin.com/in/visvshah/" target="_blank"><LinkedInIcon className="LinkedIn" /></a>
          </div>
        </div>

      </div>
    </div>
  )
}
