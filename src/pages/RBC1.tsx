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
        <h1>RBC</h1>
        <h2>2024 - Core and Real-Time Payment AI Solution</h2>
        <p>
          Optimized a high-performance <strong>Natural Language
          Processing (NLP) </strong>to analyze e-Transfer transactions messages in RBC's payment system.
        </p>

        <h3>Integrated LLM validation on 1M+ e-transfer transaction</h3>
        <p>

        Fine-tuned a binary multi-class <strong>BERT model </strong> to classify messages across six distinct
        categories of abuse + <strong>LLM validation (Meta Llama 3.1)</strong> for contextual refinement in the pipeline.
        </p>

        <h3>Model Optimization</h3>
        <p>
          Utilized model optimization, such as <strong>Optuna for Hyperparameter
          tuning </strong> and <strong>Elastic Weight Consolidation (EWC) </strong> to enhance stability. These efforts resulted
          in an impressive F1 score of 0.98 and an AUC of 0.95.
        </p>

        <h3>Catalyst Tech Expo Deployment</h3>
        <p>Showcased the solution’s impact on real-time fraud detection, attracting 700+ interactions and boosting customer engagement by 75%.</p>

        {/* Technologies Box */}
        <div className="rbc-tech-box">
          <div className="rbc-text">
            <h3>Technologies</h3>
            <p style = {{fontWeight: "bolder"}}>
              <li>PyTorch</li> 
              <li>SciKit-Learn</li> 
              <li>Transformers</li>
              <li>Numpy</li>
              <li>Matplotlib</li>
              <li>spaCy</li></p>
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
