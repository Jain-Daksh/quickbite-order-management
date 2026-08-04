import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  logging: false,
});

try {
  sequelize.authenticate();
  console.log('database connected');
} catch (error) {
  console.error('Unable to connect to database', error);
}
export default sequelize;
