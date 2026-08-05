'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { CartContext } from './CartContext';
import type { CartItem } from './CartContext';
const STORAGE_KEY = 'cart';
import toast from 'react-hot-toast';
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveCart = (cart: CartItem[]) => {
    setItems(cart);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  };

  const addToCart = (id: string, quantity = 1) => {
    const existing = items.find((item) => item.menu_item_id === id);

    let updated: CartItem[];

    if (existing) {
      updated = items.map((item) =>
        item.menu_item_id === id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );
      toast.success('Cart quantity updated ');
    } else {
      updated = [
        ...items,
        {
          menu_item_id: id,
          quantity,
        },
      ];
      toast.success('Added to cart ');
    }

    saveCart(updated);
  };

  const removeFromCart = (id: string) => {
    const updated = items.filter((item) => item.menu_item_id !== id);

    saveCart(updated);
  };

  const updateQuantity = (id: string, quantity: number) => {
    let updated: CartItem[];

    if (quantity <= 0) {
      updated = items.filter((item) => item.menu_item_id !== id);
    } else {
      updated = items.map((item) =>
        item.menu_item_id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      );
      toast.success('Item Quantity updated ');
    }

    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
