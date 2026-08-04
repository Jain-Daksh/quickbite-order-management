import { Link } from 'react-router-dom';

export default function Header() {
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


        <nav
          className='
        flex
        items-center
        gap-3
        sm:gap-6
        '
        >
          <Link
            className='
          hidden
          sm:block
          text-sm
          font-medium
          '
            to='/'
          >
            Home
          </Link>

          <Link
            className='
          text-sm
          font-medium
          '
            to='/menu'
          >
            Menu
          </Link>

          <button
            className='
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
            (0)
          </button>
        </nav>
      </div>
    </header>
  );
}
