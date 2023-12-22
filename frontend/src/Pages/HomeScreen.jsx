import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Components/Pagination/Pagination';
import { CartContext } from '../Context/CartContext';
import Swal from 'sweetalert2'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const { addItem } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const quantity = 1;

    addItem(product, quantity);

    Swal.fire({
      title: `${product.title}`,
      text: "Producto agregado correctamente!",
      icon: "success"
    });
  };

  const fetchProducts = async (page) => {
    try {
      const result = await axios.get(
        `https://coder-ecommerce-gugg.onrender.com/api/products?page=${page}`
      );

      const { products: paginatedProducts, control } = result.data.response;

      setProducts(paginatedProducts);
      setPaginationInfo(control);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = paginationInfo.totalPages;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div className='container'>
      <h1 className="d-flex justify-content-center m-4">
        Todos Los Productos Paginados
      </h1>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="row row-cols-1 row-cols-md-3 g-4 container-fluid">
        {products.map((product) => (
          <div key={product._id} className="col">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
              </div>
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
      <div className="m-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
