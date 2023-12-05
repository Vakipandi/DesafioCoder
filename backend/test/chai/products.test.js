import { expect } from 'chai';
import dao from '../../src/dao/factory.js';

const { Product } = dao;

describe('testing Product', () => {
  const model = new Product();
  const testData = {
    title: 'Product Test',
    price: 19.99,
    stock: 10,
    category: 'Electronics',
    description: 'Product description',
    code: 'ABg6867fkkd5yjhj8623',
  };
  let id2 = null;

  it('CREATE - Must return n object', async () => {
    let response = await model.readModelById("64cfd7a71f0dec72e408c6b2");
    expect(response).to.be.an('object');
  }).timeout(5000);

  it('CREATE - Must return an oject an _id property', async () => {
    let response = await model.readModelById("64cfd7a71f0dec72e408c6b2");
    let id = response.response.product._id;
    expect(id).to.be.ok;
  });

  it('READ - Must return an object', async () => {
    let response = await model.readModelById("64cfd7a71f0dec72e408c6b2");
    expect(response).to.be.an('object');
  
  })
    

});
