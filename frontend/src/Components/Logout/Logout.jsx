import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useAuth } from '../../Context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://coder-ecommerce-gugg.onrender.com/api/users/logout',
        null, // Puedes enviar null o un objeto vacío en el cuerpo de la solicitud
        {
          withCredentials: true,
        }
      );

      logout();
      Swal.fire('Cierre de session exitoso!');
      window.location.reload(); 
      navigate('/auth/login');
    // Recargar la página para actualizar el estado de autenticación correctamente.
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized. Redirecting to login page.');
        navigate('/auth/login');
      }

      if (error.response) {
   
        console.error('Server response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió una respuesta
        console.error('No response received:', error.request);
      } else {
        // Algo sucedió en la configuración de la solicitud que provocó un error
        console.error('Request setup error:', error.message);
      }
    }
  };
  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default Logout;
