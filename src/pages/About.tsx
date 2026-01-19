import { useEffect, useRef, useState } from "react";
import "./About.css";

const About = () => {
  const aboutRef = useRef<HTMLHeadingElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const [aboutInView, setAboutInView] = useState(false);
  const [rightSideInView, setRightSideInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === aboutRef.current) {
          setAboutInView(entry.isIntersecting);
        }
        if (entry.target === rightSideRef.current) {
          setRightSideInView(entry.isIntersecting);
        }
      });
    });

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (rightSideRef.current) observer.observe(rightSideRef.current);

    return () => observer.disconnect();
  }, []);

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
          I build things that work. Currently at Intuit building GitOps tooling. Previously worked on fraud detection at RBC and responsible AI at Borealis.
        </p>
        <p>
          I dig into why something is slow, not just that it's slow. I care about the details that make systems fast and reliable. When something doesn't make sense, I figure it out.
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
