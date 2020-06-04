import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CSSTransition } from 'react-transition-group';
import alertMassage from './alertMassage';
import AddressSearch from './AddressSearch';
import Checkbox from './Checkbox';
import validateApt from './validateApt';
import Joi from '@hapi/joi';

const AddProperty = ({ closeEdit, addApartment, user, setAlert, massage }) => {
  const fullAddress = true;
  const [propertyDetails, setPropertyDetails] = useState({
    address: null,
    city: null,
    rooms: null,
    squareMeters: null,
    price: null,
    entranceDate: null,
    img: [],
    description: null,
    user: user.name,
    parking: false,
    balcony: false,
    pets: false,
    elevator: false,
    airConditioner: false,
    flatmates: false,
    longterm: null,
    handicapAccess: null,
    furnished: null,
    storage: null,
    bombShelter: null,
    frontYard: null,
    phone: null,
    email: null,
  });

  const [files, setFile] = useState(null);
  const [filename, setFilename] = useState('Choose File');

  const getAddress = (callback) => {
    setPropertyDetails((c) => ({ ...c, address: callback }));
    setPropertyDetails((c) => ({ ...c, city: callback.vicinity }));

  };

  const uploadFile = () => {
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('files', file));
      fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())
        .then((data) => {
          const { filePaths } = data;
          const updatedProps = propertyDetails;
          updatedProps.img = filePaths;
          addApartment(updatedProps, user);
        }).catch((err) => console.log(err));
    } else {
      addApartment(propertyDetails, user);
    }
  };

  const toggleCheckbox = (key) => {
    setPropertyDetails((c) => ({ ...c, [key]: !c[key] }));
  };

  Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});

  const validateForm = () => {
    const filtered = Object.filter(propertyDetails, (param) => param);
    const { error } = validateApt.validate(filtered);
    !error ? uploadFile(user) : setAlert('Please enter a valid ' + error.details[0].context.key, 'danger');
  };

  return (
    <div
      className="mx-auto img-fluid rounded"
      style={{
        width: '70%',
        minWidth: '20em',
        height: '85vh',
        backgroundColor: '#eeeeee',
      }}
    >
      <button type="button" className="close" aria-label="Close" onClick={() => closeEdit()} style={{ position: 'relative', right: 5 }}>
        <span aria-hidden="true">&times;</span>
      </button>
      <Form className="overflow-auto apt-info-input" novalidate style={{ margin: 20, padding: 20, height: '100%' }}>
        <CSSTransition
          in={massage}
          timeout={300}
          classNames="col"
        >
          <div>
            {massage && (
              <div>
                {massage
                  && (
                    alertMassage(massage.color, massage.msg, setAlert)
                  )}
              </div>
            )}
          </div>
        </CSSTransition>
        <h3 className="text-center">Please enter new apartment details</h3>
        <Form.Group>
          <Form.Label>*Address</Form.Label>
          <div className="row">
            <div className="col">
              <AddressSearch fullAddress={fullAddress} getAddress={getAddress} className="address" required /><br />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Label>*Meters²</Form.Label>
              <Form.Control
                type="number"
                value={propertyDetails.squareMeters}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, squareMeters: val }));
                }}
                className="needs-validation"
                required
              />
              <div className="invalid-feedback">enter meters value</div>
            </div>
            <div className="col">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={propertyDetails.price}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, price: val }));
                }}
                className="needs-validation"
                required
              />
            </div>
            <div className="col-lg-4 col-sm-12">
              <Form.Label>*Number of rooms</Form.Label>
              <Form.Control
                as="select"
                type="number"
                value={propertyDetails.rooms}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, rooms: val }));
                }}
                className="needs-validation"
                required
              >
                <option> </option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
                <option>8.5</option>
                <option>9</option>
                <option>9.5</option>
                <option>10</option>
              </Form.Control>
            </div>
            <div className="col">
              <Form.Label>Entrance date</Form.Label>
              <Form.Control
                type="date"
                value={propertyDetails.entranceDate}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, entranceDate: val }));
                }}
              />
            </div>
          </div>
          <br />
          <Form.Label>Additional properties</Form.Label><br />
          <div className="row">
            <Checkbox toggle={() => toggleCheckbox('parking')} checked={propertyDetails.parking} name="Parking" />
            <Checkbox toggle={() => toggleCheckbox('balcony')} checked={propertyDetails.balcony} name="Balcony" />
            <Checkbox toggle={() => toggleCheckbox('pets')} checked={propertyDetails.pets} name="Pets" />
          </div>
          <div className="row">
            <Checkbox toggle={() => toggleCheckbox('airConditioner')} checked={propertyDetails.airConditioner} name="Air Conditioner" />
            <Checkbox toggle={() => toggleCheckbox('flatmates')} checked={propertyDetails.flatMates} name="Flatmate" />
            <Checkbox toggle={() => toggleCheckbox('longterm')} checked={propertyDetails.longterm} name="Longterm" />
          </div>
          <div className="row">
            <Checkbox toggle={() => toggleCheckbox('storage')} checked={propertyDetails.storage} name="Storage" />
            <Checkbox toggle={() => toggleCheckbox('furnished')} checked={propertyDetails.furnished} name="Furnished" />
            <Checkbox toggle={() => toggleCheckbox('bombShelter')} checked={propertyDetails.bombShelter} name="Bomb Shelter" />
          </div>
          <div className="row">
            <Checkbox toggle={() => toggleCheckbox('elevator')} checked={propertyDetails.elevator} name="Elevator" />
            <Checkbox toggle={() => toggleCheckbox('handicapAccess')} checked={propertyDetails.handicapAccess} name="Handicap Accessability" />
            <Checkbox toggle={() => toggleCheckbox('fontYard')} checked={propertyDetails.frontYard} name="Front Yard" />
          </div>
          <br />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            value={propertyDetails.description}
            onChange={(e) => {
              const val = e.target.value;
              setPropertyDetails((c) => ({ ...c, description: val }));
            }}
          />
          <br />
          <div className="row">
            <div className="col">
              <Form.Label>*Phone number</Form.Label>
              <Form.Control
                type="tel"
                pattern="\([0-9]{3}\) [0-9]{3}[ -][0-9]{4}"
                value={propertyDetails.phone}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, phone: val }));
                }}
                className="needs-validation"
                required
              />
            </div>
            <div className="col">
              <Form.Label>*Email address</Form.Label>
              <Form.Control
                type="email"
                value={propertyDetails.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropertyDetails((c) => ({ ...c, email: val }));
                }}
                className="needs-validation"
                required
              />
            </div>
          </div>
          <br />
          <Form.Label>Upload Images</Form.Label>
          <div className="input-group mb-3">
            <div className="custom-file">
              <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">
                {filename}
                <input
                  type="file"
                  multiple="multiple"
                  className="custom-file-input"
                  id="inputGroupFile02"
                  onChange={(e) => {
                    setFile(e.target.files);
                    const fileNames = Array.from(e.target.files).map((file) => file.name);
                    setFilename(fileNames.join(', '));
                  }}
                />
              </label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              validateForm();
            }}
          >Add new apartment
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddProperty;
