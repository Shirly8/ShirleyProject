import React, { useState } from 'react';
import './RBC.css';

const App: React.FC = () => {

  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect(); 
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    setMagnifierStyle({
      display: 'block',
      top: `${y}px`,
      left: `${x}px`,
      backgroundPosition: `-${x}px -${y}px`,
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({ display: 'none' });
  };

  return (
    <div className="rbc-container" style = {{paddingBottom: "30px"}}>
        {/* Left Side */}
      <div className="rbc-left-side">
        <h1>RBC</h1>
        <h2>2023 - Workforce Management SharePoint</h2>
        <p>
        Call center managers spent 2-3 days per cycle on manual scheduling. Juggling Excel trackers and disconnected SharePoint forms. Built a SharePoint site that automates the workflow and connects to Microsoft apps via Graph API. Had to understand how they actually worked, not what the docs said.
        </p>

        <div className = "image">
          <img 
          className = "laptop-image"
          src = "/shift.png"
          style = {{
            width: "80%",
            padding: "5%"
            }}></img>
        </div>

        <h3>What I Built</h3>
        <p>
        Used <strong>SPFx, ASP.NET, and Node.js</strong> to build:

          <li>Workforce Management Hub with 12 interactive pages. Auto-scheduling pulls availability from Outlook calendars via Microsoft Graph and generates schedules.</li>
          <li>Shift scheduler tracks attendance and flags discrepancies. Integrates with Verint. Reverse engineered their undocumented API by watching network requests.</li>
          <li>ETL pipeline migrates data from Tableau to Verint. Used SQL window functions to aggregate handle time and sentiment metrics.</li>
        </p>

        <div className="rbc-tech-box">
          <div className="rbc-text">
          <p style = {{fontWeight: "bolder"}}> Managers went from spending days on planning to hours. SharePoint usage tripled because people actually found it useful. Now serves call advisors across multiple teams.
        </p>
          </div>
        </div>
      
      
      </div>

      {/* Right Side */}
      <div className="rbc-right-side">
        <div
          className="rbc-image-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style = {{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            src="/sharepoint.png"
            alt="AI Payment Solution"
            style = {{
              width: '70%',
              marginTop: "-60px"
            }}
          />
          <div className="rbc-magnifier" style={magnifierStyle}>
            <img
              src="/sharepoint.png"
              alt="AI Payment Solution"
              style={{
                position: 'absolute',
                left: `-${magnifierStyle.left}`,
                top: `-${magnifierStyle.top}`,
                transform: 'scale(0.8)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
