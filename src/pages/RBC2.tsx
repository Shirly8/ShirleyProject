import './RBC.css';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';

const App: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="rbc-container rbc-container-reverse" style = {{paddingBottom: "50px"}}>
      <ImageModal isOpen={expandedImage !== null} imageSrc={expandedImage || ''} onClose={() => setExpandedImage(null)} />
        {/* Left Side */}
      <div className="rbc-left-side">
        <h1 style={{color: "#1d62c3"}}>RBC</h1>
        <h2 style={{color: "#1d62c3"}}>2023 - Workforce Management</h2>
        <p>
        Built SharePoint workforce hub for 1,000+ call-center advisors. Automated scheduling that used to take managers 2-3 days per cycle.
        </p>

        <div className = "image">
          <img
          className = "laptop-image"
          src = "/shift.png"
          onClick={() => setExpandedImage('/shift.png')}
          style = {{
            width: "80%",
            padding: "5%",
            cursor: "pointer"
            }}></img>
        </div>

        <h3>Auto-Scheduler</h3>
        <p>
          Built 30+ custom SharePoint pages with SPFx Web Parts. Pulled Outlook calendars via Microsoft Graph, applied shift rules, generated rotation schedules. Turned spreadsheet chaos into one-click assignments.
        </p>

        <h3>Call-Volume Forecasting</h3>
        <p>
          Analyzed historical patterns in Python to predict surge hours. Built ETL pipeline pulling metrics from internal systems into PostgreSQL, visualized in Tableau. Managers stopped guessing coverage needs.
        </p>
      
      
      </div>

      {/* Right Side */}
      <div className="rbc-right-side">
        <img
          src="/sharepoint.png"
          alt="AI Payment Solution"
          className="rbc-sharepoint-image"
          onClick={() => setExpandedImage('/sharepoint.png')}
        />
      </div>
    </div>
  );
};

export default App;
