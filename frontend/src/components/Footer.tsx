export default function Footer() {
  return (
    <footer className='bg-zinc-900 text-white mt-10'>
      <div className='container-page py-10 text-center'>
        <h2 className='text-xl font-semibold'>QuickBite</h2>

        <p className='text-zinc-400 mt-2'>Fast food delivery made simple.</p>

        <p className='text-zinc-500 text-sm mt-5'>
          © {new Date().getFullYear()} QuickBite. All rights reserved.
        </p>

        <p className='text-zinc-500 text-sm mt-2'>
          Built by{' '}
          <a
            href='http://jain-daksh.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-300 hover:text-white transition-colors'
          >
            Daksh Jain
          </a>{' '}
          <span>·</span>{' '}
          <a
            href='https://github.com/jain-daksh'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-300 hover:text-white transition-colors'
          >
            GitHub
          </a>{' '}
          <span>·</span>{' '}
          <a
            href='https://www.linkedin.com/in/jaindaksh'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-300 hover:text-white transition-colors'
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
