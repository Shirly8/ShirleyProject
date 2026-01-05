import React from 'react';

const CanvaProject: React.FC = () => {
  return (
    <iframe
      src="https://www.canva.com/design/DAGFPbHd8vU/OOI0WAeYvV7EdlEv0J_FPA/view?embed"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        
      }}
    />
  );
};

export default CanvaProject;
