
  
  document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/users/logout')
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: res.data.message,
          });
          window.location.href = 'http://localhost:3000/login';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

