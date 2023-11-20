import { faker } from '@faker-js/faker';
import ProductRepository from '../../repositories/products.rep.js';

const product = async () => {
  let title = faker.commerce.productName();
  let description = faker.commerce.productDescription();
  let price = faker.commerce.price({ min: 10, max: 1000 });
  let image = faker.image.urlLoremFlickr({ category: 'food' });
  let code = faker.string.uuid();
  let status = true;
  let category = faker.commerce.productMaterial();
  let stock = faker.number.int({ max: 6000 });

  return { title, description, price, image, code, status, category, stock };
};

const fakeData = async () => {
  try {
    let productRepository = new ProductRepository();
    for (let i = 0; i < 10; i++) {
      let data = await product();
      await productRepository.createRepository(data);
    }
    console.log('products created');
  } catch (error) {
    console.error(error);
  }
};

fakeData();
