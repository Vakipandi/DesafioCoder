import MyRouter from '../router.js'; // Asegúrate de que la ruta del router sea correcta
import dao from '../../dao/factory.js';

const { Product } = dao;

export default class SearchRouter extends MyRouter {
  init() {
    this.create('/:searchQuery', ['PUBLIC'], async (req, res, next) => {
      const { searchQuery } = req.params;

      try {
        let model = new Product();
        const response = await model.searchProducts(searchQuery);

        if (!response || !response.response || !response.response.products) {
          console.log('No se obtuvo una respuesta válida del modelo');
          return res.sendNotFound();
        }

        if (response.response.products.length === 0) {
          console.log('No se encontraron productos');
          return res.sendNotFound();
        }

        response.response.products.forEach((product) => {
          product.price = product.price.toString();
        });

        return res.sendSuccessCreate(response);
      } catch (error) {
        console.error('Error en el controlador de búsqueda:', error);
        next(error);
      }
    });
  }
}
