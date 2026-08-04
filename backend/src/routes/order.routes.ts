import { Router } from 'express';

import { OrderController } from '../controllers/order.controller';

const router = Router();

export default (app: Router) => {
  router.post('/', OrderController.createOrder);

  router.post('/get', OrderController.getOrderById);

  router.patch('/:id/status', OrderController.updateOrderStatus);

  app.use('/api/orders', router);
};
