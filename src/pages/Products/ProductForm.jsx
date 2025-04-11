import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    const newProduct = {
      ...product,
      id: Date.now(), // Gera um ID único
      quantity: parseFloat(product.quantity),
      unitPrice: parseFloat(product.unitPrice),
      email: user?.email || '', // Relaciona com o usuário
    };

    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    navigate('/produtos');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={product.name}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={product.description}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={product.quantity}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="text"
          name="unit"
          placeholder="Unidade (ex: kg, un)"
          value={product.unit}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="number"
          step="0.01"
          name="unitPrice"
          placeholder="Valor unitário (R$)"
          value={product.unitPrice}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={product.active}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">Ativo</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Salvar Produto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
