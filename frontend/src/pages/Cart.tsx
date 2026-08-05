import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import { getCartItems } from '../api';

interface Product {
  productId: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  itemTotal: number;
}

interface CartResponse {
  items: Product[];
  totalItems: number;
  subtotal: number;
}

export default function Cart() {
  const navigate = useNavigate();

  const { items, updateQuantity, removeFromCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      if (!items.length) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const response = await getCartItems(items);

      const cartData: CartResponse = response.data.data;

      setProducts(cartData.items);
      setCartTotal(cartData.subtotal);

      setLoading(false);
    };

    loadCart();
  }, [items]);

  if (loading) {
    return <div className='py-20 text-center'>Loading cart...</div>;
  }

  const delivery = 40;
  const total = cartTotal + delivery;

  return (
    <section
      className='
    min-h-screen
    bg-gradient-to-br
    from-orange-50
    via-white
    to-orange-100
    py-12
    '
    >
      <div className='container-page'>
        <h1
          className='
        text-4xl
        md:text-5xl
        font-extrabold
        text-zinc-900
        mb-10
        '
        >
          Your Cart 🛒
        </h1>

        {!products.length ? (
          <div
            className='
          bg-white
          rounded-3xl
          shadow-sm
          border
          p-16
          text-center
          '
          >
            <div className='text-6xl mb-5'>🛒</div>

            <h2 className='text-2xl font-bold'>Your cart is empty</h2>

            <p className='text-muted mt-2'>Add some delicious food items.</p>
          </div>
        ) : (
          <div
            className='
          grid
          lg:grid-cols-3
          gap-8
          '
          >
            {/* CART ITEMS */}

            <div
              className='
            lg:col-span-2
            space-y-6
            '
            >
              {products.map((product) => (
                <div
                  key={product.productId}
                  className='
                bg-white
                rounded-3xl
                border
                border-zinc-100
                p-5
                flex
                justify-between
                items-center
                shadow-sm
                hover:shadow-lg
                transition
                '
                >
                  <div
                    className='
                  flex
                  gap-5
                  items-center
                  '
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className='
                    w-28
                    h-28
                    rounded-2xl
                    object-cover
                    '
                    />

                    <div>
                      <h3
                        className='
                      text-xl
                      font-bold
                      text-zinc-900
                      '
                      >
                        {product.name}
                      </h3>

                      <p
                        className='
                      text-orange-500
                      font-semibold
                      mt-1
                      '
                      >
                        ₹{product.price}
                      </p>

                      <p
                        className='
                      text-sm
                      text-zinc-500
                      mt-1
                      '
                      >
                        Total: ₹{product.itemTotal}
                      </p>

                      <button
                        onClick={() => removeFromCart(product.productId)}
                        className='
                      text-red-500
                      text-sm
                      mt-3
                      hover:text-red-700
                      '
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* QUANTITY */}

                  <div
                    className='
                  flex
                  items-center
                  gap-3
                  bg-orange-50
                  rounded-full
                  p-1
                  '
                  >
                    <button
                      onClick={() =>
                        updateQuantity(product.productId, product.quantity - 1)
                      }
                      className='
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    font-bold
                    shadow-sm
                    '
                    >
                      -
                    </button>

                    <span
                      className='
                    font-bold
                    w-6
                    text-center
                    '
                    >
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(product.productId, product.quantity + 1)
                      }
                      className='
                    w-10
                    h-10
                    rounded-full
                    bg-orange-500
                    text-white
                    font-bold
                    shadow
                    '
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}

            <div
              className='
            bg-white
            rounded-3xl
            border
            p-8
            h-fit
            shadow-sm
            lg:sticky
            lg:top-24
            '
            >
              <h2
                className='
              text-2xl
              font-extrabold
              mb-7
              '
              >
                Order Summary
              </h2>

              <div
                className='
              space-y-4
              text-zinc-700
              '
              >
                <div className='flex justify-between'>
                  <span>Subtotal</span>

                  <span className='font-semibold'>₹{cartTotal}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Delivery</span>

                  <span className='font-semibold'>₹{delivery}</span>
                </div>

                <hr />

                <div
                  className='
                flex
                justify-between
                text-xl
                font-extrabold
                '
                >
                  <span>Total</span>

                  <span
                    className='
                  text-orange-500
                  '
                  >
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className='
              mt-8
              w-full
              py-4
              rounded-xl
              bg-orange-500
              text-white
              font-bold
              hover:bg-orange-600
              transition
              shadow-lg
              '
              >
                Place Order →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
