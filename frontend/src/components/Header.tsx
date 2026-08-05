import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function Header() {
  const { items } = useCart();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className='
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur
      border-b
      border-orange-100
      '
    >
      <div
        className='
        container-page
        h-16
        flex
        items-center
        justify-between
        '
      >
        {/* LOGO */}

        <Link
          to='/'
          className='
          flex
          items-center
          gap-2
          shrink-0
          '
        >
          <div
            className='
            w-8
            h-8
            rounded-lg
            bg-orange-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            '
          >
            Q
          </div>

          <span
            className='
            text-xl
            font-extrabold
            '
          >
            <span className='text-orange-500'>Quick</span>
            Bite
          </span>
        </Link>

        {/* NAV */}

        <nav
          className='
          flex
          items-center
          gap-3
          sm:gap-6
          '
        >
          <Link
            to='/'
            className='
            hidden
            sm:block
            text-sm
            font-medium
            hover:text-orange-500
            '
          >
            Home
          </Link>

          <Link
            to='/menu'
            className='
            text-sm
            font-medium
            hover:text-orange-500
            '
          >
            Menu
          </Link>

          {/* TRACK ORDER */}

          <Link
            to='/track-order'
            className='
            flex
            items-center
            gap-1
            text-sm
            font-medium
            hover:text-orange-500
            '
          >

            <span>
              Track
              <span className='hidden sm:inline'> Order</span>
            </span>
          </Link>

          {/* CART */}

          <Link
            to='/cart'
            className='
            relative
            bg-orange-500
            text-white
            px-3
            sm:px-5
            py-2
            rounded-full
            text-sm
            font-semibold
            shadow-md
            '
          >
            🛒
            <span className='hidden sm:inline'>Cart</span>
            {cartCount > 0 && (
              <span
                className='
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-xs
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  '
              >
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
