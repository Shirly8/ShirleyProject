import React, { useState } from 'react';
import './RBC.css';

const App: React.FC = () => {

  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Get image container dimensions
    const x = e.clientX - rect.left; // Mouse X position within the image
    const y = e.clientY - rect.top; // Mouse Y position within the image

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
    <div className="rbc-container"
        style = {{paddingBottom: "50px"}}>

      {/* Left Side */}
      <div className="rbc-left-side">
        <h1 style={{color: "#1d62c3"}}>RBC</h1>
        <h2 style={{color: "#1d62c3"}}>2024 - AI Payment Abuse Detection (POC)</h2>
        <p>
          Worked on POC abuse detection for e-Transfer memos processing <strong>1M+ transactions</strong>. Payment memos were being used for harassment — needed automated detection at scale.
        </p>

        <h3>Model Training & Tuning</h3>
        <p>
        Trained 3 transformers (BERT, <strong>RoBERTa</strong>, XLNet) on 1M+ memos — RoBERTa won at 97% accuracy. Fixed class imbalance with weighting, tuned hyperparameters with <strong>Optuna</strong>. Added <strong>Meta Llama 3.1</strong> for edge cases.
        </p>

        <h3>Production Deployment</h3>
        <p>
        Built <strong>FastAPI</strong> REST API returning abuse scores. Deployed to <strong>Kubernetes (OpenShift)</strong>, configured <strong>CloudWatch</strong> monitoring. Built React demo with WebSockets for Tech Expo — <strong>700+ live interactions</strong>.
        </p>

        {/* Technologies Box */}
        <div className="rbc-tech-box rbc-tech-box-3d">
          <div className="rbc-text">
            <h3 className="tech-heading-white">Technologies</h3>
            <p>
              <li>PyTorch Lightning</li>
              <li>HuggingFace Transformers</li>
              <li>FastAPI</li>
              <li>Docker</li>
              <li>Kubernetes</li>
             </p>
          </div>
          <img src="/ai.png" alt="Technology illustration" />
        </div>
      </div>

      {/* Right Side */}
      <div className="rbc-right-side">
        <div
          className="rbc-image-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/model.png"
            alt="AI Payment Solution"
            className="rbc-laptop-image"
          />
          <div className="rbc-magnifier" style={magnifierStyle}>
            <img
              src="/model.png"
              alt="AI Payment Solution"
              className="rbc-laptop-abuse-image"
              style={{
                position: 'absolute',
                left: `-${magnifierStyle.left}`,
                top: `-${magnifierStyle.top}`,
                // size controlled via CSS
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
