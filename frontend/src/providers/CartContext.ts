import { createContext } from 'react';

export interface CartItem {
  menu_item_id: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];

  addToCart: (id: string, quantity?: number) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (id: string, quantity: number) => void;

  clearCart: () => void;

  totalItems: number;
}

export const CartContext = createContext<CartContextType | null>(null);
