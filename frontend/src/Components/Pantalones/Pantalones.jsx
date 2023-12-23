import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

import Swal from 'sweetalert2';

const Pantalones = () => {
  const [allPantalones, setAllPantalones] = useState([]);
  const { addItem } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const quantity = 1;

    addItem(product, quantity);

    Swal.fire({
      title: `${product.title}`,
      text: 'Producto agregado correctamente!',
      icon: 'success',
    });
  };

  const getPantalones = async () => {
    const res = await axios.get(
      `https://coder-ecommerce-gugg.onrender.com/api/products/pantalones`
    );
    let pantalones = res.data.response.products;
    setAllPantalones(pantalones);
  };
  useEffect(() => {
    getPantalones();
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-4">Pantalones</h1>
      <div className="row">
        {allPantalones.map((pantalones) => (
          <div
            className="text-center m-4 col-md-4 col-lg-3"
            key={pantalones._id}
          >
            <div className="card mb-4 ">
              <h1 className="card-title">Title: {pantalones.title}</h1>
              <h2 className="card-subtitle mb-2 text-muted">
                Price: S/.{pantalones.price} soles
              </h2>
              <img
                src={pantalones.image}
                alt=""
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <p className="card-text">Category: {pantalones.category}</p>
                <p className="card-text">
                  Description: {pantalones.description}
                </p>
              </div>
              <div className="mx-auto m-3">
                <button
                  className="btn btn-primary mx-auto"
                  onClick={() => handleAddToCart(pantalones)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantalones;
