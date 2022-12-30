import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Review from './pages/Review';
import Favorite from './pages/Favorite';
import PrivateRoutes from './utils/PrivateRoutes';

import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>


        <Routes>
          <Route element={<SignIn />} path="/signin" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<Review />} path="/review" />
            <Route element={<Favorite />} path="/favorite" />
          </Route>
        </Routes>


      </AuthProvider>
    </Router>
  )
}

export default App;

