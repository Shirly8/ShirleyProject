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
          Built an abuse detection system for e-Transfer transactions. The problem: payment memos had become a vector for harassment. Banks needed automated detection without manual moderation at scale. Runs inline with RBC's payment flow—the challenge was catching abuse fast enough without slowing down legitimate transactions.
        </p>

        <h3>RoBERTa Model + LLM Validation</h3>
        <p>
        Trained and compared three transformer models (<strong>RoBERTa, BERT, XLNet</strong>) on e-Transfer memos. RoBERTa performed best—better at understanding short, informal payment messages. Added <strong>Meta Llama 3.1</strong> as a validation layer for uncertain classifications. Two-stage approach: fast classification for obvious cases, then deep review for ambiguous ones. The LLM catches patterns the classifier misses by reasoning about context and intent.
        </p>

        <h3>Model Tuning</h3>
        <p>
          Initial training hit accuracy issues—class imbalance, loss function mismatch, hyperparameter misalignment. Fixed by implementing class weighting, switching to binary cross-entropy for multi-label classification, and using <strong>Optuna</strong> to find optimal batch size and learning rate. Implemented <strong>Elastic Weight Consolidation</strong> to prevent catastrophic forgetting when updating with new fraud patterns.
        </p>

        <h3>Production Deployment & Demo</h3>
        <p>Built REST API with <strong>FastAPI</strong> and deployed to Kubernetes (OpenShift). Built a React demo with WebSocket connections for RBC's internal tech expo—processed 700+ live interactions showing real-time abuse detection.</p>

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
