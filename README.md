# QuickBite Order Management Backend

## QuickBite Order Management Backend Documentation

---

# 1. Project Overview

QuickBite Order Management Backend is a REST API service built using **Node.js, Express.js, TypeScript, Sequelize ORM, and PostgreSQL**.

The backend manages:

- Menu items
- Order items
- Order status tracking
- Database relationships
- API validation
- Order processing logic

---

# 2. Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL (Neon Database)

## ORM

- Sequelize

## Validation

- Zod

## Security & Middleware

- CORS
- dotenv

---

# 3. Project Structure

```
backend
│
├── src
│   │
│   ├── app.ts
│   │
│   ├── config
│   │   ├── database.ts
│   │   ├── business.config.ts
│   │   └── index.ts
│   │
│   ├── models
│   │   ├── MenuItem.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── associations.ts
│   │   ├──├── MenuItem.associations.ts
│   │   ├──├── Order.associations.ts
│   │   ├──├── OrderItem.associations.ts
│   │   ├──├── index.associations.ts
│   │   └── index.ts
│   │
│   ├── controllers
│   │   ├── menu.controller.ts
│   │   └── order.controller.ts
│   │
│   ├── service
│   │   ├── menu.service.ts
│   │   └── order.service.ts
│   │
│   ├── routes
│   │   ├── index.ts
│   │   ├── menu.routes.ts
│   │   └── order.routes.ts
│   │
│   ├── serializer
│   │   └── order.serializer.ts
│   │
│   ├── validations
│   │   └── order.validation.ts
│   │
│   ├── utils
│   │   └── apiResponse.ts
│   │
│   └── seed
│       └── menu.seed.ts
│
├── package.json
└── tsconfig.json
```

---

# 4. Environment Configuration

Create `.env`

```env
PORT=5000

DATABASE_URL=postgresql://username:password@host/database

FRONTEND_URL=http://localhost:5173
```

---

# 5. Database Models

## MenuItem

Stores available food items.

### Table

```
menu_items
```

### Fields

| Column       | Type    |
| ------------ | ------- |
| id           | UUID    |
| name         | String  |
| description  | Text    |
| price        | Decimal |
| image_url    | String  |
| category     | String  |
| is_available | Boolean |
| created_at   | Date    |
| updated_at   | Date    |

---

## Order

Stores customer orders.

### Table

```
orders
```

### Fields

| Column        | Type    |
| ------------- | ------- |
| id            | UUID    |
| order_number  | BIGINT  |
| customer_name | String  |
| phone         | String  |
| address       | Text    |
| status        | ENUM    |
| total_amount  | Decimal |
| created_at    | Date    |
| updated_at    | Date    |

### Order Status

```
ORDER_RECEIVED
PREPARING
OUT_FOR_DELIVERY
DELIVERED
```

---

## OrderItem

Stores individual products inside an order.

### Table

```
order_items
```

### Fields

| Column       | Type    |
| ------------ | ------- |
| id           | UUID    |
| order_id     | UUID    |
| menu_item_id | UUID    |
| quantity     | Integer |
| price        | Decimal |
| subtotal     | Decimal |

---

# 6. Database Relationships

## Order → OrderItem

One order can contain multiple items.

```
Order
 |
 | hasMany
 |
OrderItem
```

## MenuItem → OrderItem

A menu item can appear in multiple orders.

```
MenuItem
 |
 | hasMany
 |
OrderItem
```

### Associations

```ts
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

MenuItem.hasMany(OrderItem, {
  foreignKey: 'menuItemId',
  as: 'orderItems',
});

OrderItem.belongsTo(MenuItem, {
  foreignKey: 'menuItemId',
  as: 'menuItem',
});
```

---

# 7. API Response Format

All APIs follow:

```json
{
  "code": 200,
  "message": "Success message",
  "data": {}
}
```

Error response:

```json
{
  "code": 400,
  "message": "Error message",
  "data": {},
  "error": {}
}
```

---

# 8. Business Rules

## Maximum Quantity Per Product

Configured in:

```
config/business.config.ts
```

Example:

```ts
export const businessConfig = {
  maxQtyAllowed: 6,
};
```

Rules:

- Customer cannot order more than the allowed quantity of a single product.
- Validation happens before order creation.

---

# 9. Validation

Validation is handled using **Zod**.

Example rules:

```
customer_name
minimum 3 characters

phone
minimum 10 digits

items
minimum 1 item required
```

Invalid request:

```json
{
  "code": 400,
  "message": "Customer name is required"
}
```

---

# 10. Seed Data

Menu seed creates:

- 3 Pizza
- 3 Burger
- 2 Fries
- 2 Pasta

Run:

```bash
npm run seed
```

---

# 11. Running Project

## Install Dependencies

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build

npm start
```

---

# 12. Development Flow

Request lifecycle:

```
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
  ↓
Serializer
  ↓
Response
```

