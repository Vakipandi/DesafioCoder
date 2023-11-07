import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.productos = [];
    this.path = path;
  }

  // READ
  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListParsed = JSON.parse(productList);
        return productListParsed;
      } else {
        return console.error("No se encontro el archivo");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // GENERATE ID
  generateId = async () => {
    if (fs.existsSync(this.path)) {
      const productList = await this.getProducts({});
      if (productList.length === 0) {
        return 1;
      } else {
        const lastProduct = productList[productList.length - 1];
        return lastProduct.id + 1;
      }
    }
  };

  // CREATE
  addProduct = async (obj) => {
    const {
      title,
      description,
      price,
      image,
      category,
      status = true,
      code,
      stock,
    } = obj;

    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      category === undefined ||
      status === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      return console.error("ingrese todos los datos");
    } else {
      const listProduct = await this.getProducts({});
      const codeRepeat = listProduct.find((product) => product.code === code);
      if (codeRepeat) {
        return console.error("El codigo ya existe");
      } else {
        const id = await this.generateId();
        const productNew = {
          id,
          title,
          description,
          price,
          image,
          code,
          category,
          status,
          stock,
        };
        listProduct.push(productNew);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(listProduct, null, 2)
        );
        return productNew;
      }
    }
  };

  updateProduct = async (id, obj) => {
    const { pid } = id;
    const { title, description, price, image, category, status, code, stock } =
      obj;

    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      category === undefined ||
      status === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      return console.error("ingrese todos los datos para la actulizacion");
    } else {
      const allProducts = await this.getProducts({});
      const codeRepeat = allProducts.find((product) => product.code === code);
      if (codeRepeat) {
        return console.error(
          "El codigo del product que desea actualizar es repetido"
        );
      } else {
        const currentProductsList = await this.getProducts({});
        const newProductList = currentProductsList.map((product) => {
          if (product.id === parseInt(pid)) {
            const updatedProduct = {
              ...product,
              title,
              description,
              price,
              image,
              status,
              category,
              code,
              stock,
            };
            return updatedProduct;
          } else {
            return product;
          }
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newProductList, null, 2)
        );
      }
    }
  };

  // DELETE
  deleteProduct = async (id) => {
    const allProducts = await this.getProducts();
    const productFound = allProducts.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productFound, null, 2)
    );
  };

  getProductsById = async (id) => {
    const allProducts = await this.getProducts();
    const productFound = allProducts.find((product) => product.id === id);
    if (productFound) {
      return productFound;
    } else {
      console.error("No se encontro el producto");
    }
  };
}
