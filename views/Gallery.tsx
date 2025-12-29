
import React from 'react';
import { MOCK_GALLERY } from '../constants';

const Gallery: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Capturing Memories</h1>
        <p className="text-gray-600 italic">"A glimpse into the daily life, achievements, and vibrant community at EduQuest Academy."</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_GALLERY.map((item) => (
          <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow-lg aspect-video cursor-pointer">
            <img 
              src={item.url} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={item.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
          View All Albums
        </button>
      </div>
    </div>
  );
};

export default Gallery;
