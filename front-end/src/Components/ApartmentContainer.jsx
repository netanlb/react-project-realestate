import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';

import ApartmentList from './ApartmentList';
import ApartmentWindow from './ApartmentWindow';

const ApartmentContainer = ({
  triggerLiked,
  setModal,
  onLike,
  getFetchFunction,
  user,
  massage,
  setAlert,
  modalComponent,
  liked
}) => {
  const [apartmentList, setApartmentList] = useState([]);

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
    const url = new URL('http://localhost:5000/api/apartments');
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

    fetch(url)
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
    fetch('http://localhost:5000/api/apartments', postApartment)
      .then((res) => res.json()
        .then((json) => setAlert(json.msg, json.color)))
      .catch((err) => console.log(err))
      .then(() => fetchApartments());
  };

  const likedApartments = (liked) => {
    fetch('http://localhost:5000/api/liked/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(liked),
    }).then((res) => res.json()).then((data) => setApartmentList(data));
  };

  useEffect(() => {
    triggerLiked(likedApartments);
    getFetchFunction(fetchApartments);
  }, []);

  const removeApartment = (id) => {
    const removedApartment = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
    };
    fetch(`http://localhost:5000/api/apartments/${id}`, removedApartment)
      .then((res) => res.json()).then((json) => setAlert(json.msg, json.color))
      .then(() => fetchApartments())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const getDataFromViewApartment = () => {
    
  }

  return (
    <ApartmentList
      onLike={onLike}
      user={user}
      addApartment={addApartment}
      removeApartment={removeApartment}
      apartments={apartmentList}
      numToDisplay={6}
      setModal={setModal}
      massage={massage}
      setAlert={setAlert}
      fetchApartments={fetchApartments}
      path="featured"
      modalComponent={modalComponent}
      liked={liked}
    />
  );
};

ApartmentContainer.propTypes = {
  setModal: PropTypes.func,
  triggerFunction: PropTypes.func,
};

ApartmentContainer.defaultProps = {
  setModal: null,
  triggerFunction: null,
};

export default ApartmentContainer;
