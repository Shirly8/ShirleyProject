import React from 'react';
import './WorkSection.css';
import RBC1 from "../pages/RBC1";
import RBC2 from "../pages/RBC2";
import KBH from "../pages/KBH";
import BorealisAI from '../pages/Borealis';
import Intuit from '../pages/Intuit';
import Wealthsimple from '../pages/Wealthsimple';

const WorkSection: React.FC = () => {
  return (
    <div className="work-section-container">
      <h2 className="work-section-title">Work</h2>
      <div className="work-items">
        <Wealthsimple />
        <Intuit />
        <BorealisAI />
        <RBC1 />
        <RBC2 />
        <KBH />
      </div>

    </div>
  );
};

export default WorkSection;