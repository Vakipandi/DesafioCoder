import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import Swal from 'sweetalert2';

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchQuery } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          `http://localhost:5000/api/search/${searchQuery}`
        );

        const prodsFound = result.data.response.products;

        if (result && prodsFound.length > 0) {
          setSearchResults(prodsFound);
        } else {
          console.log('No se encontraron resultados');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    // Llama a la función fetchData solo si hay un searchQuery válido
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="container text-center">
      <h1>Resultados de búsqueda para {searchQuery}</h1>
      <div className="row">
        {searchResults.map((product) => (
          <div
            className="card text-center m-4 col-md-4 col-lg-3"
            key={product._id}
          >
            <img
              src={product.image}
              className="figure-img img-fluid img-thumbnail rounded w-50 mx-auto"
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <div className="mx-auto m-3">
                <button
                  className="btn btn-primary mx-auto"
                  onClick={() => handleAddToCart(product)}
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

export default SearchScreen;
