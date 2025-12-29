
import React from 'react';
import { MOCK_NEWS } from '../constants';

const News: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">School News & Events</h1>
        <div className="flex space-x-2">
          {['All', 'Events', 'Announcements'].map(filter => (
            <button key={filter} className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-blue-50 hover:border-blue-200 transition-colors">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-12">
        {MOCK_NEWS.map((item) => (
          <article key={item.id} className="flex flex-col md:flex-row gap-8 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={item.title} 
              />
              <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <time className="text-blue-600 font-semibold text-sm mb-2">{item.date}</time>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">{item.content}</p>
              <button className="flex items-center text-blue-600 font-bold hover:translate-x-2 transition-transform">
                Read Full Story <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
