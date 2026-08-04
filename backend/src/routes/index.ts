import { Router } from 'express';

import testRoutes from './hello.routes';
import menuRoutes from './menu.routes';

const router = Router();

router.use('/', testRoutes);
menuRoutes(router);

export default router;
