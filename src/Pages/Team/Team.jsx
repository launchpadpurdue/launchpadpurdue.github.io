import React from 'react'
import "./team.css"
import linkedinIcon from './linkedinIcon.png'
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
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Team() {
  return (
    <div className='body'>
        <center>
          <br />
          <h1 className='header'>Meet the Team!</h1>
          <br />
        </center>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="2">
            <div class="block">
              <img src={seanlee} alt="Sean Lee" class="image" width="150px"/>
              <div class="exec">
                <div class="text">President</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/seandlee18/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Sean Lee</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={josephlee} alt="Joseph Lee" class="image" width="150px"/>
              <div class="exec">
                <div class="text">Treasurer</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/seohyun-lee-886905174/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Joseph Lee</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={vidyavuppala} alt="Vidya Vuppala" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Lead</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/vidya-vuppala/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Vidya Vuppala</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={ayushimohanty} alt="Ayushi Mohanty" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Lead</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/ayushi-mohanty-20a9181b1/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Ayushi Mohanty</p>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md="2">
            <div class="block">
              <img src={jisookim} alt="Jisoo Kim" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/jisoo-kim-1891991a9/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Jisoo Kim</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={elisemiller} alt="Elise Miller" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/elise-a-miller/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Elise Miller</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={aryanwadhwani} alt="Aryan Wadhwani" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/aryansw/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Aryan Wadhwani</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={ishaanraja} alt="Ishaan Raja" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/ishaan-raja/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Ishaan Raja</p>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md="2">
            <div class="block">
              <img src={joeypowers} alt="Joey Powers" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/joeyjpowers/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Joey Powers</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={rohanpurandare} alt="Rohan Purandare" class="image" width="150px"/>
              <div class="webdev">
                <div class="text">Web Dev Lead</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/rohanpurandare/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Rohan Purandare</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={akshayakumar} alt="Akshaya Kumar" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/akshaya-kumar-/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Akshaya Kumar</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={shrinivasvenkatesan} alt="Shrinivas Venkatesan" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/shrinivas-venkatesan/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Shrinivas Venkatesan</p>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md="2">
            <div class="block">
              <img src={arielledong} alt="Arielle Dong" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/arielle-dong-5a3a2a254/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Arielle Dong</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={dwayneasare} alt="Dwayne Asare" class="image" width="150px"/>
              <div class="webdev">
                <div class="text">Web Dev Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/dasare467/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Dwayne Asare</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={jackjiang} alt="Jack Jiang" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/jack-jiang-17bb17263/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Jack Jiang</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={josephdaugherty} alt="Joseph Daugherty" class="image" width="150px"/>
              <div class="webdev">
                <div class="text">Web Dev Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/joseph-daugherty/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Joseph Daugherty</p>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md="2">
            <div class="block">
              <img src={katelynchen} alt="Katelyn Chen" class="image" width="150px"/>
              <div class="ads">
                <div class="text">Ads/Comm Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/katelynchen12/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Katelyn Chen</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={sanyamehra} alt="Sanya Mehra" class="image" width="150px"/>
              <div class="events">
                <div class="text">Events Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/sanyamehra/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Sanya Mehra</p>
            </Col>
            <Col md="2">
            <div class="block">
              <img src={visvshah} alt="Visv Shah" class="image" width="150px"/>
              <div class="webdev">
                <div class="text">Web Dev Team</div>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/visvshah/" target="_blank"><img src={linkedinIcon} class="linkedin" width="15px"/></a>
            <p className="p">Visv Shah</p>
            </Col>
          </Row>
          <br />
        </Container>
    </div>
  )
}
