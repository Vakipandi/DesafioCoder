import axios from 'axios';
import { useEffect, useState } from 'react';
const Gorras = () => {
  const [allGorras, setAllGorras] = useState([]);

  const getGorras = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/gorras`);
    let gorras = res.data.response.products;
    setAllGorras(gorras);
  };
  useEffect(() => {
    getGorras();
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-4">Gorras</h1>
      <div className="row">
        {allGorras.map((gorras) => (
          <div className="col-12 col-sm-6" key={gorras._id}>
            <div className="card mb-4">
              <h1 className="card-title">Title: {gorras.title}</h1>
              <h2 className="card-subtitle mb-2 text-muted">
                Price: S/.{gorras.price} soles
              </h2>
              <img
                src={gorras.image}
                alt=""
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <p className="card-text">Category: {gorras.category}</p>
                <p className="card-text">Description: {gorras.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gorras;
