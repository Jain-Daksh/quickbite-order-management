import request from 'supertest';

import app from '../app';

describe('Menu API', () => {
  describe('GET /api/menu', () => {
    it('should return all menu items', async () => {
      const response = await request(app).get('/api/menu');

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty('data');

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return menu items with required fields', async () => {
      const response = await request(app).get('/api/menu');

      const item = response.body.data[0];

      expect(item).toHaveProperty('id');

      expect(item).toHaveProperty('name');

      expect(item).toHaveProperty('price');

      expect(item).toHaveProperty('category');
    });
  });

  describe('GET /api/menu/:id', () => {
    it('should return menu item by id', async () => {
      const allMenu = await request(app).get('/api/menu');

      const id = allMenu.body.data[0].id;

      const response = await request(app).get(`/api/menu/${id}`);

      expect(response.statusCode).toBe(200);

      expect(response.body.data.id).toBe(id);
    });

    it('should return error for invalid id', async () => {
      const response = await request(app).get('/api/menu/invalid-id');

      expect(response.statusCode).not.toBe(200);
    });
  });

  describe('GET /api/menu/category/:category', () => {
    it('should return pizza items', async () => {
      const response = await request(app).get('/api/menu/category/Pizza');

      expect(response.statusCode).toBe(200);

      response.body.data.forEach((item: any) => {
        expect(item.category).toBe('Pizza');
      });
    });
  });
});
