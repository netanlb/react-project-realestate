import React, { useEffect, useState } from 'react';
import ApartmentWindow from './ApartmentWindow';

const SingleApartment = ({ aptId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/apartment/${aptId}`).then((res) => res.json()).then((json) => setData(json));
  }, [aptId]);

  console.log(data);

  return (
    <div className="container">
      {data && <ApartmentWindow data={data} />}
    </div>
  );
};

export default SingleApartment;
