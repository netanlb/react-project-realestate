import React, { useRef } from 'react';
/* global google */

const AddressSearch = ({ getAddress, fullAddress }) => {
  const autocompleteInput = useRef();
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.current, fullAddress ? { types: ['geocode'], componentRestrictions: { country: 'il' } } : { types: ['(cities)'], componentRestrictions: { country: 'il' } });

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    getAddress(fullAddress ? place : place.name);
  };

  autocomplete.addListener('place_changed', handlePlaceChanged);

  return (
    <input
      className="form-control"
      ref={autocompleteInput}
      id="autocomplete"
      placeholder="Enter address"
      type="text"
      onChange={(e) => getAddress(e.target.value)}
    />
  );
};
export default AddressSearch;
