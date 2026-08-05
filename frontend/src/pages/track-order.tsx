'use client';

import { FormEvent, useState } from 'react';
import { getOrderById } from '../api/index';

interface OrderItem {
  menu_item_id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}


export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<Order | null>(null);


  const validateForm = () => {
    if (!orderId.trim()) {
      return 'Please enter Order Number.';
    }

    if (!/^\d+$/.test(orderId)) {
      return 'Order Number must contain only numbers.';
    }

    if (!phone.trim()) {
      return 'Please enter Phone Number.';
    }

    if (!/^\d+$/.test(phone)) {
      return 'Phone Number must contain only numbers.';
    }

    if (phone.length !== 10) {
      return 'Phone Number must be exactly 10 digits.';
    }

    return '';
  };
  const handleTrackOrder = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setOrder(null);

      const response = await getOrderById({
        id: Number(orderId),
        phone,
      });

      setOrder(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'Unable to find your order.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-orange-50
      via-white
      to-orange-100
      py-20
    "
    >
      <div className="container-page">
        <div className="max-w-3xl mx-auto">

          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
              Track Your Order
            </span>


            <p className="mt-5 text-muted max-w-xl mx-auto">
              Enter your Order Number and registered phone number to check your
              order status.
            </p>
          </div>


          {/* <div className="card mt-10 p-8">
            <form
              onSubmit={handleTrackOrder}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Order Number
                </label>

                <input
                  type="number"
                  className="input"
                  placeholder="Enter Order Number"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="input"
                  placeholder="Enter Registered Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Tracking Order...' : 'Track Order'}
              </button>
            </form>

            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}
          </div> */}
          {!order ? (
            <>
              {/* Heading */}

              <div className="text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                  Track Your Order
                </span>



                <p className="mt-5 text-muted max-w-xl mx-auto">
                  Enter your Order Number and registered phone number to check your pizza
                  status.
                </p>
              </div>


              {/* Form */}

              <div className="card mt-10 p-8">
                <form
                  onSubmit={handleTrackOrder}
                  className="space-y-5"
                >
                  <div>
                    <label className="block mb-2 font-medium">
                      Order Number
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      className="input"
                      placeholder="Enter Order Number"
                      value={orderId}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setOrderId(value);
                      }}
                    />
                  </div>


                  <div>
                    <label className="block mb-2 font-medium">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      className="input"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPhone(value);
                      }}
                    />
                  </div>


                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={
                      loading ||
                      orderId.length === 0 ||
                      phone.length !== 10
                    }
                  >
                    {loading ? 'Tracking Order...' : 'Track Order'}
                  </button>
                </form>


                {error && (
                  <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </>
          ) : null}

          {order && (
            <div className="mt-8 space-y-6">

              {/* Order Header */}

              <div className="card p-8 bg-white">

                <div className="flex flex-col sm:flex-row justify-between gap-5">

                  <div>
                    <p className="text-muted text-sm">
                      Order Number
                    </p>

                    <h2 className="text-3xl font-bold text-zinc-900">
                      #{order.order_number}
                    </h2>

                    <p className="text-muted mt-2">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>


                  <div className="text-right">
                    <span
                      className="
            inline-flex
            px-5
            py-2
            rounded-full
            bg-orange-100
            text-orange-600
            font-semibold
            "
                    >
                      🍕 {order.status.replaceAll('_', ' ')}
                    </span>

                    <p className="text-muted mt-3">
                      Estimated delivery
                    </p>

                    <p className="font-semibold">
                      30 - 40 mins
                    </p>
                  </div>

                </div>


                {/* Progress */}

                <div className="mt-10">

                  <div className="flex justify-between text-sm">

                    <span className="text-orange-500 font-semibold">
                      Received
                    </span>

                    <span>
                      Preparing
                    </span>

                    <span>
                      Delivery
                    </span>

                    <span>
                      Done
                    </span>

                  </div>


                  <div className="h-2 bg-zinc-200 rounded-full mt-3 overflow-hidden">

                    <div
                      className="
            h-full
            bg-orange-500
            w-1/4
            rounded-full
            "
                    />

                  </div>

                </div>

              </div>



              {/* Customer Card */}

              <div className="card p-8">

                <h3 className="text-xl font-bold mb-5">
                  🚚 Delivery Details
                </h3>


                <div className="space-y-4">


                  <div className="flex justify-between">
                    <span className="text-muted">
                      Customer
                    </span>

                    <span className="font-medium">
                      {order.customer_name}
                    </span>

                  </div>



                  <div className="flex justify-between">

                    <span className="text-muted">
                      Phone
                    </span>

                    <span>
                      {order.phone}
                    </span>

                  </div>



                  <div className="flex justify-between">

                    <span className="text-muted">
                      Address
                    </span>

                    <span className="max-w-xs text-right">
                      {order.address}
                    </span>

                  </div>


                </div>

              </div>




              {/* Items */}

              <div className="card p-8">

                <h3 className="text-xl font-bold mb-6">
                  🍕 Your Pizza
                </h3>


                <div className="space-y-5">


                  {order.items.map((item) => (

                    <div
                      key={item.menu_item_id}
                      className="
          flex
          items-center
          justify-between
          bg-orange-50
          rounded-xl
          p-4
          "
                    >

                      <div className="flex gap-4">


                        <img
                          src={item.image}
                          className="
              w-24
              h-24
              rounded-xl
              object-cover
              "
                        />


                        <div>

                          <h4 className="
              font-bold
              text-lg
              ">
                            {item.name}
                          </h4>


                          <p className="text-muted">
                            {item.category}
                          </p>


                          <p className="mt-2">
                            Qty:
                            <span className="font-semibold">
                              {" "}
                              {item.quantity}
                            </span>
                          </p>


                        </div>

                      </div>



                      <div>

                        <p className="
            text-xl
            font-bold
            text-orange-600
            ">
                          ₹{item.subtotal}
                        </p>


                      </div>


                    </div>

                  ))}


                </div>


              </div>




              {/* Total */}

              <div
                className="
      bg-gradient-to-r
      from-orange-500
      to-orange-600
      rounded-xl
      p-6
      text-white
      flex
      justify-between
      items-center
      "
              >

                <div>

                  <p className="opacity-90">
                    Total Amount
                  </p>

                  <p className="text-sm opacity-80">
                    Including all taxes
                  </p>

                </div>


                <p className="
      text-4xl
      font-extrabold
      ">
                  ₹{order.total_amount}
                </p>


              </div>


              <button
                onClick={() => {
                  setOrder(null);
                  setOrderId('');
                  setPhone('');
                }}
                className="
      btn-secondary
      w-full
      "
              >
                Track Another Order
              </button>


            </div>
          )}
        </div>
      </div>
    </section>
  );
}