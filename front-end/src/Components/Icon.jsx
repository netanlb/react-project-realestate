import React from 'react';

const Icon = ({ data, label, path }) => {
  return (
    <div className={`col ${!data && 'disabled'}`}>
      <img src={path} alt={label} /><br /><p>{label}</p>
    </div>
  );
};

export default Icon;
