import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import GitHubLoginButton from '../Components/GitHubLoginButton/GitHubLoginButton';

const LoginScreen = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.response) {
        setError(null);

        // Llamar a la función login del contexto de autenticación
        login(response.data.user);

        // Redirigir al usuario a la página principal
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(
        'Error de red o servidor no disponible. Por favor, inténtalo de nuevo más tarde.'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>
              <form className="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="mb-2 btn btn-primary w-100">
                  Iniciar Sesión
                </button>
                <br />
              </form>
              {/* <GitHubLoginButton /> */}
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              <p className="mt-3 text-center">
                ¿No tienes una cuenta?{' '}
                <Link to="/auth/register">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
