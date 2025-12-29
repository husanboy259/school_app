
import React from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentPath, onNavigate, onLogout }) => {
  const isPublic = !user;

  const NavItem = ({ path, label, icon }: { path: string; label: string; icon: string }) => (
    <button
      onClick={() => onNavigate(path)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentPath === path ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-700'
      }`}
    >
      <i className={`fas ${icon}`}></i>
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="bg-white p-1.5 rounded-lg">
              <i className="fas fa-graduation-cap text-blue-900 text-xl"></i>
            </div>
            <span className="font-bold text-xl tracking-tight">EduQuest</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isPublic ? (
              <>
                <NavItem path="/" label="Home" icon="fa-home" />
                <NavItem path="/news" label="News" icon="fa-newspaper" />
                <NavItem path="/gallery" label="Gallery" icon="fa-images" />
                <button
                  onClick={() => onNavigate('/login')}
                  className="ml-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-transform active:scale-95"
                >
                  Portal Login
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <span className="text-sm italic opacity-80">Logged in as {user.role}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <i className="fas fa-bars text-2xl"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
