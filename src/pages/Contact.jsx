import React from 'react';

const Contact = () => {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-16">Contact</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">Nous Contacter</h2>
            <p className="text-gray-600 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet immobilier.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-gray-600">123 Avenue Mohammed VI<br />Marrakech, Maroc</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-600">+212 (0) 5 24 XX XX XX</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">contact@katia-realestate.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;