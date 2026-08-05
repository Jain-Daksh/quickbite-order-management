import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Menu from '../pages/Menu';

import TrackOrderPage from '../pages/track-order';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/menu' element={<Menu />} />

      <Route path='/track-order' element={<TrackOrderPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />

    </Routes>
  );
}

export default AppRoutes;
