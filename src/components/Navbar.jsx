import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
          <Link to="/clima" className="hover:bg-blue-700 px-3 py-2 rounded">Clima</Link>
          {isAuthenticated && (
            <>
              <Link to="/produtos" className="hover:bg-blue-700 px-3 py-2 rounded">Produtos</Link>
              <Link to="/usuario" className="hover:bg-blue-700 px-3 py-2 rounded">Usuário</Link>
            </>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;