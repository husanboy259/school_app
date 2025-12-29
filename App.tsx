
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import Navbar from './components/Navbar';
import Home from './views/Home';
import News from './views/News';
import Gallery from './views/Gallery';
import Login from './views/Login';
import AdminDashboard from './views/AdminDashboard';
import TeacherDashboard from './views/TeacherDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState('/');
  
  // Shared global state for teachers to allow cross-view access
  const [teachers, setTeachers] = useState<(User & { password?: string })[]>([
    { id: 't1', name: 'John Smith', email: 'john.smith@gmail.com', password: '123', role: UserRole.TEACHER, status: 'Active', subject: 'Mathematics' },
    { id: 't2', name: 'Sarah Wilson', email: 'sarah.w@gmail.com', password: '456', role: UserRole.TEACHER, status: 'Active', subject: 'Physics' },
    { id: 't3', name: 'Michael Brown', email: 'm.brown@gmail.com', password: '789', role: UserRole.TEACHER, status: 'Inactive', subject: 'History' },
  ]);

  // Handle browser back/forward buttons using hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Set initial path based on hash
    const initialHash = window.location.hash.replace('#', '') || '/';
    setCurrentPath(initialHash);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    // Redirect to respective dashboard after login
    if (authenticatedUser.role === UserRole.ADMIN) {
      navigate('/admin');
    } else {
      navigate('/teacher');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const renderContent = () => {
    // Protected Routes Check
    if (currentPath === '/admin' && user?.role !== UserRole.ADMIN) {
      return <Login onLogin={handleLogin} teachers={teachers} />;
    }
    if (currentPath === '/teacher' && user?.role !== UserRole.TEACHER) {
      return <Login onLogin={handleLogin} teachers={teachers} />;
    }

    switch (currentPath) {
      case '/': return <Home />;
      case '/news': return <News />;
      case '/gallery': return <Gallery />;
      case '/login': return <Login onLogin={handleLogin} teachers={teachers} />;
      case '/admin': return <AdminDashboard teachers={teachers} onUpdateTeachers={setTeachers} />;
      case '/teacher': return <TeacherDashboard user={user as User} />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar 
        user={user} 
        currentPath={currentPath} 
        onNavigate={navigate} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow container mx-auto px-4 max-w-7xl py-6">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-900 p-1.5 rounded-lg">
                <i className="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <span className="font-bold text-2xl tracking-tight text-blue-900">EduQuest</span>
            </div>
            <p className="text-gray-500 max-w-md">
              Leading the way in digital school management. Built with modern technology to serve our students, parents, and educators better.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors font-medium">Home Overview</button></li>
              <li><button onClick={() => navigate('/news')} className="hover:text-blue-600 transition-colors font-medium">Latest News</button></li>
              <li><button onClick={() => navigate('/gallery')} className="hover:text-blue-600 transition-colors font-medium">Photo Gallery</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-blue-600 transition-colors font-medium">Staff Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="flex items-center justify-center md:justify-start"><i className="fas fa-envelope mr-3 text-blue-400 w-4"></i> info@eduquest.academy</li>
              <li className="flex items-center justify-center md:justify-start"><i className="fas fa-phone mr-3 text-blue-400 w-4"></i> +1 (555) 123-4567</li>
              <li className="flex items-center justify-center md:justify-start"><i className="fas fa-map-marker-alt mr-3 text-blue-400 w-4"></i> 123 Education St, Knowledge City</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs font-medium">
          &copy; {new Date().getFullYear()} EduQuest Integrated Management. Version 2.0
        </div>
      </footer>
    </div>
  );
};

export default App;
