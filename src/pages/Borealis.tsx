import React from 'react';
import './borealis.css';

const BorealisPage: React.FC = () => {
  return (
    <div className="borealis-container">
      {/* Left Side */}
      <div className="borealis-left">
        <div className="headingandlogo">
          <h1 style={{color: "#0625b6"}}>Borealis AI</h1>
          <img src="/borealis.svg" style={{width: "90px", marginTop: "-30px"}} alt="Borealis AI Logo"/>
        </div>

        <h2 style={{color: "#0625b6"}}>2024 - Responsible AI</h2>
        <p>
          Contributed to a platform for detecting sensitive information and generating synthetic data for banking. Enabled teams to safely use realistic test data without exposing real customer information.
        </p>

        <h3 style={{color: "#0625b6"}}>PII Detection Pipeline</h3>
        <p>
          Improved reliability of the data processing pipeline by fixing a critical issue where worker crashes caused 10-minute delays during sensitive data detection. Implemented retry mechanisms and better job handling, ensuring <strong>continuous processing without blocking batches</strong>.
        </p>

        <h3 style={{color: "#0625b6"}}>Performance & Data Pipeline</h3>
        <p>
          Refactored data routing and caching to improve efficiency and stability. Optimized workflows for processing sensitive data while maintaining security and compliance standards.
        </p>
      </div>

      {/* Right Side */}
      <div className="borealis-right">
        <div className="impact">
          <h2 className="impact-header">Technologies</h2>
          <h3 style={{textAlign: "center"}}>
            <ul>
              <li>Python</li>
              <li>Apache Airflow</li>
              <li>SQLAlchemy</li>
              <li>MariaDB</li>
              <li>Redis</li>
              <li>Amazon S3</li>
              <li>Docker</li>
              <li>Flask</li>
            </ul>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BorealisPage;
