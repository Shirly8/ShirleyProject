import './Home.css'
import gif from '/HomeAssets/Project.gif'
import mail from '/HomeAssets/mail.png'
import linkedin from '/HomeAssets/linkedin.png'
import git from '/HomeAssets/git.png'
import headshot from '/HomeAssets/headshot.png'
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from 'framer-motion';
import AuroraHover from '../components/AuroraHover';
import send from '/HomeAssets/send.png';
import headshot2 from '/HomeAssets/headshot2.png'
import emailjs from '@emailjs/browser';
import WorkSection from '../components/WorkSection';
import Sparkles from '../components/Sparkles';
import PortfolioCarousel from '../components/PortfolioCarousel';

const texts = ["Hi! I'm Shirley Huang", "Hi! I'm Bi Yi Huang"];
const baseText = "Hi! I'm ";

function App() {

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [showSent, setShowSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  

  const handleTalkClick = useCallback(() => {
    setShowForm(prev => !prev);
    setShowSent(false);
  }, []);

  const isValidEmail = useCallback((value: string) => /.+@.+\..+/.test(value), []);

  const handleSendClick = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (body.trim().length < 5) {
      setFormError('Message is too short.');
      return;
    }
    emailjs.send('service_n8egudu', 'template_f0esv7l', {
      name: email,
      email: email,
      message: body,
      title: 'Contact Form'
    }, 'Bkzl1-q82jUL06M_y')
    .then(() => {
      setShowSent(true);
      setShowForm(false);
    })
    .catch(() => {
      setFormError('Failed to send. Please try again later.');
    });
  }, [email, body, isValidEmail]);
  

  // Typing animation state
  const [typingText, setTypingText] = useState('Hi! I\'m ');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentIndex];
    const targetText = isDeleting ? baseText : currentFullText;
    const currentLength = typingText.length;

    if (!isDeleting && currentLength < targetText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setTypingText(targetText.slice(0, currentLength + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentLength > baseText.length) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setTypingText(typingText.slice(0, currentLength - 1));
      }, 75);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentLength === targetText.length) {
      // Finished typing, wait then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentLength === baseText.length) {
      // Finished deleting, move to next text
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typingText, isDeleting, currentIndex]);

  // Cursor blink animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const boxContainer = useMemo(() => ({
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25, delayChildren: 0.1 }
    }
  } as const), []);

  const boxItem = useMemo(() => ({
    hidden: { opacity: 0, x: 120, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] } }
  } as const), []);

  return (
    <>

  {/*HOME PAGE*/}
  <div className="home-container">
    <Sparkles intensity="light" />
  <div className="left-side">
    <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
      The Shirley <span className="highlight">Project</span>
    </motion.h1>
    <motion.h3
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ minHeight: '1.5em' }}
    >
      {typingText}
      <span style={{ opacity: showCursor ? 1 : 0, marginLeft: '2px' }}>|</span>
    </motion.h3>
    <motion.div className="icons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
      <a aria-label="Email Shirley" href = "mailto:ShirleyHuang7@hotmail.com"><img loading="lazy" decoding="async" src={mail} alt="Mail"/> </a>
      <a aria-label="Shirley's LinkedIn" rel="noopener noreferrer" target="_blank" href = "https://www.linkedin.com/in/shirleyh11/"><img loading="lazy" decoding="async" src={linkedin} alt="LinkedIn" /> </a>
      <a aria-label="Shirley's GitHub" rel="noopener noreferrer" target="_blank" href = "https://github.com/Shirly8"> <img loading="lazy" decoding="async" src={git} alt="GitHub" /> </a>
    </motion.div>
  </div>

    <div className="right-side">
      <AuroraHover src={gif} alt="Project preview" className="aurora-media" />
    </div>
    </div>


    {/*ABOUT SECTION*/}
    <div className="container3">
    
    <div className="left-side">
      <img src = {headshot} loading="lazy" decoding="async" className="profile-image" alt="Profile" />

    </div>


    <div
        className="right-side">

      <h2><span className="highlight">Product-Oriented</span> Software Engineer</h2>
        <h3 style = {{fontSize: "15px", fontWeight: "300"}}>
          📍 Toronto, Canada <br></br>
          🎓 Carleton University <br></br>
          💻 Computer Science + Business Minor
          <br />
<div style = {{marginTop: "15px", fontWeight: "100"}}> I build software where engineering and design reinforce each other through clean systems, thoughtful UX, and practical features. There's nothing better than watching something I built come together, go live, and solve real problems. </div>        </h3>


        <motion.div
          className="boxes"
          variants={boxContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="box" variants={boxItem}>
            <h3 className = "boxheading">Programming</h3>
            <p className = "boxtext">
              <strong>TypeScript, JavaScript, Python, Java, Go, C#, C/C++, SQL, HTML/CSS</strong>
            </p>
          </motion.div>
          <motion.div className="box" variants={boxItem}>
            <h3 className = "boxheading">Tech</h3>
            <p className = "boxtext">React, Node.js, Flask, PyTorch, Kubernetes, Docker, AWS, Git, PostgreSQL, Redis, Figma, Grafana</p>
          </motion.div>
          <motion.div className="box" variants={boxItem}>
            <h3 className = "boxheading">Edge</h3>
            <p className = "boxtext">End-to-end ownership, rapid iteration, technical storytelling, shipping under ambiguity, ruthless curiosity</p>
          </motion.div>
        </motion.div>
    </div>

    </div>

    <WorkSection showProjectHeader={true} />

    <div className="container2">
      <PortfolioCarousel />
    </div>

    <div className="container3">
      
    <div className="left-side">
        <div className="title-section">
          <h1>Get in <span className="highlight">touch</span></h1>
        </div>
        <div className="button-section">
          <button onClick={handleTalkClick} aria-expanded={showForm} aria-controls="contact-form">Send a message</button>
          {showForm && (
          <form id="contact-form" className="form-section" onSubmit={handleSendClick} noValidate>
            <label htmlFor="email-input">
              Email:
              <input id="email-input" type="email" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address" required aria-invalid={!isValidEmail(email) && email !== '' ? 'true' : 'false'} aria-describedby={formError ? 'form-error' : undefined} />
            </label>
            <label htmlFor="message-input">
              Message:
              <textarea id="message-input" value = {body} onChange={(e) => setBody(e.target.value)} placeholder="Enter your message" required minLength={5}></textarea>
            </label>
            {formError && <p id="form-error" style={{ color: 'var(--color-brand)', fontSize: '12px', marginTop: '4px' }} role="alert">{formError}</p>}
            <div className="send-button-container">
              <button type="submit" className="send-button" disabled={!isValidEmail(email) || body.trim().length < 5}>
                <img src={send} alt="Send" style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </form>
        )}

        {showSent && (
          <div className="sent-section">
            <p style = {{fontSize: "13px"}}>Email sent successfully!</p>
          </div>
        )}

         <a className = "buttons" href = "https://www.linkedin.com/in/shirleyh11/edit/forms/next-action/after-connect-update-profile/"> <button className = "buttons">LinkedIn</button> </a>
          <a  className = "buttons"  href = "https://github.com/Shirly8"> <button>GitHub</button> </a>
          </div>
        
        <div className="footer-section">
          <h3 style={{fontWeight: "300"}}>Shirley Huang</h3>
          <h4 style={{fontWeight: "300"}}>Software Engineer</h4>
        </div>
      </div>

      <div className="right-side">
        <img src={headshot2} loading="lazy" decoding="async" alt="Shirley Huang" className="right-image" />
      </div>

      </div>

      <Sparkles intensity="light" />

    </>
  )
}

export default App
