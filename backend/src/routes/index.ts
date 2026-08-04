import { Router } from 'express';

import testRoutes from './hello.routes';

const router = Router();

router.use('/', testRoutes);

export default router;
