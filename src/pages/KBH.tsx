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
          <h3 className="kbh-heading">Website & Growth</h3>
          <p className="kbh-paragraph">
           Built <a href="https://www.KayBlairHospice.ca" target="_blank" rel="noopener noreferrer" className="kbh-link">www.KayBlairHospice.ca</a> — analyzed funnel with Google Analytics, found 3-click friction killing conversions. Migrated to DonorPerfect with embedded forms and hit <strong>12K visits in first 5 months</strong>. Ran SEO optimization and grew newsletter via Constant Contact segmentation.
          </p>
        </div>
        <div className="kbh-bottom">
          <h3 className="kbh-heading">Partnerships</h3>
          <p className="kbh-paragraph">
            Secured partnerships with City of Brampton, Tim Hortons Smile Cookie Campaign, and Ontario Trillium Foundation. Led TMU architecture student collaboration for building renders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
