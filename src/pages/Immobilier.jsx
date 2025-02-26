import React, { useState } from 'react';
import PropertySearch from '../components/PropertySearch';
import PropertyMap from '../components/PropertyMap';
import AppointmentForm from '../components/AppointmentForm';
import PropertyRecommendations from '../components/PropertyRecommendations';

const Immobilier = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);

  const handleSearch = (filters) => {
    setUserPreferences(filters);
  };

  return (
    <div className="pt-20">
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
          alt="Luxurious property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Nos Propriétés</h1>
          <p className="text-xl max-w-2xl text-center px-4">
            Découvrez notre collection exclusive de biens immobiliers de prestige à Marrakech
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <PropertySearch onSearch={handleSearch} />

        {userPreferences && (
          <div className="mt-16">
            <h2 className="text-3xl font-serif mb-8">Recommandations Personnalisées</h2>
            <PropertyRecommendations userPreferences={userPreferences} />
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-serif mb-8">Carte des Propriétés</h2>
          <PropertyMap />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://images.unsplash.com/photo-${[
                    '1512917774080-9991f1c4c750',
                    '1600607687939-ce8d67df0705',
                    '1600585154340-be6161a56a0c',
                    '1600596542815-ffad4c1539a9',
                    '1600585154526-681161dcdd43',
                    '1615529328331-f8917597711f'
                  ][index]}`}
                  alt={`Propriété ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-serif">Villa de Luxe {index + 1}</h3>
                  <p className="text-sm opacity-90">Marrakech, Maroc</p>
                  <p className="mt-2 font-semibold">À partir de 1.500.000 €</p>
                  <button
                    onClick={() => setShowAppointmentForm(true)}
                    className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Prendre rendez-vous
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAppointmentForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative">
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="absolute -top-4 -right-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                ✕
              </button>
              <AppointmentForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Immobilier;