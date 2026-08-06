import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-6'>
      <div className='max-w-lg text-center'>
        <h1 className='text-8xl font-extrabold text-orange-500'>404</h1>

        <h2 className='mt-4 text-3xl font-bold text-zinc-900'>
          Page Not Found
        </h2>

        <p className='mt-3 text-zinc-600'>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className='mt-8 flex justify-center gap-4'>
          <Link
            to='/'
            className='rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition'
          >
            Back to Home
          </Link>

          <Link
            to='/menu'
            className='rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 transition'
          >
            Browse Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
