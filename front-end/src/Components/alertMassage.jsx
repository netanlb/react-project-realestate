
import React from 'react';

const alertMassage = (color, msg, func) => {

  return (
    <div className={`alert alert-${color} text-center alert-dismissible fade show`} role="alert" style={{ height: '3em' }}>
      {msg}
      <button type="button" className="close" data-dismiss="alert" onClick={() => func(null)} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default alertMassage;
