'use client';

import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

interface BuyNowButtonProps {
  productId: string;
  quantity?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function BuyNowButton({
  productId,
  quantity = 1,
  children = 'Buy Now',
  className = '',
}: BuyNowButtonProps) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(productId, quantity);

    navigate('/cart');
  };

  return (
    <button type='button' onClick={handleBuyNow} className={className}>
      {children}
    </button>
  );
}
