import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import Cart from './Cart/Cart';
import { useAuth } from '../../Context/AuthContext';
import Logout from '../Logout/Logout';

const Navbar = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const itemCount = 3;


 

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-secondary-subtle">
        <div className="container-fluid">
          <Link to="/" className="nav-link active">
            E-COMMERCE PRENDAS DE VESTIR
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse h5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto  mb-lg-0 ">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Productos
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorias
                </a>
                <ul className="dropdown-menu ">
                  <li>
                    <Link
                      to="/products/polos"
                      className="dropdown-item nav-link"
                    >
                      Polos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/pantalones"
                      className="dropdown-item nav-link"
                    >
                      Pantalones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/zapatos"
                      className="dropdown-item nav-link"
                    >
                      Zapatos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/gorras"
                      className="dropdown-item nav-link"
                    >
                      Gorras
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/contactanos" className="nav-link">
                  Contáctanos
                </Link>
              </li>
            </ul>
            <SearchForm />
            <div className="gap-3 m-2">
              {isAuthenticated ? (
                <>
                  <img
                    src={userInfo.photo}
                    alt="User Avatar"
                    className="m-1 rounded-circle"
                    style={{
                      width: '30px',
                      height: '30px',
                      objectFit: 'cover',
                    }}
                  />
                  <span className="m-1 text-black">
                    Bienvenido, {userInfo.name}
                  </span>
                  <Logout />
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="m-1 btn btn-outline-danger">
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="m-1 btn btn-outline-danger"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            <div>
              <Cart itemCount={itemCount} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
