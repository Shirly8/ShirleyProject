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
          Built abuse detection for e-Transfer transactions. Payment memos were being used for harassment. Needed to catch abuse in real time without slowing down legitimate payments.
        </p>

        <h3>RoBERTa Model + LLM Validation</h3>
        <p>
        Compared three transformer models on e-Transfer memos. <strong>RoBERTa</strong> worked best for short, informal messages. Added <strong>Meta Llama 3.1</strong> to review uncertain cases. Fast classification first, then deep review for ambiguous ones. The LLM catches what the classifier misses by understanding context.
        </p>

        <h3>Model Tuning</h3>
        <p>
          Initial training had accuracy issues. Class imbalance, wrong loss function, bad hyperparameters. Fixed with class weighting, binary cross-entropy for multi-label, and <strong>Optuna</strong> for hyperparameter search. Used <strong>Elastic Weight Consolidation</strong> so the model learns new patterns without forgetting old ones.
        </p>

        <h3>Production Deployment</h3>
        <p>Built REST API with <strong>FastAPI</strong>, deployed to Kubernetes. Built React demo with WebSockets for RBC's tech expo.</p>

        {/* Technologies Box */}
        <div className="rbc-tech-box">
          <div className="rbc-text">
            <h3>Technologies</h3>
            <p style = {{fontWeight: "bolder"}}>
              <li>PyTorch Lightning</li> 
              <li>HuggingFace Transformers</li>
              <li>FastAPI</li>
              <li>Docker</li>
              <li>Kubernetes</li>
              <li>React</li></p>
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
