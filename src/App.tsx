import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import TopBar from './components/TopBar';
import ChatWidget from './components/ChatWidget';
import WorkSection from './components/WorkSection';

const Home = lazy(() => import('./pages/Home'));
const CanvaProject = lazy(() => import('./pages/CanvaProject'));

const App: React.FC = () => {
  return (
    <Router>
      <TopBar />
      <div>
        <Suspense fallback={<div style={{ padding: 24, color: 'var(--color-text)' }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkSection />} />
            <Route path="/project" element={<CanvaProject />} />
          </Routes>
        </Suspense>
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
};

export default App;
