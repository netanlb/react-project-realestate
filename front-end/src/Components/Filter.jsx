import React, { useState } from 'react';
import AddressSearch from './AddressSearch';
import Checkbox from './Checkbox';
import '../Styles/filters.css';

const Filter = ({ fetchApartments }) => {
  const [city, setCity] = useState('');
  const [rooms, setRooms] = useState('');
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [balcony, setBalcony] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [airConditioner, setAirConditioner] = useState(false);
  const [flatmates, setFlatmates] = useState(false);
  const [longterm, setLongterm] = useState(false);
  const [handicapAccess, setHandicapAccess] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [storage, setStorage] = useState(false);
  const [bombShelter, setBombShelter] = useState(false);
  const [frontYard, setFrontYard] = useState(false);

  const getAddress = (callback) => setCity(callback);
  const clear = () => {
    setPriceEnd('');
    setPriceStart('');
    setRooms('');
    setParking(false);
    setBalcony(false);
    setPets(false);
    setElevator(false);
    setAirConditioner(false);
    setFlatmates(false);
    setLongterm(false);
    setHandicapAccess(false);
    setFurnished(false);
    setStorage(false);
    setBombShelter(false);
    setCity(null);
    document.getElementById('autocomplete').value = '';
  };

  return (
    <div className="mb-3 border rounded" style={{ backgroundColor: 'white', padding: '1em' }}>
      <div className="row filters">
        <button type="button" className="btn btn-light ml-3 additional" data-toggle="collapse" data-target="#additional" aria-expanded="false" aria-controls="collapseExample">
          +
        </button>
        <div className="col-lg-3 column">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Address</span>
            </div>
            <AddressSearch getAddress={getAddress} />
          </div>
        </div>
        <div className="col-lg-1.5 column rooms">
          <div>
            <div className="input-group">
              <div className="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Rooms</label>
              </div>
              <select className="custom-select" id="inputGroupSelect01" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                <option selected></option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
                <option value="6">6</option>
                <option value="6.5">6.5</option>
                <option value="7">7</option>
                <option value="7.5">7.5</option>
                <option value="8">8</option>
                <option value="8.5">8.5</option>
                <option value="9">9</option>
                <option value="9.5">9.5</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-lg-3 column price">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Price range</span>
            </div>
            <input className="form-control" id="price-range-from" placeholder="From" type="number" value={priceStart} onChange={(e) => setPriceStart(e.target.value)} />
          </div>
        </div>
        <span style={{ fontWeight: 'bold', lineHeight: '2' }}>-</span>
        <div className="col-lg-2 column price-end">
          <div className="input-group">
            <input className="form-control" id="price-range-to" placeholder="To" type="number" value={priceEnd} onChange={(e) => setPriceEnd(e.target.value)} />
          </div>
        </div>
        <div className="col-lg">
          <div>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => {
                fetchApartments(city, rooms, priceStart, priceEnd, parking, balcony, pets, elevator, airConditioner, flatmates, longterm, handicapAccess, furnished, storage, bombShelter);
              }}
            >Search
            </button>
            <button
              type="button"
              className="btn ml-1 btn-outline-secondary"
              onClick={() => {
                clear();
              }}
            >Clear
            </button>
          </div>
        </div>
      </div>
      <div className="collapse" id="additional">
        <div className="container p-2 mx-auto">
          <label>Additional Filter Parameters</label><br />
          <div className="row">
            <Checkbox toggle={() => setParking(!parking)} checked={parking} name="Parking" />
            <Checkbox toggle={() => setPets(!pets)} checked={pets} name="Pets" />
            <Checkbox toggle={() => setElevator(!elevator)} checked={elevator} name="Elevator" />
            <Checkbox toggle={() => setAirConditioner(!airConditioner)} checked={airConditioner} name="Air Conditioner" />
          </div>
          <div className="row">
            <Checkbox toggle={() => setBalcony(!balcony)} checked={balcony} name="Balcony" />
            <Checkbox toggle={() => setFlatmates(!flatmates)} checked={flatmates} name="Flatmates" />
            <Checkbox toggle={() => setLongterm(!longterm)} chekced={longterm} name="Longterm" />
            <Checkbox toggle={() => setFurnished(!furnished)} checked={furnished} name="Furnished" />
          </div>
          <div className="row">
            <Checkbox toggle={() => setBombShelter(!bombShelter)} checked={bombShelter} name="Bomb Shelter" />
            <Checkbox toggle={() => setFrontYard(!frontYard)} checked={frontYard} name="Front Yard" />
            <Checkbox toggle={() => setStorage(!storage)} checked={storage} name="Storage Unit" />
            <Checkbox toggle={() => setHandicapAccess(!handicapAccess)} checked={handicapAccess} name="Handicapped Accessability" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
