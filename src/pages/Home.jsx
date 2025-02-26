import React from 'react';
import { Link } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';

const Home = () => {
  const handleSearch = (filters) => {
    console.log('Filtres de recherche:', filters);
    // TODO: Implémenter la logique de filtrage
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2023/07/22/172861-847869894_medium.mp4"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
          L'Excellence Immobilière à Marrakech
        </h1>
        <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl">
          Découvrez notre collection exclusive de propriétés de luxe, où chaque résidence raconte une histoire d'élégance et de raffinement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/immobilier"
            className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-colors rounded-full text-lg"
          >
            Découvrir nos biens
          </Link>
          <Link 
            to="/contact"
            className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 transition-colors rounded-full text-lg"
          >
            Nous contacter
          </Link>
        </div>

        <div className="mt-16 w-full max-w-5xl">
          <PropertySearch onSearch={handleSearch} />
        </div>
      </div>

      <div className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12">Propriétés en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
              "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b",
              "https://images.unsplash.com/photo-1523217582562-09d0def993a6"
            ].map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt="Propriété de luxe"
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-serif">Villa de Luxe</h3>
                  <p className="text-gray-600">Marrakech, Maroc</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;