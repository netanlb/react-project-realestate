import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import '../Styles/switchTransition.css';

import Apartment from './Apartment';
import ScrollBtns from './ScrollBtns';
import alertMassage from './alertMassage';
import Filter from './Filter';
import UserInterface from './UserInterface';

class ApartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDisplay: 0,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { apartments } = this.props;
    if (prevProps.apartments !== apartments) {
      this.setState({ curDisplay: 0 });
    }
  }

  onScrollLeft = () => {
    const { apartments, numToDisplay } = this.props;
    const { curDisplay } = this.state;
    if (apartments.length > curDisplay + numToDisplay) {
      this.setState({
        curDisplay: curDisplay + numToDisplay,
      });
    }
  }

  onScrollRight = () => {
    const { curDisplay } = this.state;
    const { numToDisplay } = this.props;
    if (curDisplay > 0) {
      this.setState({
        curDisplay: curDisplay - numToDisplay,
      });
    }
  }

  render() {
    const { curDisplay } = this.state;
    const { apartments, numToDisplay, setModal, removeApartment, user, onLike, massage, setAlert, fetchApartments, addApartment, liked } = this.props;

    return (
      <div className="container" style={{ marginTop: '4em' }}>
        <UserInterface user={user} setModal={setModal} addApartment={addApartment} setAlert={setAlert} massage={massage} />
        <CSSTransition
          in={massage}
          timeout={300}
          classNames="col"
        ><div>
          {massage
            && (
              alertMassage(massage.color, massage.msg, setAlert)
            )}
        </div>
        </CSSTransition>
        <div className="collapse" id="filter">
          <div>
            <Filter fetchApartments={fetchApartments} />
          </div>
        </div>
        <SwitchTransition>
          <CSSTransition
            key={curDisplay || apartments}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames="pop"
          >
            <div className="aptlist">
              <div className="row">
                {apartments.slice(curDisplay, curDisplay + numToDisplay)
                  .map((apt) => (
                    <Apartment
                      setAlert={setAlert}
                      onLike={onLike}
                      user={user}
                      removeApartment={removeApartment}
                      data={apt}
                      setModal={setModal}
                      liked={liked}
                    />
                  ))}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <ScrollBtns onScrollLeft={this.onScrollLeft} onScrollRight={this.onScrollRight} />
      </div>
    );
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object),
  numToDisplay: PropTypes.number,
  removeApartment: PropTypes.func.isRequired,
};

ApartmentList.defaultProps = {
  apartments: [],
  numToDisplay: 0,
};

export default ApartmentList;
