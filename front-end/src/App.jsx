import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ApartmentContainer from './Components/ApartmentContainer';
import NavBar from './Components/NavBar';
import SingleApartment from './Components/SingleApartment';
import './Styles/switchTransition.css';
import { Router } from '@reach/router';

class App extends Component {
  blackScreenStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, marginTop: '3em',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      modalComponent: null,
      liked: [],
      likedApartments: null,
      fetchApartments: null,
      massage: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token) {
      this.setState({ user: { token, name } });
    }
    const liked = localStorage.getItem('liked');
    if (liked) {
      this.setState({ liked: liked.split(',') });
    }
  }

  setAlert = (msg, color) => {
    const { modalComponent } = this.state;
    const message = msg ? { msg, color } : null;
    const newModal = modalComponent
      ? React.cloneElement(modalComponent, { massage: message }) : null;
    this.setState({
      massage: message,
      modalComponent: newModal,
    });
  };

  loginUser = (name, token) => {
    this.setState({ user: { name, token } });
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  getFetchFunction = (callback) => this.setState({ fetchApartments: callback })

  triggerLiked = (triggered) => this.setState({ likedApartments: triggered });

  setModal = (component) => {
    this.setState({ modalComponent: component });
  }

  logOut = () => {
    this.setAlert(`${this.state.user.name} logged out`, 'warning');
    this.setState({ user: false });
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  onLike = (like) => {
    const { liked } = this.state;
    let addLike = true;
    liked.forEach((v) => {
      if (v === like) {
        addLike = false;
        this.setState({ liked: liked.filter((c) => c !== v) });
        const likes = [liked.filter((c) => c !== v)];
        localStorage.setItem('liked', likes);
      }
    });
    if (addLike) {
      this.setState({ liked: [...liked, like] });
      const likes = [...liked, like];
      localStorage.setItem('liked', likes);
    }
  }

  render() {
    const {
      modalComponent,
      liked,
      likedApartments,
      fetchApartments,
      user,
      massage,
    } = this.state;

    return (
      <div className="app">
        <NavBar
          likedApartments={likedApartments}
          setModal={this.setModal}
          liked={liked}
          logOut={this.logOut}
          fetchApartments={fetchApartments}
          loginUser={this.loginUser}
          user={user}
          setAlert={this.setAlert}
        />
        <Router>
          <SingleApartment path="/apartment/:aptId" />
          <ApartmentContainer
            path="/"
            getFetchFunction={this.getFetchFunction}
            triggerLiked={this.triggerLiked}
            onLike={this.onLike}
            setModal={this.setModal}
            user={user}
            massage={massage}
            setAlert={this.setAlert}
            modalComponent={modalComponent}
            liked={liked}
          />
        </Router>
        <CSSTransition
          in={modalComponent}
          timeout={300}
          classNames="fade"
        >
          <div>
            {modalComponent && (
              <div style={this.blackScreenStyle}>
                {modalComponent}
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
