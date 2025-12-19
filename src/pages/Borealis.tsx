import './borealis.css';

const App: React.FC = () => {

  return (
    <div className="borealis-container">
      {/* Left Side */}
      <div className="borealis-left">
        <div className = "headingandlogo">
        <h1>Borealis AI</h1>
        <img src = "/borealis.svg" style = {{width: "90px", marginTop: "-30px"}}></img>
        </div>

        
        <h2>2024 - Responsible AI Team</h2>
        <p>
          Worked on the AI Data Trust Platform—PII detection, synthetic data generation, and job management. The platform processes sensitive customer data, so everything needed to be fast, reliable, and privacy-compliant.
        </p>

        <h3>Coordinator Service & PII Detection</h3>
        <p>
        <li>Extended the Coordinator Service (Flask) to accept JSON and Parquet files. Fixed 404 delays by moving job creation from Airflow to Coordinator—jobs marked CREATED instantly, then Airflow updates to RUNNING once DAG starts.</li>
        <li>Implemented Airflow DAG tasks for asynchronous PII detection using Celery workers and Microsoft Presidio. Handled failures gracefully—if one worker crashes, the job retries, not fails the batch. Debugged Redis connection timeout issues that were causing workers to hang.</li>
        </p>

        <h3>Synthetic Data Generation</h3>
        <p>
        <li>Built data preprocessing pipeline using pandas and regex masking to prepare anonymized datasets for the team's GAN-based synthetic data generator. Preprocessed data, applied PII masking, validated statistical distributions needed for GAN training.</li>
        <li>Optimized regex patterns with precompiled regex using `re.compile()` for performance improvement. Iterated on patterns to catch different formats while preserving data utility for ML training.</li>
        </p>


        <h3>Job Manager</h3>
        <p>
        <li>Refactored core tables to support new PII detection features. Implemented CRUD operations with SQLAlchemy on MariaDB, handling job lifecycle transitions: CREATED → RUNNING → SUCCESS/FAILED with timestamp logging.</li>
          <li>Organized APIs with Flask Blueprint, documented with Swagger. Fixed N+1 lookups by replacing separate queries with proper joins and eager loading. Added Redis caching for frequently accessed data.</li>
          <li>Optimized file ingestion and retrieval from S3. Implemented a two-tier cache: Redis for hot data (24hr TTL), S3 for cold data.</li>
          </p>
      </div>

      {/* Right Side */}
      <div className="borealis-right">
        {/* <div className = "impact">
        <h2 className="impact-header">🚀 Impact</h2>
        <h3>
        <ul>
          <li>10x faster PII detection (10 min ⟶ 2 min)</li>
          <li>25,000+ synthetic datasets generated with GANs for privacy compliance.</li>
          <li>30% lower microservice latency via SQL & API query optimizations.</li>
          <li>Hands-on experience with NLP, distributed systems, and AI ethics.</li>
        </ul>
        </h3>
        </div> */}

        <div className = "impact">
        <h2 className="impact-header">Technologies</h2>
        <h3 style = {{textAlign: "center"}}>
        <ul>
          <li>Python </li>
          <li>Apache Airflow</li>
          <li>SQLAlchemy</li>
          <li>MariaDB [SQL]</li>
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

export default App;
