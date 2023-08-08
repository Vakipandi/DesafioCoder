const socketClient = io();

socketClient.on("sendProducts", (obj) => {
  updateProductList(obj);
});

const updateProductList = (product) => {
  let div = document.getElementById("list-products");
  let products = "";

  product.forEach((prod) => {
    products += `
    <article class="container">
      <div class="card">
        <div class="imgBx">
          <img src="${prod.image}" width="150" />
        </div>
        <div class="contentBx">
          <h2>${prod.title}</h2>
          <div class="size">
            <h3>${prod.description}</h3>
            
          </div>
          <div class="color">
            <h3>Precio : </h3>
            <span class="soles">S/. ${prod.price} soles</span>
            
          </div>
          <a href="#">Buy Now</a>
        </div>
      </div>
  </article>
      `;
  });
  div.innerHTML = products;
};

let form = document.getElementById("formProduct");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let image = document.getElementById("image").value;
  let stock = document.getElementById("stock").value;
  let code = document.getElementById("code").value;
  let category = document.getElementById("category").value;
  let product = {
    title,
    price,
    description,
    image,
    stock,
    code,
    category
  };
  socketClient.emit("addProduct", product);
  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", () => {
  const deleteIdInput = document.getElementById("delete-id");
  const deleteId = deleteIdInput.value;
  socketClient.emit("deleteProduct", deleteId);
  deleteIdInput.value = "";
})