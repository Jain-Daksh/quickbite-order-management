import { sequelize, businessConfig } from '../config';
import { Order, OrderItem, MenuItem } from '../models';
import { OrderStatus } from '../models/Order';
import { Server } from 'socket.io';

interface CreateOrderInput {
  customer_name: string;
  phone: string;
  address: string;
  items: {
    menu_item_id: string;
    quantity: number;
  }[];
}

export class OrderService {
  static async createOrder(data: CreateOrderInput, io: Server) {
    const transaction = await sequelize.transaction();

    try {
      let total_amount = 0;

      const orderItemsData: any[] = [];

      for (const item of data.items) {
        const menuItem = await MenuItem.findByPk(item.menu_item_id, {
          transaction,
        });

        if (!menuItem) {
          throw new Error('Menu item not found');
        }

        if (!menuItem.is_available) {
          throw new Error(`${menuItem.name} is currently unavailable`);
        }
        if (item.quantity > businessConfig.maxQtyAllowed) {
          throw new Error(
            `Maximum ${businessConfig.maxQtyAllowed} quantity allowed for a ${menuItem?.name}`,
          );
        }

        const price = Number(menuItem.price);

        const subtotal = price * item.quantity;

        total_amount += subtotal;

        orderItemsData.push({
          menu_item_id: menuItem.id,

          quantity: item.quantity,

          price,

          subtotal,
        });
      }

      const order = await Order.create(
        {
          customer_name: data.customer_name,

          phone: data.phone,

          address: data.address,

          total_amount,

          status: 'ORDER_RECEIVED' as OrderStatus,
        },
        {
          transaction,
        },
      );

      const items = await OrderItem.bulkCreate(
        orderItemsData.map((item) => ({
          order_id: order.id,

          ...item,
        })),

        {
          transaction,
        },
      );

      await transaction.commit();
      this.simulateOrderStatus(order.id, io);

      return {
        order,
        items,
      };
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  static async getOrderById(id: string, phone: string) {
    const order = await Order.findOne({
      where: {
        order_number: id,
        phone,
      },

      include: [
        {
          model: OrderItem,
          as: 'items',

          include: [
            {
              model: MenuItem,
              as: 'menuItem',
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  static async updateOrderStatus(id: string, status: OrderStatus) {
    const order = await Order.findByPk(id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status;

    await order.save();

    return order;
  }

  static simulateOrderStatus(orderId: string, io: any) {
    const updateStatus = async (status: OrderStatus) => {
      const order = await Order.findByPk(orderId);

      if (!order) return;

      order.status = status;

      await order.save();

      io.to(`order-${orderId}`).emit('order-status-updated', {
        orderId,
        status,
      });
    };

    setTimeout(
      async () => {
        await updateStatus('PREPARING' as OrderStatus);

        setTimeout(
          async () => {
            await updateStatus('OUT_FOR_DELIVERY' as OrderStatus);

            setTimeout(
              async () => {
                await updateStatus('DELIVERED' as OrderStatus);
              },
              2 * 60 * 1000,
            );
          },
          2 * 60 * 1000,
        );
      },
      2 * 60 * 1000,
    );
  }
}
