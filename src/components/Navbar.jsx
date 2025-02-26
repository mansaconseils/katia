{/* Mise à jour du composant Navbar pour ajouter le lien vers le blog */}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-gray-800">
              KATIA
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors">
              Accueil
            </Link>
            <Link to="/immobilier" className="text-gray-800 hover:text-gray-600 transition-colors">
              Immobilier
            </Link>
            <Link to="/valeurs" className="text-gray-800 hover:text-gray-600 transition-colors">
              Nos Valeurs
            </Link>
            <Link to="/services" className="text-gray-800 hover:text-gray-600 transition-colors">
              Services
            </Link>
            <Link to="/marrakech" className="text-gray-800 hover:text-gray-600 transition-colors">
              Marrakech & Investissement
            </Link>
            <Link to="/blog" className="text-gray-800 hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/immobilier"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Immobilier
            </Link>
            <Link
              to="/valeurs"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Nos Valeurs
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/marrakech"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Marrakech & Investissement
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;