import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Swal from 'sweetalert2';


const Zapatos = () => {
  const [allZapatos, setAllZapatos] = useState([]);
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

  const getZapatos = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/zapatos`);
    let zapatos = res.data.response.products;
    setAllZapatos(zapatos);
  };
  useEffect(() => {
    getZapatos();
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-4">Zapatos</h1>
      <div className="row">
        {allZapatos.map((zapatos) => (
          <div className="text-center m-4 col-md-4 col-lg-3" key={zapatos._id}>
            <div className="card mb-4">
              <h1 className="card-title">Title: {zapatos.title}</h1>
              <h2 className="card-subtitle mb-2 text-muted">
                Price: S/.{zapatos.price} soles
              </h2>
              <img
                src={zapatos.image}
                alt=""
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <p className="card-text">Category: {zapatos.category}</p>
                <p className="card-text">Description: {zapatos.description}</p>
              </div>
              <div className="mx-auto m-3">
                <button
                  className="btn btn-primary mx-auto"
                  onClick={() => handleAddToCart(zapatos)}
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

export default Zapatos;
