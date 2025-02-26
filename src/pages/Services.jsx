import React from 'react';

const Services = () => {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-16">Nos Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-serif mb-4">Achat & Vente</h2>
            <p className="text-gray-600 mb-4">
              Nous vous accompagnons dans l'achat ou la vente de votre bien immobilier de prestige à Marrakech, en vous garantissant une transaction sécurisée et optimale.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Sélection personnalisée de biens</li>
              <li>Évaluation précise du marché</li>
              <li>Négociation experte</li>
              <li>Accompagnement juridique</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-serif mb-4">Investissement</h2>
            <p className="text-gray-600 mb-4">
              Nos experts vous conseillent pour optimiser vos investissements immobiliers et maximiser votre retour sur investissement à Marrakech.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Analyse du marché</li>
              <li>Stratégie d'investissement</li>
              <li>Gestion locative</li>
              <li>Optimisation fiscale</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-serif mb-4">Conciergerie</h2>
            <p className="text-gray-600 mb-4">
              Notre service de conciergerie de luxe s'occupe de tous les aspects de votre propriété, vous offrant une tranquillité d'esprit totale.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Gestion de propriété</li>
              <li>Services sur mesure</li>
              <li>Coordination des travaux</li>
              <li>Maintenance régulière</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;