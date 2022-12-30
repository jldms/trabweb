import 'bulma/css/bulma.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Review from './pages/Review';
import DetailReview from './pages/DetailReview';
import Favorite from './pages/Favorite';
import PrivateRoutes from './utils/PrivateRoutes';

import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>


        <Routes>
          <Route element={<SignIn />} path="/signin" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<Review />} path="/review" />
            <Route element={<DetailReview />} path="/detailreview" />
            <Route element={<Favorite />} path="/favorite" />
          </Route>
        </Routes>


      </AuthProvider>
    </Router>
  )
}

export default App;

