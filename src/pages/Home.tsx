import './Home.css'
import gif from '/HomeAssets/Project.gif'
import mail from '/HomeAssets/mail.png'
import linkedin from '/HomeAssets/linkedin.png'
import git from '/HomeAssets/git.png'
import headshot from '/HomeAssets/headshot.png'
import { useState } from "react";
import send from '/HomeAssets/send.png';
import headshot2 from '/HomeAssets/headshot2.png'
import Timeline from '../components/TimelineSlider'
import emailjs from '@emailjs/browser';
import FunFacts from './FunFacts';

function App() {

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [showSent, setShowSent] = useState(false);
  

  const handleTalkClick = () => {
    setShowForm(!showForm);
    setShowSent(false);
  };

  const handleSendClick = () => {
    emailjs.send('service_n8egudu', 'template_f0esv7l', {
      name: email,
      email: email,
      message: body,
      title: 'Contact Form'
    }, 'Bkzl1-q82jUL06M_y')
    .then((result) => {
      console.log('Email sent successfully!', result.text);
      setShowSent(true);
      setShowForm(false);
    })
    .catch((error) => {
      console.log('Email failed:', error.text);
    });
  }
  
  return (
    <>   
  
  {/*HOME PAGE*/}
  <div className="home-container">
  <div className="left-side">
    <h1>
      The Shirley <span className="highlight">Project</span>
    </h1>
    <h3>Hello! I am Shirley Huang!</h3>
    <div className="icons">
      <a href = "mailto:ShirleyHuang7@hotmail.com"><img src={mail} alt="Mail"/> </a> 
      <a href = "https://www.linkedin.com/in/shirleyh11/"><img src={linkedin} alt="LinkedIn" /> </a>
      <a href = "https://github.com/Shirly8"> <img src={git} alt="GitHub" /> </a>
    </div>
  </div>

    <div className="right-side">
      <img src={gif} style = {{width: "75%"}} alt="GIF" />
    </div>
    </div>


    {/*ABOUT SECTION*/}
    <div className="container3">
    
    <div className="left-side">
      <img src = {headshot} className="profile-image"></img>

    </div>


    <div
        className="right-side">

      <h2>Customer-Oriented Developer <span className="highlight">By Heart</span></h2>
        <h3 style = {{fontSize: "15px"}}>
          <strong>📍 Toronto, Ontario </strong> <br></br>
          <strong>💻 Computer Science + Business Minor</strong>  <br></br>
          <strong>✏️ 3C's - Creative/Committed/Curious</strong>
          <br />
        <div style = {{marginTop: "15px"}}> Software Developer passionate about building user-centric solutions that merges innovative technology with exceptional experience. </div>
        </h3>
  

        <div className="boxes">
          <div className="box">
            <h3 className = "boxheading">Programming</h3>
            <p className = "boxtext">
              JavaScript, TypeScript, Python, SQL, MongoDB, C, C++, Java, Node.js,
              Express.js, Angular, React, HTML, CSS, SPFx, ASP.NET
            </p>
          </div>
          <div className="box">
            <h3 className = "boxheading">Business</h3>
            <p className = "boxtext">Project Management, Agile Development, Strategic Planning</p>
          </div>
          <div className="box">
            <h3 className = "boxheading">Digital</h3>
            <p className = "boxtext">Adobe Photoshop, Figma, Google Analytics, SEMRush, Shopify, WordPress</p>
          </div>
        </div>
    </div>

    {/* */}
    </div>


    <div>
          <Timeline/>
      </div>


    <div>
      <FunFacts/>
    </div>


    <div className = "container2">
    
<div className="iframe-wrapper">
  <iframe
    loading="lazy"
    src="https://www.canva.com/design/DAGFPbHd8vU/OOI0WAeYvV7EdlEv0J_FPA/view?embed"
    className="canva-embed">
  </iframe>
</div>

      </div>

      

  

    <div className="container3">
      
    <div className="left-side">
        <div className="title-section">
          <h1>Thank you!</h1>
          <h2>Just glad you're here:</h2>
        </div>
        <div className="button-section">
          <button onClick={handleTalkClick}>Let's Talk</button>
          {showForm && (
          <div className="form-section">
            <label>
              Email:
              <input type="text" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address" />
            </label>
            <label>
              Body:
              <textarea value = {body} onChange={(e) => setBody(e.target.value)} placeholder="Enter your message"></textarea>
            </label>
            <div className="send-button-container">
            <img src = {send} className="send-button" onClick={handleSendClick}></img>
            </div>

          </div>
        )}

        {showSent && (
          <div className="sent-section">
            <p style = {{fontSize: "13px"}}>Email sent successfully!</p>
          </div>
        )}

         <a className = "buttons" href = "https://www.linkedin.com/in/shirleyh11/edit/forms/next-action/after-connect-update-profile/"> <button className = "buttons">Let's Connect</button> </a>
          <a  className = "buttons"  href = "https://github.com/Shirly8"> <button>GitHub</button> </a>
          </div>
        
        <div className="footer-section">
          <h3>Shirley Huang</h3>
          <h4>Developer</h4>
        </div>
      </div>

      <div className="right-side">
        <img src={headshot2} alt="Shirley Huang" className="right-image" />
      </div>

      </div>

      

    </>
  )
}

export default App
