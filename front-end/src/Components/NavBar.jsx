import React from 'react';
import LoginForm from './LoginForm';
import AddProperty from './AddProperty';
import RegisterForm from './RegisterForm';
import '../Styles/navbar.css';

const NavBar = ({ logOut, setModal, likedApartments, liked, fetchApartments, loginUser, user, setAlert }) => {

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark position-flex">
      <a className="navbar-brand mr-5 ml-5" href="#dd">RealEstate Inc</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarToggle">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">Featured</a>
          <a className="nav-item nav-link" href="#liked" onClick={() => likedApartments(liked)}>&hearts; Liked (<span style={{color: 'pink' }}>{liked.length}</span>)</a>
        </div>
        <div className="navbar-nav ml-auto mr-5">
          {user && <a className="nav-item nav-link" href="#users">Welcome {user.name}!</a>}
          {user ? <button type="button" className="btn btn-outline-danger login" onClick={() => logOut()}>Logout</button> : <button type="button" className="btn btn-outline-success" onClick={() => setModal(<LoginForm setAlert={setAlert} loginUser={loginUser} closeModal={() => setModal(null)} />)}>Login</button>}
          {!user && <button type="button" className="btn btn-outline-warning register" onClick={() => setModal(<RegisterForm setAlert={setAlert} closeModal={() => setModal(null)} />)}>Register</button>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
