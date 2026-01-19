import { lazy, Suspense } from 'react';
import './WorkSection.css';

const RBC1 = lazy(() => import("../pages/RBC1"));
const RBC2 = lazy(() => import("../pages/RBC2"));
const KBH = lazy(() => import("../pages/KBH"));
const BorealisAI = lazy(() => import('../pages/Borealis'));
const Intuit = lazy(() => import('../pages/Intuit'));
const Wealthsimple = lazy(() => import('../pages/Wealthsimple'));

interface WorkSectionProps {
  showProjectHeader?: boolean;
}

const WorkSection: React.FC<WorkSectionProps> = ({ showProjectHeader = false }) => {
  return (
    <div className="work-section-container">
      <h2 className="work-section-title">Work</h2>
      <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text)' }}>Loading...</div>}>
        <div className="work-items">
          <Wealthsimple />
          <Intuit />
          <BorealisAI />
          <RBC1 />
          <RBC2 />
          <KBH />
        </div>
      </Suspense>

      {showProjectHeader && <h2 className="work-section-title">Project</h2>}

    </div>
  );
};

export default WorkSection;