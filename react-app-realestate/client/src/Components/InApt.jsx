import React from 'react';
import '../Styles/icons.css';
import Icon from './Icon';

const InApt = ({ data }) => {
  return (
    <div className="icons">
      <div className="row">
        <Icon data={data.pets} label="Pets" path="/icons/pets.svg" />
        <Icon data={data.parking} label="Parking" path="/icons/parking.svg" />
        <Icon data={data.balcony} label="Balcony" path="/icons/balcony.svg" />
        <Icon data={data.elevator} label="Elevator" path="/icons/elevator.svg" />
      </div>
      <div className="row">
        <Icon data={data.frontYard} label="Front yard" path="/icons/yard.svg" />
        <Icon data={data.flatMates} label="Flatmates" path="/icons/flatmate.svg" />
        <Icon data={data.airConditioner} label="Air conditioner" path="/icons/air-conditioner.svg" />
        <Icon data={data.bombShelter} label="Bomb shelter" path="/icons/shelter.svg" />
      </div>
      <div className="row">
        <Icon data={data.furnished} label="Furnished" path="/icons/furnished.svg" />
        <Icon data={data.handicapAccess} label="Handicap Accessability" path="/icons/handicap.svg" />
        <Icon data={data.storage} label="Storage unit" path="/icons/storage.svg" />
        <Icon data={data.longterm} label="Longterm" path="/icons/longterm.svg" />
      </div>
    </div>
  );
};

export default InApt;
