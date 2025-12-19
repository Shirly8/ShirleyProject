import React from "react";
import { useInView } from "react-intersection-observer";
import "./About.css";

const About: React.FC = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true });
  const { ref: rightSideRef, inView: rightSideInView } = useInView({ triggerOnce: true });

  
  return (
    <div className="About-container">
      {/* Left Side */}
      <div className="left-side">
        <img src="your-image-src.jpg" alt="Profile" className="profile-image" />
        <h1
          ref={aboutRef}
          className={`rotated-text ${aboutInView ? "animate" : ""}`}
        >
          About
        </h1>
      </div>

      {/* Right Side */}
      <div
        ref={rightSideRef}
        className={`right-side ${rightSideInView ? "animate" : ""}`}
      >
        <h2>Developer</h2>
        <p>
          I build systems that solve problems engineers actually face. I take things apart to see how they really work, then rebuild them better. Currently at Intuit building GitOps tooling, previously worked on fraud detection at RBC and responsible AI at Borealis.
        </p>
        <p>
          Years of presenting ideas and structuring arguments taught me to think about how people actually use what I build. That shows up in how I code, how I design, and how I work with teams. I care about the details that make systems fast, reliable, and actually useful—not just functional. I dig into why something is slow, not just that it's slow.
        </p>

        <div className="boxes">
          <div className="box">
            <h3>Programming</h3>
            <p>
              JavaScript, TypeScript, Python, Go, SQL, MongoDB, C, C++, Java, Node.js,
              Express.js, Angular, React, HTML, CSS, SPFx, ASP.NET
            </p>
          </div>
          <div className="box">
            <h3>Business</h3>
            <p>Project Management, Agile Development, Strategic Planning</p>
          </div>
          <div className="box">
            <h3>Digital</h3>
            <p>Adobe Photoshop, Figma, Google Analytics, SEMRush, Shopify, WordPress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
