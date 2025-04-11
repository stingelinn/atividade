import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    nickname: '', 
    dob: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação dos campos
    if (!formData.email || !formData.password || !formData.nickname || !formData.dob) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    // Verifica se o e-mail já está cadastrado
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some(user => user.email === formData.email);

    if (emailExists) {
      setError('Este e-mail já está cadastrado');
      return;
    }

    // Armazena o novo usuário
    const newUser = {
      email: formData.email,
      password: formData.password, // ⚠️ Em produção, use hash!
      nickname: formData.nickname,
      dob: formData.dob,
    };

    // Atualiza a lista de usuários
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Define o token e usuário ativo
    localStorage.setItem('token', 'token-gerado-' + Date.now());
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redireciona e FORÇA ATUALIZAÇÃO do estado de autenticação
    window.location.href = '/produtos';
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center mb-4">Cadastrar Novo Usuário</h2>
      
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Senha"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Apelido"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          required
        />
        <label className="block text-gray-700">
          Data de Nascimento
          <input
            type="date"
            className="w-full p-2 border rounded mt-1"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </label>
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;