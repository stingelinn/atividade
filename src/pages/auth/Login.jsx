import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      return;
    }

    // Recupera os usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verifica se o e-mail e senha existem entre os usuários cadastrados
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Armazena o token e os dados do usuário no localStorage
      localStorage.setItem('token', 'token-simulado-12345');
      localStorage.setItem('user', JSON.stringify({ email, nickname: user.nickname }));

      // Redireciona para a página de produtos
      navigate('/produtos');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center mb-4">Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
