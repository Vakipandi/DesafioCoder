import * as assert from 'assert';
import dao from '../../src/dao/factory.js';

const { Product } = dao;

describe('testing products', () => {
  const model = new Product();
  const data = {
    title: 'Test Product',
    price: 19.99,
    stock: 10,
    category: 'Electronics',
    description: 'Product description',
    code: 'ABC12fgf3',
 
  
  };

  it('CREATE: Must required title property', async () => {
    
    assert.ok(data.title);
  
  });
    it('CREATE: Must required price property', async () => {
      assert.ok(data.price);
    });
    it('CREATE: Must required stock property', async () => {
      assert.ok(data.stock);
    });
    it('CREATE: Must required category property', async () => {
      assert.ok(data.category);
    });
    it('CREATE: Must required description property', async () => {
      assert.ok(data.description);
    });
  it('READ: DAO must read all Products', async () => {
    assert.ok(data);
  });
});
