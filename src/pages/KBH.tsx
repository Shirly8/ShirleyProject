import React from "react";
import "./KBH.css";



const Home: React.FC = () => {
  return (
    <div className="kbh-container">
      <div className="kbh-left-side">
        <div className="kbh-top">
          <img src="/kbh2.png" alt="Kay Blair Hospice" className="kbh-image" />
        </div>
        <div className="kbh-bottom">
          <h1 className="kbh-title">Kay Blair Hospice</h1>
          <h2 className="kbh-subtitle">2022 - Web Designer</h2>
          <h2 className = "kbh-subtitle"> 2022-2025 - Volunteer Project Coordinator</h2>
        </div>
      </div>
      <div className="kbh-right-side">
        <div className="kbh-top">
          <img src="/kbh.png" className="kbh-image2" />
        </div>
        <div className="kbh-middle">
          <h3 className="kbh-heading">Built for SEO optimization</h3>
          <p className="kbh-paragraph">
           <li> Implementing user-friendly design, with a strong emphasis on branding and
            accessibility of information.  </li> <br></br>
            <li>Focused heavily on SEO optimization, resulting
            in site placed high in keyword searches and an increase in site traffic,
            generating over <strong>10,000+ </strong> visitors in 2023. </li>
          </p>
        </div>
        <div className="kbh-bottom">
          <h3 className="kbh-heading">MORE THAN JUST DESIGNING WEBSITE...</h3>
          <p className="kbh-paragraph">
            <li>Led sponsorships & partnerships, collaborating with The City of Brampton, Tim Hortons Smile Cookie Campaign, and Trillium Ontario to secure funding. </li> <br></br>

            <li>Major Contribution – Secured support from Yew-Thong (Head of Architectural TMU), achieving an estimated $60,000 cost savings for the hospice project.</li>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
