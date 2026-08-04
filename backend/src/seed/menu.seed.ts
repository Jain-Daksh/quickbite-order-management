import dotenv from 'dotenv';
import { sequelize } from '../config/index';
import { initModels, MenuItem } from '../models/index';

dotenv.config();

const menuItems = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella cheese and basil',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    category: 'Pizza',
    is_available: true,
  },
  {
    name: 'Farmhouse Pizza',
    description: 'Loaded with onion, capsicum, tomato and fresh vegetables',
    price: 399,
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: 'Pizza',
    is_available: true,
  },
  {
    name: 'Paneer Tikka Pizza',
    description: 'Indian style pizza topped with spicy paneer tikka',
    price: 449,
    image_url: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65',
    category: 'Pizza',
    is_available: true,
  },

  {
    name: 'Classic Veg Burger',
    description: 'Crispy vegetable patty with cheese and fresh lettuce',
    price: 149,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'Burger',
    is_available: true,
  },
  {
    name: 'Cheese Burger',
    description: 'Double cheese burger with special sauce',
    price: 199,
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    category: 'Burger',
    is_available: true,
  },
  {
    name: 'Spicy Paneer Burger',
    description: 'Spicy paneer patty burger with mint sauce',
    price: 229,
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    category: 'Burger',
    is_available: true,
  },

  {
    name: 'Classic French Fries',
    description: 'Crispy golden salted potato fries',
    price: 99,
    image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    category: 'Fries',
    is_available: true,
  },
  {
    name: 'Cheese Loaded Fries',
    description: 'French fries topped with cheese and sauces',
    price: 179,
    image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d',
    category: 'Fries',
    is_available: true,
  },

  {
    name: 'White Sauce Pasta',
    description: 'Creamy pasta cooked with white sauce and herbs',
    price: 249,
    image_url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    category: 'Pasta',
    is_available: true,
  },
  {
    name: 'Arrabbiata Pasta',
    description: 'Italian pasta with spicy tomato sauce',
    price: 229,
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    category: 'Pasta',
    is_available: true,
  },
];

const seedMenu = async () => {
  try {
    initModels(sequelize);

    await sequelize.authenticate();

    console.log('Database connected');

    await MenuItem.bulkCreate(menuItems);

    console.log('10 menu items inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);

    process.exit(1);
  }
};

seedMenu();
