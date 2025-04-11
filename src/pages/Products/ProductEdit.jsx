import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: 'un',
    quantity: 0,
    registrationDate: new Date().toISOString().split('T')[0],
    active: true,
    unitPrice: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || []);
    const product = products.find(p => p.id === parseInt(id));
    
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        unit: product.unit,
        quantity: product.quantity,
        registrationDate: product.registrationDate,
        active: product.active,
        unitPrice: product.unitPrice
      });
    } else {
      setError('Produto não encontrado');
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.description) {
      setError('Nome e descrição são obrigatórios');
      return;
    }

    if (formData.unitPrice <= 0) {
      setError('O valor unitário deve ser maior que zero');
      return;
    }

    // Atualizar produto
    const products = JSON.parse(localStorage.getItem('products') || []);
    const updatedProducts = products.map(product => {
      if (product.id === parseInt(id)) {
        return {
          ...product,
          ...formData,
          quantity: parseInt(formData.quantity),
          unitPrice: parseFloat(formData.unitPrice)
        };
      }
      return product;
    });
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setSuccess('Produto atualizado com sucesso!');
    setTimeout(() => navigate('/produtos'), 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/produtos')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Editar Produto</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nome do Produto*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="unit">
              Unidade*
            </label>
            <select
              id="unit"
              name="unit"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.unit}
              onChange={handleChange}
              required
            >
              <option value="un">Unidade (un)</option>
              <option value="kg">Quilograma (kg)</option>
              <option value="g">Grama (g)</option>
              <option value="l">Litro (l)</option>
              <option value="ml">Mililitro (ml)</option>
              <option value="m">Metro (m)</option>
              <option value="cm">Centímetro (cm)</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Descrição*
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantidade em Estoque
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="unitPrice">
              Valor Unitário (R$)*
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              min="0.01"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="registrationDate">
              Data de Cadastro
            </label>
            <input
              type="date"
              id="registrationDate"
              name="registrationDate"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.registrationDate}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="active"
            name="active"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.active}
            onChange={handleChange}
          />
          <label htmlFor="active" className="ml-2 block text-gray-700">
            Produto ativo
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/produtos')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Atualizar Produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;