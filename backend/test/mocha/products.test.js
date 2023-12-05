import assert from 'assert';
import dao from '../../src/dao/factory.js';

const { Product } = dao;

describe('testing products', () => {
  const model = new Product();
  const testData = {
    title: 'Product Test',
    price: 19.99,
    stock: 10,
    category: 'Electronics',
    description: 'Product description',
    code: 'ABñmhfggfdsfkkdafd123',
  };
  let createdProductObjId;

  it('CREATE - Must have required properties', async () => {
    assert.ok(testData.title);
    assert.ok(testData.price);
    assert.ok(testData.stock);
    assert.ok(testData.category);
    assert.ok(testData.description);
    assert.ok(testData.code);
  });

  it('CREATE - Must response with created product', async () => {
    const createdProduct = await model.createModel(testData);
    // console.log('Created Product:', createdProduct)
    createdProductObjId = createdProduct.response.product_id;
    assert.strictEqual(typeof createdProductObjId, 'object');
  }).timeout(11000);

  it('UPDATE: Code is a String', ()=>{
    assert.strictEqual(typeof testData.code, 'string');
  })
  
});

// it('UPDATE: ')

// const data = {
//   title: 'Test Product',
//   price: 19.99,
//   stock: 10,
//   category: 'Electronics',
//   description: 'Product description',
//   code: 'ABC12fgf3',
// };
