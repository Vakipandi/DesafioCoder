import 'dotenv/config.js';
import { expect } from 'chai';
import supertest from 'supertest';
import dao from '../../src/dao/factory.js';

const { Product } = dao;

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe('Testing PRODUCTS', () => {
  //   const model = new Product();
  const data = {
    title: 'Product Test',
    price: 19.99,
    stock: 10,
    category: 'Electronics',
    description: 'Product description',
    code: 'ABñmhsdfd123',
  };

  it('Must create a product and response with statusCode = 201', async () => {
    const response = await requester.post('/products').send(data);
    expect(response.statusCode).to.equal(201);
  });

  it('Must read all products', async () => {
    const response = await requester.get('/products/all');
    

    expect(response.statusCode).to.equal(201);
    expect(response.body.response.products.length).to.be.greaterThan(0);
  });

  it('Must update a product', async () => {

    const response = await requester.put(
      '/products/64cfd7a71f0dec72e408c6ab'
    ).send({
      title: 'Produgfct Test',
      price: 19.99,
      stock: 10,
      category: 'Electronics',
      description: 'Product description',
      code: 'ABñmhsdfgfd123',
    });
   
    expect(response.statusCode).to.equal(200);
    expect(response.body.response.message).to.equal('Product updated');
    expect(response.body.response.product.title).to.equal('Product Test');
    expect(response.body.response.product.price).to.equal(19.99);
    expect(response.body.response.product.stock).to.equal(10);
    expect(response.body.response.product.category).to.equal('Electronics');
    expect(response.body.response.product.description).to.equal(
      'Product description'
    );
    expect(response.body.response.product.code).to.equal('ABñmhsdfd123')

  }).timeout(1000);

  it('Must destroy a product', async () => {
    const response = await requester.delete(
      '/products/64cfd7a71f0dec72e408c6ab'
    );
    console.log(response);
    expect(response.statusCode).to.equal(200);

    expect(response.body.response.message).to.equal('Product deleted');
  });
});
