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
          My mission was to accelerate developer velocity by simplifying the complex ArgoCD GitOps workflow.
        </p>

        <h3>Iterative Design & Development</h3>
        <p style = {{color: "black"}}>
          The core of the solution is a dynamic dashboard built with <strong>React</strong>. Through five iterative design cycles with the platform team, we created an intuitive interface that abstracts away the complexity of the promotion process.
        </p>

        <h3>Real-Time API via Go Webserver</h3>
        <p style = {{color: "black"}}>
          For live updates, I developed and exposed the necessary APIs through a <strong>Go</strong> webserver. This backend uses <strong>Server-Sent Events (SSE)</strong> to stream real-time deployment status to the frontend, giving developers immediate confidence in their pipelines.
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