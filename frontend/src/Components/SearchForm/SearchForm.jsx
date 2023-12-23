import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        `https://coder-ecommerce-gugg.onrender.com/api/search/${searchQuery}`
      );

      const prodsFound = result.data.response.products;

      if (result && prodsFound.length > 0) {
        // Usar navigate para redirigir de manera programática
        navigate(`/search/${searchQuery}`);
      } else {
        console.log('No se encontraron resultados');
      }

      setSearchQuery('');
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleFormSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />

      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
