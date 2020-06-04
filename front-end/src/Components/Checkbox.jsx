import React from 'react';

const Checkbox = ({ toggle, checked, name }) => {
  return (
    <div className="col-md">
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox" id={name} checked={checked} onChange={() => toggle()}/>
        <label className="form-check-label" for={name}>{name}</label>
      </div>
    </div>
  );
};

export default Checkbox;
