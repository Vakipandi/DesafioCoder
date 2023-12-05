import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchQuery } = useParams();

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
    <div className="container">
      <h1>Resultados de búsqueda para {searchQuery}</h1>
      {searchResults.map((product) => (
        <div className="card text-center m-4" key={product._id}>
          <img
            src={product.image}
            className="figure-img img-fluid img-thumbnail rounded w-50 mx-auto"
            alt={product.title}
          />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Precio: ${product.price}</p>
            {/* Agrega más detalles según tu modelo de datos */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchScreen;
