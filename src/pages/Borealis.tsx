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
          Built platform for detecting sensitive data in banking datasets. Enabled model training on realistic data without exposing real customer information.
        </p>

        <h3 style={{color: "white"}}>Pipeline Reliability</h3>
        <p>
          Fixed critical issue where worker crashes caused <strong>10-minute processing delays</strong>. Implemented retry logic. Batches now process continuously without blocking downstream jobs.
        </p>

        <h3 style={{color: "white"}}>Job Orchestration</h3>
        <p>
          Refactored database schema with SQLAlchemy to track job states (CREATED → RUNNING → SUCCESS/FAILED). Migrated <strong>11 services</strong> to a unified routing layer, improving consistency and reducing deployment issues. Connected Airflow DAGs to Kafka for real-time status updates.
        </p>

        <h3 style={{color: "white"}}>Health Monitoring</h3>
        <p>
          Built health check endpoints to detect stalled workers before they impact batch processing. Integrated monitoring hooks into Airflow orchestration for early failure detection.
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
