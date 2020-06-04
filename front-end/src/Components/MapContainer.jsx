import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const KEY = 'AIzaSyArZgBvjbUwf-RoEBxK8ib0ElqI8qeS2CA';

const MapContainer = ({ google, data }) => {
  return (
    <Map
      google={google}
      zoom={18}
      style={{ width: '90%', height: '20em' }}
      initialCenter={
        data.address.geometry.location
      }
    />
  );
};

export default GoogleApiWrapper({
  apiKey: KEY,
})(MapContainer);
