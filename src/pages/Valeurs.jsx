import React from 'react';

const Valeurs = () => {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-16">Nos Valeurs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">Excellence & Prestige</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre engagement pour l'excellence se reflète dans chaque propriété que nous représentons. Nous sélectionnons méticuleusement les biens les plus prestigieux de Marrakech pour garantir à nos clients une expérience immobilière d'exception.
            </p>
            <h2 className="text-2xl font-serif mb-6">Expertise Locale</h2>
            <p className="text-gray-600 leading-relaxed">
              Avec une connaissance approfondie du marché immobilier de luxe à Marrakech, notre équipe d'experts vous guide dans chaque étape de votre projet, qu'il s'agisse d'une acquisition ou d'un investissement.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-6">Service Personnalisé</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nous croyons en une approche sur mesure, adaptée aux besoins spécifiques de chaque client. Notre service conciergerie vous accompagne bien au-delà de la simple transaction immobilière.
            </p>
            <h2 className="text-2xl font-serif mb-6">Discrétion & Confiance</h2>
            <p className="text-gray-600 leading-relaxed">
              La confidentialité est au cœur de notre approche. Nous cultivons des relations de confiance durables avec nos clients, basées sur la transparence et le respect mutuel.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif mb-6">Notre Vision</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nous aspirons à redéfinir l'expérience immobilière de luxe à Marrakech en offrant un service d'exception, alliant expertise locale et standards internationaux. Notre objectif est de créer des connexions durables entre des propriétés d'exception et des clients exigeants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Valeurs;