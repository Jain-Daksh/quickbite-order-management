import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import TrackOrderPage from '../pages/track-order';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/track-order' element={<TrackOrderPage />} />

    </Routes>
  );
}

export default AppRoutes;
