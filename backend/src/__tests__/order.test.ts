import request from 'supertest';
import app from '../app';

describe('Order API', () => {
  let orderNumber: string;

  describe('POST /api/orders', () => {
    it('should create order', async () => {
      const menu = await request(app).get('/api/menu');
      const itemId = menu.body.data[0].id;
      const res = await request(app)
        .post('/api/orders')
        .send({
          customer_name: 'Test User',

          phone: '9999999999',

          address: 'Udaipur Rajasthan',

          items: [
            {
              menu_item_id: itemId,
              quantity: 1,
            },
          ],
        });

      expect(res.statusCode).toBe(200);

      expect(res.body.data).toHaveProperty('order');

      expect(res.body.data.order).toHaveProperty('order_number');

      orderNumber = res.body.data.order.order_number;
    });
  });
});
