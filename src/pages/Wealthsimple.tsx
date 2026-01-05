import React from 'react';
import './Wealthsimple.css';

const WealthsimplePage: React.FC = () => {
  return (
    <div className="ws-container">
      {/* Left Side */}
      <div className="ws-left-side">
        <div className="ws-heading">
            <img src="/wealthsimple.png" alt="Wealthsimple Logo" className="ws-logo" />
            <h1>Wealthsimple</h1>
        </div>

        <h2>2025 - LLM + ML Platform</h2>
    
        <h3 className="ws-heading-white">Architecture Consolidation</h3>
        <p>
          Consolidated <strong>four duplicate service wrappers into a single framework</strong>, reducing thousands of lines of duplicate code. This simplified workflows, improved maintainability, and supported <strong>10+ production services</strong> with fewer errors.
        </p>

        <h3 className="ws-heading-white">Service Migration</h3>
        <p>
          Migrated multiple services to a unified routing layer, improving consistency and reducing deployment issues. These changes ensured smooth operation for <strong>all active model endpoints</strong> and accelerated service updates by <strong>20%</strong>.
        </p>

        <h3 className="ws-heading-white">Observability & Reliability</h3>
        <p>
          Improved monitoring and added automatic fallback mechanisms to reduce downtime. The updates increased availability and provided teams with better operational insights, achieving <strong>99% uptime</strong> across key services.
        </p>
      </div>

      {/* Right Side */}
      <div className="ws-right-side">
        <img src="/wealthsimple_image.png" alt="Wealthsimple Architecture" className="ws-image" />
      </div>
    </div>
  );
};

export default WealthsimplePage;
