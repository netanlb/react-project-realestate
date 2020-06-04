import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import InApt from './InApt';
import '../Styles/viewApartment.css';

export default function ViewApartment({ data, closeApartmentView }) {
  const pics = data.img && data.img.slice(1, data.img.length).map((img) => <div className="carousel-item"><img className="img-fluid" src={img} alt="..." /></div>);

  let date;
  if (data.entranceDate) {
    date = new Date(data.entranceDate);
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className="apartment-info mx-auto" style={{ width: '90%', marginTop: '1em' }}>
      <button type="button" className="close" aria-label="Close" onClick={closeApartmentView} style={{ position: 'relative', right: 20 }}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="row rounded combined" style={{ backgroundColor: '#eeeeee', padding: '1em', height: '85vh' }}>
        <div className="col-lg-8 col-md-12">
          <div className="picture-slide">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={data.img && data.img[0]} className="position-relative img-fluid" style={{ maxHeight: '80vh' }} alt="..." />
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
        </div>
        <div className="col details">
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
            <a href={`apartment/${data._id}`}>Open apartment page</a>
            <button
              type="button"
              className="btn btn-secondary btn-sm float-right"
              onClick={() => {
                const url = `${window.location.href}apartment/${data._id}`;
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = url;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
              }}
            >
              Copy Link
            </button>
          </div>
          <div className="container p-2">{data.address && <MapContainer data={data} />}</div>
        </div>
      </div>
    </div>
  );
}

ViewApartment.propTypes = {
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
