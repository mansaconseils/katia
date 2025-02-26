import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PropertyRecommendations = ({ userPreferences }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const getRecommendations = async () => {
      if (!userPreferences) return;

      setLoading(true);
      try {
        const response = await fetch('https://api-hub-579483274893.us-central1.run.app/v1/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            inputs: {
              messages: [
                {
                  role: "system",
                  content: "Vous êtes un expert en recommandations immobilières de luxe à Marrakech."
                },
                {
                  role: "user",
                  content: `Basé sur les préférences suivantes, suggérez 3 propriétés: ${JSON.stringify(userPreferences)}`
                }
              ]
            }
          })
        });

        const data = await response.json();
        const suggestions = JSON.parse(data.choices[0].message.content);
        setRecommendations(suggestions);
      } catch (error) {
        console.error('Erreur lors des recommandations:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [userPreferences]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"
        />
        <p className="mt-4 text-gray-600">Chargement des recommandations...</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6"
    >
      {recommendations.map((property, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-serif mb-2">{property.title}</h3>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className="text-gray-800 font-semibold">{property.price}</p>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                En savoir plus
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyRecommendations;