import React from 'react';

const Spinner = () => {
  return (
    <div className="d-block" style={{ position: 'absolute', right: '50%', top: '50%' }}>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;