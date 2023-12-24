import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud al backend para el registro
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formData
      );

      Swal.fire({
        title: response.data.message,
        text: `Bienvenido ${response.data.response.name}, logueese primero`,
        icon: 'success',
      });

      // lo redirigimos a login
      navigate('/auth/login');

      // Manejar la respuesta del backend
      if (response.data.success) {
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);

      // Maneja el error
      if (error.response) {
        // Si hay una respuesta del servidor, utiliza el mensaje proporcionado
        setError(error.response.data.message);
      } else if (error.request) {
        // Si la solicitud fue hecha pero no se recibió respuesta, muestra un mensaje de error genérico
        setError(
          'Error de red o servidor no disponible. Por favor, inténtalo de nuevo más tarde.'
        );
      } else {
        // Si ocurrió un error durante la configuración de la solicitud, muestra un mensaje de error genérico
        setError(
          'Hubo un error durante la solicitud. Por favor, inténtalo de nuevo.'
        );
      }

      // Muestra la alerta con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message, // Puedes personalizar esto según tu necesidad
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registro</h2>
              <form className="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
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

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Registrarse
                </button>
              </form>
              <p className="mt-3 text-center">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/auth/login">Iniciar sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
