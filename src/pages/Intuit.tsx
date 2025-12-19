import React from 'react';
import './Intuit.css';

const IntuitPage: React.FC = () => {
  return (
    <div className="intuit-container">
      {/* Left Side */}
      <div className="intuit-left-side">
        <div className="intuit-heading">
            <img src="/intuit.png" alt="Intuit Logo" className="intuit-logo" />
            <h1>Intuit</h1>
        </div>

        <h2>2025 - Platform Engineering</h2>
        <p style = {{color: "black"}}>
          Worked on GitOps Promoter, an open-source project (argoproj-labs) for environment promotion across multi-cluster deployments. Developers spent hours figuring out what to promote. ArgoCD shows what's deployed, but not what needs promoting, what's stuck, or why something failed.
        </p>

        <h3>React Dashboard & Argo CD Extension</h3>
        <p style = {{color: "black"}}>
          Built UI across 3 interfaces: <strong>Argo CD extension</strong>, <strong>standalone dashboard</strong>, and <strong>embedded web views</strong>. Built shared component library. Used <strong>Zustand</strong> for state management with real-time Kubernetes updates via WebSocket. Went through multiple iterations. First version showed too much. Final version shows promotion status, deployment history, and blocking issues in one view.
        </p>

        <h3>Go Backend & Open Source</h3>
        <p style = {{color: "black"}}>
          Extended the Go Kubernetes controller with validation logic for multi-cluster rollouts. <strong>Go</strong> webserver handles API layer and integrates with ArgoCD. Uses <strong>Server-Sent Events</strong> for real-time deployment updates. Contributed to argoproj-labs/gitops-promoter. Now used by 5+ teams at Intuit and adopted by the CNCF Argo community.
        </p>
      </div>

      {/* Right Side */}
      <div className="intuit-right-side">
        <img src="/demo.png" alt="ArgoCD GitOps Promoter Demo" className="intuit-image" />
      </div>
    </div>
  );
};

export default IntuitPage;