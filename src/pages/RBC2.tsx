import React, { useState } from 'react';
import './RBC.css';
import sharepoint from  '../../WorkAssets/sharepoint.png'
import shift from '../../WorkAssets/shift.png'

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
        <h2>2023 - Workforce Management (WFM) SharePoint</h2>
        <p>
        A centralized solution for optimizing call center operations and integrating seamlessly with Microsoft Applications via Graph API.
        </p>

        <div className = "image">
          <img 
          className = "laptop-image"
          src = {shift}
          style = {{
            width: "90%",
            padding: "5%"
            }}></img>
        </div>

        <h3>Solution for Call Centres</h3>
        <p>
        Leveraging <strong>SPFx, ASP.NET, and Node.js (JavaScript)</strong>, I built key tools, including:

          <li>Automated Flex Rotational Calendar </li>
          <li>Shift Scheduler & Adherence Monitor</li>
          <li>ETL System Migration (Tableau to Verint)</li>
        </p>

        <div className="rbc-tech-box">
          <div className="rbc-text">
          <p style = {{fontWeight: "bolder"}}> 🚀 Reduced workforce task completion time from 3 days to 2 hours. <br></br>
            🚀 SharePoint site increased usage 3x, serving 1,000+ call advisors!
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
            src={sharepoint}
            alt="AI Payment Solution"
            style = {{
              width: '70%',
            }}
          />
          <div className="rbc-magnifier" style={magnifierStyle}>
            <img
              src={sharepoint}
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
