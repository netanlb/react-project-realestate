import React from 'react';
import AddProperty from './AddProperty';


const UserInterface = ({ user, setModal, addApartment, setAlert, massage }) => {
  return (
    <div className="d-flex flex-row p-2 mb-3 justify-content-center">
      <div>
        <button type="button" className="btn btn-outline-secondary btn-lg mr-1" data-toggle="collapse" data-target="#filter" aria-expanded="false" aria-controls="collapseExample">Filter</button>
      </div>
      <div>
        {user && <button type="button" className="btn btn-outline-dark btn-lg ml-1" onClick={() => setModal(<AddProperty massage={massage} user={user} setAlert={setAlert} addApartment={addApartment} closeEdit={() => { setAlert(null); setModal(null); }} />)}>&#43; Add Apartment</button>}
      </div>
    </div>
  );
};

export default UserInterface;
