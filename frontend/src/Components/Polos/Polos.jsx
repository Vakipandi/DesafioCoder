import axios from 'axios';
import { useEffect, useState } from 'react';
const Polos = () => {
  const [allPolos, setAllPolos] = useState([]);

  const getPolos = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/polos`);
    let polos = res.data.response.products;
    setAllPolos(polos);
  };
  useEffect(() => {
    getPolos();
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-4">Polos</h1>
      <div className="row">
        {allPolos.map((polo) => (
          <div className="col-12 col-sm-6" key={polo._id}>
            <div className="card mb-4">
              <h1 className="card-title">Title: {polo.title}</h1>
              <h2 className="card-subtitle mb-2 text-muted">
                Price: S/.{polo.price} soles
              </h2>
              <img src={polo.image} alt="" className="card-img-top img-fluid" />
              <div className="card-body">
                <p className="card-text">Category: {polo.category}</p>
                <p className="card-text">Description: {polo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polos;
