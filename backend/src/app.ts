import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { sequelize } from './config';
import { initModels } from './models';
import router from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'https://quickbite-order-management-nine.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  },
);

initModels(sequelize);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
