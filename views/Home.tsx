
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden rounded-3xl mx-4 lg:mx-0">
        <img 
          src="https://picsum.photos/seed/campus/1600/900" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="School Campus"
        />
        <div className="relative z-10 px-8 lg:px-16 max-w-2xl text-white">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">Empowering the Leaders of Tomorrow</h1>
          <p className="text-xl mb-8 opacity-90">EduQuest Academy provides a nurturing environment where creativity meets academic excellence.</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
              Explore Programs
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-8 py-3 rounded-full font-bold transition-all">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {[
          { icon: 'fa-users', count: '1,200+', label: 'Students' },
          { icon: 'fa-chalkboard-teacher', count: '85+', label: 'Educators' },
          { icon: 'fa-award', count: '24', label: 'Years Excellence' },
          { icon: 'fa-flask', count: '12', label: 'Advanced Labs' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className={`fas ${stat.icon} text-blue-600 text-xl`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <section className="bg-blue-900 text-white py-16 rounded-3xl mx-4 lg:mx-0 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Educational Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <i className="fas fa-heart text-amber-400 text-4xl"></i>
              <h3 className="text-xl font-semibold">Value Driven</h3>
              <p className="opacity-80 text-sm">Instilling integrity, respect, and responsibility in every student.</p>
            </div>
            <div className="space-y-4">
              <i className="fas fa-lightbulb text-amber-400 text-4xl"></i>
              <h3 className="text-xl font-semibold">Inquiry Based</h3>
              <p className="opacity-80 text-sm">Encouraging curiosity and critical thinking through hands-on learning.</p>
            </div>
            <div className="space-y-4">
              <i className="fas fa-globe text-amber-400 text-4xl"></i>
              <h3 className="text-xl font-semibold">Global Vision</h3>
              <p className="opacity-80 text-sm">Preparing students to thrive in an interconnected global community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
