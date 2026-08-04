export default function Header() {
  return (
    <header className='sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-orange-100'>
      <div className='container-page h-20 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div
            className='
          w-10 h-10 
          rounded-xl
          bg-orange-500
          flex
          items-center
          justify-center
          text-white
          font-bold
          text-xl
          '
          >
            Q
          </div>

          <h1 className='text-3xl font-extrabold tracking-tight'>
            <span className='text-orange-500'>Quick</span>
            Bite
          </h1>
        </div>

        <nav className='flex items-center gap-8'>
          <a
            className='font-medium text-zinc-700 hover:text-orange-500 transition'
            href='#'
          >
            Home
          </a>

          <a
            className='font-medium text-zinc-700 hover:text-orange-500 transition'
            href='#menu'
          >
            Menu
          </a>

          <button
            className='
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-6
          py-3
          rounded-full
          font-semibold
          shadow-lg
          shadow-orange-200
          transition
          hover:-translate-y-0.5
          '
          >
            🛒 Cart (0)
          </button>
        </nav>
      </div>
    </header>
  );
}
