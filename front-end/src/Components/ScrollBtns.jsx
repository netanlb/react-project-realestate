import React from 'react';
import PropTypes from 'prop-types';

const ScrollBtns = ({ onScrollLeft, onScrollRight }) => { 
  return (
    <div>
      <button type="button" className="btn btn-outline-dark btn-sm float-left" style={{ position: 'relative', bottom: 60, right: 40 }} onClick={onScrollRight}>&larr;</button>
      <button type="button" className="btn btn-outline-dark btn-sm float-right" style={{ position: 'relative', bottom: 60, left: 40 }} onClick={onScrollLeft}>&rarr;</button>
    </div>
  );
};

ScrollBtns.propTypes = {
  onScrollLeft: PropTypes.func.isRequired,
  onScrollRight: PropTypes.func.isRequired,
};

export default ScrollBtns;
