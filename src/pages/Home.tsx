import './Home.css'
import gif from '/HomeAssets/Project.gif'
import mail from '/HomeAssets/mail.png'
import linkedin from '/HomeAssets/linkedin.png'
import git from '/HomeAssets/git.png'
import headshot from '/HomeAssets/headshot.png'
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion } from 'framer-motion';
import AuroraHover from '../components/AuroraHover';
import send from '/HomeAssets/send.png';
import headshot2 from '/HomeAssets/headshot2.png'
import emailjs from '@emailjs/browser';
// import FunFacts from './FunFacts';

const TimelineLazy = lazy(() => import('../components/TimelineSlider'));

function App() {

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [showSent, setShowSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  

  const handleTalkClick = () => {
    setShowForm(!showForm);
    setShowSent(false);
  };

  const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

  const handleSendClick = (e?: React.FormEvent) => {
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
    .then((result) => {
      console.log('Email sent successfully!', result.text);
      setShowSent(true);
      setShowForm(false);
    })
    .catch((error) => {
      console.log('Email failed:', error.text);
      setFormError('Failed to send. Please try again later.');
    });
  }
  
  const timelineSentinelRef = useRef<HTMLDivElement | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const el = timelineSentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowTimeline(true);
          io.disconnect();
        }
      })
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const boxContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25, delayChildren: 0.1 }
    }
  } as const;

  const boxItem = {
    hidden: { opacity: 0, x: 120, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] } }
  } as const;

  return (
    <>   
  
  {/*HOME PAGE*/}
  <div className="home-container">
  <div className="left-side">
    <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
      The Shirley <span className="highlight">Project</span>
    </motion.h1>
    <motion.h3 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>Hello! I am Shirley Huang!</motion.h3>
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

      <h2>Customer-Oriented Developer <span className="highlight">By Heart</span></h2>
        <h3 style = {{fontSize: "15px"}}>
          <strong>📍 Toronto, Ontario </strong> <br></br>
          <strong>💻 Computer Science + Business Minor</strong>  <br></br>
          <strong>✏️ 3C's - Creative/Committed/Curious</strong>
          <br />
        <div style = {{marginTop: "15px"}}> Software Developer passionate about building user-centric solutions that merges innovative technology with exceptional experience. </div>
        </h3>
  

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
              JavaScript, TypeScript, Python, SQL, MongoDB, C, C++, Java, Node.js,
              Express.js, Angular, React, HTML, CSS, SPFx, ASP.NET
            </p>
          </motion.div>
          <motion.div className="box" variants={boxItem}>
            <h3 className = "boxheading">Business</h3>
            <p className = "boxtext">Project Management, Agile Development, Strategic Planning</p>
          </motion.div>
          <motion.div className="box" variants={boxItem}>
            <h3 className = "boxheading">Digital</h3>
            <p className = "boxtext">Adobe Photoshop, Figma, Google Analytics, SEMRush, Shopify, WordPress</p>
          </motion.div>
        </motion.div>
    </div>

    {/* */}
    </div>


    <div ref={timelineSentinelRef}>
      {showTimeline && (
        <Suspense fallback={<div style={{ padding: 24, color: 'var(--color-text)' }}>Loading timeline…</div>}>
          <TimelineLazy/>
        </Suspense>
      )}
    </div>


    {/* <div>
      <FunFacts/>
    </div> */}


    <div className = "container2">
    
<div className="iframe-wrapper">
  <iframe
    loading="lazy"
    src="https://www.canva.com/design/DAGFPbHd8vU/OOI0WAeYvV7EdlEv0J_FPA/view?embed"
    className="canva-embed">
  </iframe>
    {/* Desktop-only interactive overlay inside the laptop area (temporarily disabled)
    <div className="laptop-overlay" aria-hidden={false}>
      <iframe
        src="https://wisests.shirleyproject.com/decision-maker"
        title="Interactive project preview"
        tabIndex={-1}
        allow="autoplay; fullscreen"
        className="overlay-embed"
      />
    </div>
    */}
</div>

      </div>

      

  

    <div className="container3">
      
    <div className="left-side">
        <div className="title-section">
          <h1>Thank you!</h1>
          <h2>Just glad you're here:</h2>
        </div>
        <div className="button-section">
          <button onClick={handleTalkClick} aria-expanded={showForm} aria-controls="contact-form">Let's Talk</button>
          {showForm && (
          <form id="contact-form" className="form-section" onSubmit={handleSendClick} noValidate>
            <label>
              Email:
              <input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address" required aria-invalid={!isValidEmail(email) && email !== '' ? 'true' : 'false'} />
            </label>
            <label>
              Message:
              <textarea value = {body} onChange={(e) => setBody(e.target.value)} placeholder="Enter your message" required minLength={5}></textarea>
            </label>
            {formError && <p style={{ color: 'var(--color-brand)', fontSize: '12px', marginTop: '4px' }} role="alert">{formError}</p>}
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

         <a className = "buttons" href = "https://www.linkedin.com/in/shirleyh11/edit/forms/next-action/after-connect-update-profile/"> <button className = "buttons">Let's Connect</button> </a>
          <a  className = "buttons"  href = "https://github.com/Shirly8"> <button>GitHub</button> </a>
          </div>
        
        <div className="footer-section">
          <h3>Shirley Huang</h3>
          <h4>Developer</h4>
        </div>
      </div>

      <div className="right-side">
        <img src={headshot2} loading="lazy" decoding="async" alt="Shirley Huang" className="right-image" />
      </div>

      </div>

      

    </>
  )
}

export default App
