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
          Worked on the AI Data Trust Platform. PII detection, synthetic data generation, and job management. Processes sensitive customer data, so everything needs to be fast, reliable, and privacy-compliant.
        </p>

        <h3>Coordinator Service & PII Detection</h3>
        <p>
        <li>Extended Coordinator Service (Flask) to accept JSON and Parquet files. Fixed 404 delays by moving job creation from Airflow to Coordinator. Jobs marked CREATED instantly, then Airflow updates to RUNNING when DAG starts.</li>
        <li>Built Airflow DAG tasks for PII detection using Celery workers and Microsoft Presidio. If one worker crashes, the job retries instead of failing the batch. Debugged Redis connection timeouts that were hanging workers.</li>
        </p>

        <h3>Synthetic Data Generation</h3>
        <p>
        <li>Built preprocessing pipeline using pandas and regex masking for the team's GAN generator. Applied PII masking and validated statistical distributions for GAN training.</li>
        <li>Optimized regex with precompiled patterns using re.compile(). Iterated on patterns to catch different formats while keeping data useful for ML training.</li>
        </p>


        <h3>Job Manager</h3>
        <p>
        <li>Refactored core tables for PII detection. Implemented CRUD with SQLAlchemy on MariaDB. Handles job lifecycle: CREATED to RUNNING to SUCCESS/FAILED with timestamps.</li>
          <li>Organized APIs with Flask Blueprint, documented with Swagger. Fixed N+1 lookups with proper joins and eager loading. Added Redis caching.</li>
          <li>Optimized S3 file ingestion and retrieval. Two-tier cache: Redis for hot data, S3 for cold data.</li>
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
