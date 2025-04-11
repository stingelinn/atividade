const Home = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Bem-vindo ao Sistema</h1>
        
        {isAuthenticated ? (
          <div className="text-center">
            <p className="text-lg mb-4">Olá, {user.nickname || 'Usuário'}!</p>
            <p className="text-gray-600">
              Você está logado e pode acessar todas as funcionalidades do sistema.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">Por favor, faça login para acessar o sistema.</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/login" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Login
              </a>
              <a 
                href="/register" 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Home;