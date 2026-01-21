import './Intuit.css';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';

const IntuitPage: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="intuit-container">
      <ImageModal isOpen={expandedImage !== null} imageSrc={expandedImage || ''} onClose={() => setExpandedImage(null)} />
      {/* Left Side */}
      <div className="intuit-left-side">
        <div className="intuit-heading">
            <img src="/intuit.png" alt="Intuit Logo" className="intuit-logo" />
            <h1>Intuit</h1>
        </div>

        <h2>2025 - Platform Engineering</h2>
        <p style = {{color: "black"}}>
          Worked on GitOps Promoter (open-source) for environment promotion across multi-cluster deployments. Teams had no standardized way to promote dev → staging → prod.
        </p>

        <h3 style={{color: "white"}}>React UI (Full Ownership)</h3>
        <p>
          Built complete UI across 3 interfaces: <strong>Argo CD extension</strong>, <strong>standalone dashboard</strong>, <strong>embedded views</strong>. Created shared component library with reusable TypeScript components. Used <strong>Zustand</strong> for state + <strong>WebSockets</strong> for real-time K8s updates.
        </p>

        <h3 style={{color: "white"}}>Go Controller & Impact</h3>
        <p>
          Extended <strong>Go Kubernetes controller</strong> with multi-cluster validation logic. Contributed to argoproj-labs/gitops-promoter, adopted by CNCF Argo community. <strong>200+ monthly active developers</strong> across Intuit platform teams.
        </p>
      </div>

      {/* Right Side */}
      <div className="intuit-right-side">
        <img src="/demo.png" alt="ArgoCD GitOps Promoter Demo" className="intuit-image image-hover-3d" onClick={() => setExpandedImage('/demo.png')} />
      </div>
    </div>
  );
};

export default IntuitPage;