import React from 'react';

const BlogPosts = [
  {
    id: 1,
    title: "Guide d'investissement immobilier à Marrakech en 2024",
    excerpt: "Découvrez les meilleures opportunités d'investissement immobilier à Marrakech pour cette année.",
    date: "15 Mars 2024",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16"
  },
  {
    id: 2,
    title: "Les quartiers les plus prisés de Marrakech",
    excerpt: "Une analyse détaillée des zones résidentielles les plus attractives de Marrakech.",
    date: "10 Mars 2024",
    image: "https://images.unsplash.com/photo-1512958789358-4dac0a0e9868"
  },
  {
    id: 3,
    title: "Comment choisir sa villa de luxe à Marrakech",
    excerpt: "Les critères essentiels pour sélectionner la villa de vos rêves.",
    date: "5 Mars 2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
  }
];

const Blog = () => {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          Actualités & Conseils Immobiliers
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BlogPosts.map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">{post.date}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-serif mb-3 hover:text-gray-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-gray-900 font-medium hover:text-gray-600">
                  Lire la suite →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
            Voir plus d'articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;