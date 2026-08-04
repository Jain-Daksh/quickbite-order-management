import Footer from './components/Footer';
import Header from './components/Header';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
