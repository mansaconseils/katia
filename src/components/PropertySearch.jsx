import React, { useState } from 'react';

const PropertySearch = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    type: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Type de bien
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Tous les types</option>
            <option value="villa">Villa</option>
            <option value="apartment">Appartement</option>
            <option value="riad">Riad</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-2">
            Prix minimum
          </label>
          <input
            type="number"
            id="priceMin"
            name="priceMin"
            value={filters.priceMin}
            onChange={handleChange}
            placeholder="€"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-2">
            Prix maximum
          </label>
          <input
            type="number"
            id="priceMax"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleChange}
            placeholder="€"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
            Chambres
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Nombre de chambres</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Localisation
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Quartier, ville..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertySearch;