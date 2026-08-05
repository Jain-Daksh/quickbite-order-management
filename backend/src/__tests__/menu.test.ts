import request from 'supertest';
import app from '../app';

describe('Menu API', () => {
  describe('GET /api/menu', () => {
    it('should get all menu items', async () => {
      const res = await request(app).get('/api/menu');

      expect(res.statusCode).toBe(200);

      expect(res.body).toHaveProperty('data');

      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should return menu item fields', async () => {
      const res = await request(app).get('/api/menu');

      const item = res.body.data[0];

      expect(item).toHaveProperty('id');

      expect(item).toHaveProperty('name');

      expect(item).toHaveProperty('price');

      expect(item).toHaveProperty('category');
    });
  });

  describe('GET /api/menu/:id', () => {
    it('should get menu by id', async () => {
      const all = await request(app).get('/api/menu');

      const id = all.body.data[0].id;

      const res = await request(app).get(`/api/menu/${id}`);

      expect(res.statusCode).toBe(200);

      expect(res.body.data.id).toBe(id);
    });

    it('should fail for wrong id', async () => {
      const res = await request(app).get('/api/menu/random');

      expect(res.statusCode).not.toBe(200);
    });
  });
});
