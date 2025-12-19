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
          <h3 className="kbh-heading">Website</h3>
          <p className="kbh-paragraph">
           <li>Built a clean, accessible site that clearly explains hospice services and makes it easy for families to find information. The challenge was making complex medical information understandable for people who are already stressed.</li> <br></br>
            <li>Optimized for SEO. Researched what families actually search for when looking for hospice care, then structured the content and metadata around those queries. The site ranks high for key hospice-related searches in the GTA. Over <strong>10,000</strong> visitors in 2023, with <strong>40% increase</strong> in contact form submissions.</li>
          </p>
        </div>
        <div className="kbh-bottom">
          <h3 className="kbh-heading">Beyond the Website</h3>
          <p className="kbh-paragraph">
            <li>Led sponsorships and partnerships with City of Brampton, Tim Hortons Smile Cookie Campaign, and Trillium Ontario</li> <br></br>

            <li>Connected with Yew-Thong (Head of Architectural TMU) to get architectural support, saving an estimated $60,000 on the hospice project</li>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
