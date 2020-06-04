import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import timeAgo from './timeAgo';
import '../Styles/apartment.css';
import ConfirmAction from './ConfirmAction';
import ViewApartment from './ViewApartment';

export default function Apartment({ data, setModal, removeApartment, user, onLike, liked, setAlert }) {
  const [isLiked, setIsLiked] = useState(false);

  const checkLiked = () => {
    let isLiked = false;
    liked.forEach((id) => {
      if (id === data._id) {
        isLiked = true;
      }
    });
    setIsLiked(isLiked);
  };

  useEffect(() => {
    checkLiked();
  }, [liked]);

  return (
    <div className="col-lg-4 col-md-6 text-dark mb-3 apt" key={data._id} style={{ maxWidth: '25em' }}>
      <ConfirmAction action='remove' func={removeApartment} data={data} />
      <div className="card">
        <img src={data.img && data.img[0]} className="card-img-top alt='img" alt="" style={{ height: 200 }} />
        <div className="card-body">
          <p className="card-text" style={{ color: '#117b8b' }}>
            <div className="row">
              <div className="col mb-3">
                <div className="h6">{data.city}</div>
              </div>
              <div className="col mb-3">
                Meters² &nbsp;{data.squareMeters}
              </div>
            </div>
            <div className="row">
              <div className="col">
                Rooms &nbsp;{data.rooms}
              </div>
              <div className="col">
                Price &nbsp;{data.price || 'Not specified'}
              </div>
            </div>
          </p>
          <button type="button" className="btn btn-outline-info float-left" onClick={() => setModal(<ViewApartment data={data} closeApartmentView={() => setModal(null)} />)}>View More</button>
          <button type="button" className="btn btn-light float-right like" style={!isLiked ? { opacity: 0.3 } : { color: '#ff7280' }} onClick={() => onLike(data._id)}>&hearts;</button>
          {user && (<button type="button" className={`btn btn-outline-danger mr-3 float-right ${data.user !== user.name && 'd-none'}`} data-toggle="modal" data-target="#confirmModal">&times;</button>)}
        </div>
        <div className="container">
          <p className="font-weight-light border-top" style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '0.8em' }}>added by <span className="font-weight-normal">{data.user}</span> {timeAgo(data.date)}</p>
        </div>
      </div>
    </div>
  );
}

Apartment.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.object,
    adress: PropTypes.string,
    rooms: PropTypes.number,
    price: PropTypes.number,
  }),
};

Apartment.defaultProps = {
  data: null,
};
