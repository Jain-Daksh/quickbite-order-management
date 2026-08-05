import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import { createOrder, getCartItems } from '../api';

export default function Checkout() {
  const navigate = useNavigate();

  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
  });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    subtotal: 0,
  });
  const [cartLoading, setCartLoading] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const orderData = {
        customer_name: form.customer_name,

        phone: form.phone,

        address: form.address,

        items: items.map((item) => ({
          menu_item_id: item.id,

          quantity: item.quantity,
        })),
      };

      console.log(orderData);

      await createOrder(orderData);

      clearCart();

      navigate('/order-success');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setCartLoading(true);

        if (!items.length) {
          setProducts([]);
          setCartSummary({
            totalItems: 0,
            subtotal: 0,
          });
          return;
        }

        const response = await getCartItems(items);

        const cartData = response.data.data;

        setProducts(cartData.items);

        setCartSummary({
          totalItems: cartData.totalItems,
          subtotal: cartData.subtotal,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setCartLoading(false);
      }
    };

    loadProducts();
  }, [items]);

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
      <div
        className='
container-page
grid
lg:grid-cols-3
gap-8
'
      >
        {/* CUSTOMER FORM */}

        <div
          className='
lg:col-span-2
bg-white
rounded-3xl
border
shadow-sm
p-8
'
        >
          <h1
            className='
text-3xl
font-extrabold
mb-8
'
          >
            Delivery Information
          </h1>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='font-semibold'>Name</label>

              <input
                className='input mt-2'
                name='customer_name'
                placeholder='Daksh'
                value={form.customer_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='font-semibold'>Phone</label>

              <input
                className='input mt-2'
                name='phone'
                placeholder='9999999999'
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='font-semibold'>Address</label>

              <textarea
                className='
input
mt-2
resize-none
'
                rows={4}
                name='address'
                placeholder='Udaipur Rajasthan'
                value={form.address}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* CART PREVIEW */}

        <div className='bg-white rounded-3xl border shadow-sm p-8 h-fit lg:sticky lg:top-24'>
          <h2
            className='
text-2xl
font-extrabold
mb-6
'
          >
            {cartLoading
              ? 'Order Summary'
              : `Order Summary (${cartSummary.totalItems})`}
          </h2>

          <div className='space-y-5'>
            {cartLoading
              ? [1, 2].map((item) => (
                  <div
                    key={item}
                    className='
flex
gap-4
animate-pulse
'
                  >
                    <div
                      className='
w-20
h-20
bg-zinc-200
rounded-xl
'
                    />

                    <div className='flex-1 space-y-3'>
                      <div
                        className='
h-4
bg-zinc-200
rounded
w-32
'
                      />

                      <div
                        className='
h-3
bg-zinc-200
rounded
w-20
'
                      />
                    </div>
                  </div>
                ))
              : products.map((product) => (
                  <div
                    key={product.productId}
                    className='
flex
gap-4
items-center
'
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className='
w-20
h-20
rounded-xl
object-cover
'
                    />

                    <div className='flex-1'>
                      <h3
                        className='
font-bold
text-sm
'
                      >
                        {product.name}
                      </h3>

                      <p
                        className='
text-zinc-500
text-sm
'
                      >
                        Qty: {product.quantity}
                      </p>

                      <p
                        className='
text-orange-500
font-semibold
'
                      >
                        ₹{product.price}
                      </p>
                    </div>

                    <p
                      className='
font-bold
'
                    >
                      ₹{product.itemTotal}
                    </p>
                  </div>
                ))}
          </div>

          <hr className='my-6' />

          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span>Subtotal</span>

              {cartLoading ? (
                <div
                  className='
          h-5
          w-16
          bg-zinc-200
          rounded
          animate-pulse
          '
                />
              ) : (
                <span className='font-semibold'>₹{cartSummary.subtotal}</span>
              )}
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

              {cartLoading ? (
                <div
                  className='
          h-7
          w-20
          bg-zinc-200
          rounded
          animate-pulse
          '
                />
              ) : (
                <span
                  className='
          text-orange-500
          '
                >
                  ₹{cartSummary.subtotal}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className='
w-full
mt-6
py-4
rounded-xl
bg-orange-500
text-white
font-bold
hover:bg-orange-600
transition
disabled:opacity-50
'
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </section>
  );
}
