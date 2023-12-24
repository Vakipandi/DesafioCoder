import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import Swal from 'sweetalert2';

const Polos = () => {
  const [allPolos, setAllPolos] = useState([]);
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

  const getPolos = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/polos`
    );
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
          <div className="text-center m-4 col-md-4 col-lg-3" key={polo._id}>
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
              <div className="mx-auto m-3">
                <button
                  className="btn btn-primary mx-auto"
                  onClick={() => handleAddToCart(polo)}
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

export default Polos;
