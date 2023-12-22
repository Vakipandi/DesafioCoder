// import axios from 'axios';

const GitHubLoginButton = () => {
  //   const handleGitHubLogin = async () => {
  //     try {
  //       let response = await axios.get(
  //         'http://localhost:5000/api/users/github/login'
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error al iniciar sesión con GitHub:', error);
  //     }
  //   };

  return (
    <a
      href={`http://localhost:5000/api/users/github/login`}
      className="mb-2 btn btn-primary w-100"
      //   onClick={handleGitHubLogin}
    >
      Iniciar Sesión con GitHub
    </a>
  );
};

export default GitHubLoginButton;
