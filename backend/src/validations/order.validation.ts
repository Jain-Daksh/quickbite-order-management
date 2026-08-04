import { z } from 'zod';

export const createOrderSchema = z.object({
  customer_name: z.string().min(3, 'Customer name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Address is required'),
  items: z
    .array(
      z.object({
        menu_item_id: z.string().uuid(),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1, 'At least one item required'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
