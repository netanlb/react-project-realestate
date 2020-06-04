import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import InApt from './InApt';
import '../Styles/apartmentWindow.css';

export default function ApartmentWindow({ data }) {
  const pics = data.img && data.img.slice(1, data.img.length).map((img) => <div className="carousel-item"><img className="img-fluid" src={img} alt="..." /></div>);

  let date;
  if (data.entranceDate) {
    date = new Date(data.entranceDate);
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className="row rounded p-4" style={{ marginTop: '3em'}}>
      <div className="col-md">
        <div className="picture-slide">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={data.img && data.img[0]} className="position-relative img-fluid border rounded" style={{ maxHeight: '80vh' }} alt="..." />
              </div>
              {pics}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="map-md container mt-3">{data.address && <MapContainer data={data} />}</div>
      </div>
      <div className="col-md">
        <div className="border rounded p-4" style={{ backgroundColor: '#ffff' }}>
          <h6>{data.address && `${data.address.name}, ${data.city}`}</h6>
          <div className="row">
            <div className="col">
              <p>Meters² <span className="h6">{data.squareMeters}</span></p>
            </div>
            <div className="col">
              <p>Rooms <span className="h6">{data.rooms}</span></p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Price <span className="h6">{data.price ? data.price : 'Not specified'}</span></p>
            </div>
            <div className="col">
              <p>Entrance date <span className="h6">{date ? date : 'Not specified'}</span></p>
            </div>
          </div>
          <hr />
          <p className="h6">Description<br /></p>{data.description && data.description}
        </div>
        <div className="border rounded p-4 mt-2" style={{ backgroundColor: '#ffff' }}>
          <p className="h6">What's in the apartment?</p><br />
          <InApt data={data} />
        </div>
        <div className="border rounded p-4 mt-2" style={{ backgroundColor: '#ffff' }}>
          <p className="h6">Contact info</p>
          <p>Phone<span className="h6"> &nbsp;{data.phone}</span></p>
          <p>Email<span className="h6"> &nbsp;{data.email}</span></p>
        </div>
        <div className="border rounded p-4 mt-2" style={{ backgroundColor: '#ffff' }}>
          <p className="h6">Sharing</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              const url = window.location.href;
              const dummy = document.createElement('input');
              document.body.appendChild(dummy);
              dummy.value = url;
              dummy.select();
              document.execCommand('copy');
              document.body.removeChild(dummy);
            }}
          >
            Copy Shareable Link
          </button>
        </div>
        <div className="map-sm container mt-3">{data.address && <MapContainer data={data} />}</div>
      </div>
    </div>
  );
}

ApartmentWindow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.number,
    adress: PropTypes.string,
    pic: PropTypes.object,
    price: PropTypes.number,
    description: PropTypes.string,
    rooms: PropTypes.number,
    img: PropTypes.array,
  }).isRequired,
  closeApartmentView: PropTypes.func.isRequired,
};
