import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div
        className='
      min-h-screen
      flex
      items-center
      justify-center
      '
      >
        <p>Loading order...</p>
      </div>
    );
  }

  return (
    <section
      className='
min-h-screen
bg-gradient-to-br
from-orange-50
via-white
to-orange-100
py-20
'
    >
      <div
        className='
container-page
max-w-xl
'
      >
        <div
          className='
bg-white
rounded-3xl
shadow-sm
border
p-10
text-center
'
        >
          <div
            className='
w-20
h-20
mx-auto
rounded-full
bg-green-100
flex
items-center
justify-center
text-4xl
'
          >
            ✓
          </div>

          <h1
            className='
text-3xl
font-extrabold
mt-6
'
          >
            Order Placed Successfully!
          </h1>

          <p
            className='
text-zinc-500
mt-3
'
          >
            Thank you for ordering with us.
          </p>

          <div
            className='
mt-8
bg-orange-50
rounded-2xl
p-6
text-left
space-y-4
'
          >
            <div className='flex justify-between'>
              <span>Order Number</span>

              <span className='font-bold'>#{order.order_number}</span>
            </div>

            <div className='flex justify-between'>
              <span>Status</span>

              <span
                className='
font-bold
text-orange-500
'
              >
                {order.status.replaceAll('_', ' ')}
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Amount</span>

              <span className='font-bold'>
                ₹{Number(order.total_amount).toFixed(0)}
              </span>
            </div>

            <div>
              <p>Delivery Address</p>

              <p
                className='
font-semibold
mt-1
'
              >
                {order.address}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
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
'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}
