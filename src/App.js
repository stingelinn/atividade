import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UpdateUser from './pages/auth/UpdateUser';
import Weather from './pages/Weather/Weather';
import ProductForm from './pages/Products/ProductForm';
import ProductList from './pages/Products/ProductList';
import ProductEdit from './pages/Products/ProductEdit';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null && 
                         localStorage.getItem('user') !== null;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/produtos" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/produtos" /> : <Register />} 
            />
            <Route 
              path="/usuario" 
              element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />} 
            />
            <Route path="/clima" element={<Weather />} />
            <Route 
              path="/produtos" 
              element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/produtos/novo" 
              element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/produtos/editar/:id" 
              element={isAuthenticated ? <ProductEdit /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;