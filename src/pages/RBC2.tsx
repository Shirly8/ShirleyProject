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
        Call center managers were spending 2-3 days per cycle on manual scheduling coordination—juggling static Excel trackers and disconnected SharePoint forms. Built a SharePoint site that automates the workflow and connects to Microsoft apps via Graph API. The key was understanding their actual process, not just the documentation.
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

          <li>Workforce Management Hub with 12 interactive resource pages using SPFx Web Parts. Auto-scheduling logic pulls real-time availability from Outlook calendars via Microsoft Graph, applies constraint logic, and generates a Flex Rotational Calendar.</li>
          <li>Shift scheduler with adherence monitoring—tracks attendance and flags discrepancies. Integrates with Verint—reverse engineered their undocumented API by watching network requests.</li>
          <li>ETL pipeline that migrates data from Tableau to Verint. Built transformation logic using SQL window functions to aggregate metrics like handle time and sentiment trends.</li>
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
