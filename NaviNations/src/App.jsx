import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Homa from './pages/Homa';
import CountryDetails from './pages/CountryDetails';
import Regions from './pages/Regions';
import Search from './pages/Search';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

  useEffect(() => {
    let timeoutId;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      if (isLoggedIn) {
        timeoutId = setTimeout(() => {
          handleLogout();
        }, SESSION_TIMEOUT);
      }
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isLoggedIn]);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('user', username);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Home />} />
          <Route 
            path="/homa" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Homa />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/country/:countryName" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CountryDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/region/:regionName" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Regions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Search />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;