import { Router } from 'express';

import testRoutes from './hello.routes';
import menuRoutes from './menu.routes';
import orderRoutes from './order.routes';
const router = Router();

router.use('/', testRoutes);
menuRoutes(router);
orderRoutes(router);

export default router;
