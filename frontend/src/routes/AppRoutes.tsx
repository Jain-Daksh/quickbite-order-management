import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import NotFound from '../pages/NotFound';

import TrackOrderPage from '../pages/track-order';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/menu' element={<Menu />} />

      <Route path='/track-order' element={<TrackOrderPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/order-success' element={<OrderSuccess />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
