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
    <div className="rbc-container rbc-container-reverse" style = {{paddingBottom: "30px"}}>
        {/* Left Side */}
      <div className="rbc-left-side">
        <h1 style={{color: "#1d62c3"}}>RBC</h1>
        <h2 style={{color: "#1d62c3"}}>2023 - Workforce Management</h2>
        <p>
        Built full-stack SharePoint solution automating scheduling for call-center managers. Connected to Microsoft apps via <strong>Graph API</strong>.
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

        <h3>What I Built [SPFx, JavaScript, Python]</h3>
        <p>
          <li>20+ page Workforce Hub with custom SPFx Web Parts + Microsoft Graph integration. Auto-scheduler pulls Outlook availability, applies shift rules.</li>
          <li>Shift-Forecasting Module: Analyzed Verint call-volume data with Python, embedded forecasts into SharePoint.</li>
          <li>ETL Pipeline: Verint API → PostgreSQL → Tableau. Built Python scripts with SQL window functions for metrics aggregation.</li>
        </p>

        <div className="rbc-tech-box rbc-tech-box-3d">
          <div className="rbc-text">
          <p>Hub used by <strong>1,000+ call advisors</strong>. Automated ~60 weekly change requests.
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
