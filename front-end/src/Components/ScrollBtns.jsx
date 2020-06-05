import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/scrollButtons.css';

const ScrollBtns = ({ onScrollLeft, onScrollRight, length, numToDisplay }) => {

  const [page, setPage] = useState(1);
  const increment = () => {
    page < length / numToDisplay && setPage(page + 1);
  };
  const decrement = () => {
    page > 1 && setPage(page - 1);
  };

  return (
    <div className="container d-flex justify-content-between">
      <button type="button" className="scroll-right btn btn-outline-dark btn-sm" style={{ position: 'relative', bottom: 10 }} onClick={() => { onScrollRight(); decrement(); }}>&larr;</button>
      <div style={{ position: 'relative', bottom: 10, color: '#A9A9A9' }}>{page + '/' + Math.ceil(length / numToDisplay)}</div>
      <button type="button" className="scroll-left btn btn-outline-dark btn-sm" style={{ position: 'relative', bottom: 10 }} onClick={() => { onScrollLeft(); increment(); }}>&rarr;</button>
    </div>
  );
};

ScrollBtns.propTypes = {
  onScrollLeft: PropTypes.func.isRequired,
  onScrollRight: PropTypes.func.isRequired,
};

export default ScrollBtns;
