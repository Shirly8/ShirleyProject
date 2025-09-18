import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import TimelineSlider from './components/TimelineSlider';
import CanvaProject from './pages/CanvaProject';


const App: React.FC = () => {
  return (
    <Router>
      <TopBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<TimelineSlider />} />
          <Route path="/project" element={<CanvaProject />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
