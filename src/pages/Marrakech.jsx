import React from 'react';

const Marrakech = () => {
  return (
    <div className="pt-20">
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1553511574-a0fff6db85d4"
          alt="Marrakech cityscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Marrakech & Investissement</h1>
          <p className="text-xl max-w-2xl text-center px-4">Découvrez le potentiel d'investissement unique de la ville ocre</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">Pourquoi Investir à Marrakech ?</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Marrakech, ville impériale du Maroc, offre un potentiel d'investissement remarquable grâce à sa position stratégique, son climat favorable et son attrait touristique constant. Le marché immobilier de luxe y connaît une croissance soutenue, portée par une demande internationale en constante augmentation.
            </p>
            
            <h3 className="text-xl font-serif mb-4">Avantages Clés</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
              <li>Stabilité du marché immobilier</li>
              <li>Rentabilité locative attractive</li>
              <li>Cadre fiscal avantageux</li>
              <li>Infrastructure moderne</li>
              <li>Connexions internationales</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-6">Notre Expertise</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Avec une connaissance approfondie du marché local, nous vous guidons vers les meilleures opportunités d'investissement à Marrakech. Notre équipe vous accompagne dans :
            </p>
            
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong className="block text-gray-800">Analyse de Marché</strong>
                Études détaillées des tendances et opportunités
              </li>
              <li>
                <strong className="block text-gray-800">Sélection de Biens</strong>
                Identification des propriétés à fort potentiel
              </li>
              <li>
                <strong className="block text-gray-800">Optimisation Fiscale</strong>
                Conseil sur les structures d'investissement optimales
              </li>
              <li>
                <strong className="block text-gray-800">Gestion Locative</strong>
                Solutions complètes de gestion de propriété
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-8 text-center">Zones d'Investissement Privilégiées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hivernage",
                description: "Quartier chic et central, prisé pour ses hôtels de luxe et ses résidences haut de gamme."
              },
              {
                title: "Palm Grove",
                description: "Zone exclusive offrant des villas spacieuses et des propriétés de prestige."
              },
              {
                title: "Agdal",
                description: "Secteur moderne en plein développement, idéal pour les investissements locatifs."
              }
            ].map((zone, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-serif mb-4">{zone.title}</h3>
                <p className="text-gray-600">{zone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marrakech;