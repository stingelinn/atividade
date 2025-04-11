import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ⚠️ Chave exposta (apenas para desenvolvimento/local)
  const API_KEY = '2ac56d08e5542aacc46c608e07c24d6c';
  const CITY = 'Guarapuava,BR';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}&lang=pt_br`
        );
        
        setWeatherData({
          city: response.data.name,
          temperature: Math.round(response.data.main.temp),
          humidity: response.data.main.humidity,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        });
      } catch (err) {
        setError('Erro ao buscar dados. Tente atualizar a página.');
        console.error("Erro na API:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <p className="text-gray-600">Buscando dados do clima...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Clima em Guarapuava
      </h2>

      {error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 font-medium">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Tentar novamente
          </button>
        </div>
      ) : weatherData && (
        <div className="space-y-4">
          {/* Cabeçalho com ícone */}
          <div className="flex items-center justify-center space-x-4">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
              alt={weatherData.description}
              className="h-16 w-16"
            />
            <div>
              <h3 className="text-xl font-semibold">{weatherData.city}</h3>
              <p className="text-gray-500 capitalize">{weatherData.description}</p>
            </div>
          </div>

          {/* Dados principais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-600">Temperatura</p>
              <p className="text-3xl font-bold text-blue-800">
                {weatherData.temperature}°C
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-green-600">Umidade</p>
              <p className="text-3xl font-bold text-green-800">
                {weatherData.humidity}%
              </p>
            </div>
          </div>

          {/* Detalhes adicionais */}
          <div className="bg-gray-50 p-3 rounded-lg text-center text-sm text-gray-500">
            <p>Atualizado em: {new Date().toLocaleTimeString()}</p>
            <p className="mt-1">Fonte: OpenWeatherMap</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;