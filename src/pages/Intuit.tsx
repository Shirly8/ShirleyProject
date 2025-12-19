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
          Worked on GitOps Promoter, an open-source project (argoproj-labs) that enables environment promotion across multi-cluster deployments. Developers were spending hours figuring out what to promote and where. ArgoCD shows what's deployed, but not what needs promoting, what's stuck, or why something failed.
        </p>

        <h3>React Dashboard & Argo CD Extension</h3>
        <p style = {{color: "black"}}>
          Built complete UI layer across 3 interfaces: <strong>Argo CD extension</strong>, <strong>standalone dashboard</strong>, and <strong>embedded web views</strong>. Built shared component library with reusable TypeScript components. Architected state management with <strong>Zustand</strong> handling real-time Kubernetes resource updates via WebSocket connections. Went through multiple design iterations—the first version showed too much information. The final version shows promotion status across environments, deployment history, and blocking issues in one view.
        </p>

        <h3>Go Backend & Open Source</h3>
        <p style = {{color: "black"}}>
          Extended the Go-based Kubernetes controller to add validation logic for multi-cluster rollouts. <strong>Go</strong> webserver handles the API layer and integrates with ArgoCD's API. Uses <strong>Server-Sent Events</strong> to push deployment status updates in real time. Contributed to argoproj-labs/gitops-promoter—now used by 5+ engineering teams at Intuit and adopted by the CNCF Argo community.
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