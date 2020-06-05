import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import '../Styles/switchTransition.css';

import Apartment from './Apartment';
import ScrollBtns from './ScrollBtns';

class ApartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDisplay: 0,
      numToDisplay: 6,
    };
  }

  componentDidMount() {
    if (document.body.scrollWidth < 770) {
      this.setState({ numToDisplay: 1 });
    }
  }

  componentDidUpdate = (prevProps) => {
    const { apartments } = this.props;
    if (prevProps.apartments !== apartments) {
      this.setState({ curDisplay: 0 });
    }
  }

  onScrollLeft = () => {
    const { numToDisplay, curDisplay } = this.state;
    const { apartments } = this.props;
    if (apartments.length > curDisplay + numToDisplay) {
      this.setState({
        curDisplay: curDisplay + numToDisplay,
      });
    }
  }

  onScrollRight = () => {
    const { curDisplay, numToDisplay } = this.state;
    if (curDisplay > 0) {
      this.setState({
        curDisplay: curDisplay - numToDisplay,
      });
    }
  }

  render() {
    const { curDisplay, numToDisplay } = this.state;
    const { apartments, setModal, removeApartment, user, onLike, setAlert, liked } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col ml-2">
            <p style={{ color: '#A9A9A9' }}>{apartments.length} results.</p>
          </div>
        </div>
        <SwitchTransition>
          <CSSTransition
            key={curDisplay || apartments}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames="pop"
          >
            <div>
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
            </div>
          </CSSTransition>
        </SwitchTransition>
        <ScrollBtns onScrollLeft={this.onScrollLeft} onScrollRight={this.onScrollRight} length={apartments.length} curDisplay={curDisplay} numToDisplay={numToDisplay} />
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
