import Footer from './components/Footer';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { Helmet } from 'react-helmet-async';

function App() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QuickBite',
    url: 'https://quickbite-order-management-nine.vercel.app/',
    description:
      'QuickBite is an online food order management application for managing, tracking, and organizing restaurant orders.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Daksh Jain',
      url: 'https://jain-daksh.vercel.app/',
    },
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Helmet>
        <title>QuickBite | Online Food Order Management System</title>

        <meta
          name='description'
          content='QuickBite is an online food order management application for managing, tracking, and organizing restaurant orders.'
        />

        <link
          rel='canonical'
          href='https://quickbite-order-management-nine.vercel.app/'
        />

        <meta name='robots' content='index, follow' />

        {/* Open Graph */}
        <meta
          property='og:title'
          content='QuickBite | Online Food Order Management System'
        />

        <meta
          property='og:description'
          content='Manage and track restaurant food orders with QuickBite.'
        />

        <meta
          property='og:url'
          content='https://quickbite-order-management-nine.vercel.app/'
        />

        <meta property='og:type' content='website' />

        <meta property='og:site_name' content='QuickBite' />

        <meta
          property='og:image'
          content='https://quickbite-order-management-nine.vercel.app/og-image.png'
        />

        {/* Twitter / X */}
        <meta name='twitter:card' content='summary_large_image' />

        <meta
          name='twitter:title'
          content='QuickBite | Online Food Order Management System'
        />

        <meta
          name='twitter:description'
          content='Manage and track restaurant food orders with QuickBite.'
        />

        <meta
          name='twitter:image'
          content='https://quickbite-order-management-nine.vercel.app/og-image.png'
        />

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      <main className='flex-1'>
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
