import React from 'react'
import "./faq.css"

export default function Faq() {
  return (
    <div className="faq">
        <h1 className='title'> Frequently Asked Questions</h1>
        <div className='all-questions'>
          <div className='question-box'>
          <h2 className='question'> What is LaunchPad? </h2>
          <p className='answer'> LaunchPad is an organization that pairs undergraduate students in Computer Science or Data Science with an upperclassman mentor to network and work on a semester-long, software project.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> Who can join LaunchPad? </h2>
          <p className='answer'> LaunchPad is open to all undergraduate students who are passionate about Computer Science, Data Science, or Artificial Intelligence.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> How do I join LaunchPad? </h2>
          <p className='answer'> You can join LaunchPad by filling out our online application form. We recruit mentees in September and mentors in March.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> What kind of projects can I work on in LaunchPad? </h2>
          <p className='answer'> You can work on any software project! While it may help to have an idea before you start, you can also shift your idea as you learn more about the technologies you use.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> How long is the LaunchPad program?</h2>
          <p className='answer'> LaunchPad is a semester-long program. However, you should feel free to finish/continue your project after Launchpad is concluded.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> How often do LaunchPad mentors and mentees meet? </h2>
          <p className='answer'> Mentors and mentees meet regularly throughout the semester to work on their project. This can be once a week or more depending on the project.</p>
          </div>
          <div className='question-box'>
          <h2 className='question'> What kind of events does LaunchPad organize for mentors and mentees? </h2>
          <p className='answer'> Launchpad hosts a range of events throughout the year. This includes sponsored events exclusively for LaunchPad mentors and mentees, workshops to learn new technologies, hack nights to work on your project, or game nights to just have fun!</p>
          </div>
          
        </div>
    </div>
  )
}
