import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ApartmentList from './ApartmentList';
import UserInterface from './UserInterface';
import Filter from './Filter';
import alertMassage from './alertMassage';
import Spinner from './Spinner';

const ApartmentContainer = ({
  triggerLiked,
  setModal,
  onLike,
  user,
  massage,
  setAlert,
  modalComponent,
  liked
}) => {
  const [apartmentList, setApartmentList] = useState(null);

  const fetchApartments = (
    city,
    rooms,
    priceStart,
    priceEnd,
    parking,
    balcony,
    pets,
    elevator,
    airConditioner,
    flatmates,
    longterm,
    handicapAccess,
    furnished,
    storage,
    bombShelter,
  ) => {
    const url = new URL('http://localhost:3000/api/apartments');
    const params = {
      city,
      rooms,
      priceStart,
      priceEnd,
      parking,
      balcony,
      pets,
      elevator,
      airConditioner,
      flatmates,
      longterm,
      handicapAccess,
      furnished,
      storage,
      bombShelter };

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});

    const filtered = Object.filter(params, (param) => param !== null && param !== '' && param !== undefined && param !== false);

    if (filtered !== {}) {
      url.search = new URLSearchParams(filtered);
    }

    fetch(url.pathname + '/' + url.search)
      .then((res) => res.json())
      .then((data) => {
        setApartmentList(data);
      }).catch((err) => console.log(err));
  };

  const addApartment = (apt, user) => {
    const filtered = Object.filter(apt, (param) => param);
    const postApartment = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify(filtered),
    };
    fetch('/api/apartments', postApartment)
      .then((res) => res.json()
        .then((json) => {
          setAlert(json.msg, json.color);
          json.color === 'success' && setModal(null);
        }))
      .catch((err) => console.log(err))
      .then(() => {
        fetchApartments();
      });
  };

  const likedApartments = (liked) => {
    fetch('/api/liked/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(liked),
    }).then((res) => res.json()).then((data) => setApartmentList(data));
  };

  useEffect(() => {
    triggerLiked(likedApartments);
  }, []);

  const removeApartment = (id) => {
    const removedApartment = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
    };
    fetch(`/api/apartments/${id}`, removedApartment)
      .then((res) => res.json()).then((json) => setAlert(json.msg, json.color))
      .then(() => fetchApartments())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div className="container apartment-list" style={{ marginTop: '4em' }}>
      <UserInterface user={user} setModal={setModal} addApartment={addApartment} setAlert={setAlert} massage={massage} />
      <CSSTransition
        in={massage}
        timeout={300}
        classNames="col"
      >
        <div>
          {massage
            && (
              alertMassage(massage.color, massage.msg, setAlert)
            )}
        </div>
      </CSSTransition>
      <div className="collapse" id="filter">
        <Filter fetchApartments={fetchApartments} />
      </div>
      {apartmentList && apartmentList.length === 0 && <div className="text-center">Sorry, no results here...</div>}
      {apartmentList && apartmentList.length > 0 && (
        <ApartmentList
          onLike={onLike}
          user={user}
          addApartment={addApartment}
          removeApartment={removeApartment}
          apartments={apartmentList}
          setModal={setModal}
          massage={massage}
          setAlert={setAlert}
          fetchApartments={fetchApartments}
          path="featured"
          modalComponent={modalComponent}
          liked={liked}
        />
      )}
      {!apartmentList && <Spinner />}
    </div>
  );
};

ApartmentContainer.propTypes = {
  setModal: PropTypes.func,
};

ApartmentContainer.defaultProps = {
  setModal: null,
  triggerFunction: null,
};

export default ApartmentContainer;
