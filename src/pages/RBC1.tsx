import './RBC.css';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';

const App: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="rbc-container"
        style = {{paddingBottom: "20px"}}>
      <ImageModal isOpen={expandedImage !== null} imageSrc={expandedImage || ''} onClose={() => setExpandedImage(null)} />

      {/* Left Side */}
      <div className="rbc-left-side">
        <h1>RBC</h1>
        <h2>2024 - AI Payment Abuse Detection (POC)</h2>
        <p>
          Worked on POC abuse detection for e-Transfer memos processing <strong>1M+ transactions</strong>. Payment memos were being used for harassment — needed automated detection at scale.
        </p>

        <h3 style={{color: "white"}}>Model Training & Tuning</h3>
        <p>
        Trained 3 transformers (BERT, <strong>RoBERTa</strong>, XLNet) on 1M+ memos — RoBERTa won at 97% accuracy. Fixed class imbalance with weighting, tuned hyperparameters with <strong>Optuna</strong>. Added <strong>Meta Llama 3.1</strong> for edge cases.
        </p>

        <h3 style={{color: "white"}}>Production Deployment</h3>
        <p>
        Built <strong>FastAPI</strong> REST API returning abuse scores. Deployed to <strong>Kubernetes (OpenShift)</strong>, configured <strong>CloudWatch</strong> monitoring. Built React demo with WebSockets for Tech Expo — <strong>700+ live interactions</strong>.
        </p>
      </div>

      {/* Right Side */}
      <div className="rbc-right-side">
        <img
          src="/model.png"
          alt="AI Payment Solution"
          className="rbc-laptop-image image-hover-3d"
          onClick={() => setExpandedImage('/model.png')}
        />
      </div>
    </div>
  );
};

export default App;
