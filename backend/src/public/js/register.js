document.getElementById('register').addEventListener('click', (e) => {
  e.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  console.log({ email, password });

  axios
    .post('http://localhost:3000/api/users/register', {
      name: name,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          title: res.data.message,
        });

      }
      window.location.href = 'http://localhost:3000/login';
    })

    .catch((error) => {
      // Agrega un console.log para verificar que el bloque catch se activa
      if (error.response && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
    
        }); // Esto imprimirá "the email is already in use"
      } else {
        console.log('Error desconocido:', error.message);
      }
    });
});
