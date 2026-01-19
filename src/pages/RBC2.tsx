import './RBC.css';

const App: React.FC = () => {
  return (
    <div className="rbc-container rbc-container-reverse" style = {{paddingBottom: "30px"}}>
        {/* Left Side */}
      <div className="rbc-left-side">
        <h1 style={{color: "#1d62c3"}}>RBC</h1>
        <h2 style={{color: "#1d62c3"}}>2023 - Workforce Management</h2>
        <p>
        Built SharePoint workforce hub for 1,000+ call-center advisors. Automated scheduling that used to take managers 2-3 days per cycle.
        </p>

        <div className = "image">
          <img
          className = "laptop-image"
          src = "/shift.png"
          style = {{
            width: "80%",
            padding: "5%"
            }}></img>
        </div>

        <h3>Auto-Scheduler</h3>
        <p>
          Built 30+ custom SharePoint pages with SPFx Web Parts. Pulled Outlook calendars via Microsoft Graph, applied shift rules, generated rotation schedules. Turned spreadsheet chaos into one-click assignments.
        </p>

        <h3>Call-Volume Forecasting</h3>
        <p>
          Analyzed historical patterns in Python to predict surge hours. Built ETL pipeline pulling metrics from internal systems into PostgreSQL, visualized in Tableau. Managers stopped guessing coverage needs.
        </p>
      
      
      </div>

      {/* Right Side */}
      <div className="rbc-right-side">
        <img
          src="/sharepoint.png"
          alt="AI Payment Solution"
          className="rbc-sharepoint-image"
        />
      </div>
    </div>
  );
};

export default App;
