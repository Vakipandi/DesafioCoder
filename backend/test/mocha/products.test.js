import * as assert from 'assert';
import dao from '../../src/dao/factory.js';

const { Product } = dao;

describe('testing products', async () => {
  const model = new Product();

  const data = await model.readAllModel();
  const dataProd = await data.response.products
 
 

  it('CREATE: Must required title property', async () => {
    assert.ok(dataProd.title);
  });
  it('CREATE: Must required price property', async () => {
    assert.ok(dataProd.price);
  });
  it('CREATE: Title is a string', async () => {
    assert.strictEqual(typeof dataProd.title, 'string');
  });
  it('CREATE: Must required category property', async () => {
    assert.ok(dataProd.category);
  });
  it('CREATE: Must required description property', async () => {
    assert.ok(dataProd.description);
  });
  it('READ: DAO must read all Products', async () => {
    assert.ok(dataProd);
  });
});

  // const data = {
  //   title: 'Test Product',
  //   price: 19.99,
  //   stock: 10,
  //   category: 'Electronics',
  //   description: 'Product description',
  //   code: 'ABC12fgf3',
  // };

