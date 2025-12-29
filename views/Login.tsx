
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  teachers: (User & { password?: string })[];
}

const Login: React.FC<LoginProps> = ({ onLogin, teachers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.TEACHER);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === UserRole.ADMIN) {
      if (email === 'admin@gmail.com' && password === '12345678') {
        onLogin({
          id: 'admin-001',
          name: 'Principal',
          email: 'admin@gmail.com',
          role: UserRole.ADMIN
        });
      } else {
        setError('Invalid administrator credentials.');
      }
    } else {
      // Find teacher in the list
      const foundTeacher = teachers.find(t => t.email.toLowerCase() === email.toLowerCase());
      
      if (foundTeacher) {
        if (foundTeacher.status === 'Inactive') {
          setError('This account has been disabled. Please contact Admin.');
        } else if (foundTeacher.password === password) {
          onLogin(foundTeacher);
        } else {
          setError('Incorrect password for this account.');
        }
      } else {
        setError('No teacher found with this email.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover scale-105"
          alt="School Background"
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-400/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px] px-6 py-12">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-10 transform transition-all duration-500 hover:scale-[1.01]">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 border border-white/20 text-white mb-6 shadow-inner">
              <i className="fas fa-graduation-cap text-3xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">EduQuest</h1>
            <p className="text-blue-100/70 font-medium">Digital Campus Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Switcher */}
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-8">
              <button
                type="button"
                onClick={() => { setRole(UserRole.TEACHER); setError(''); }}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-500 ${
                  role === UserRole.TEACHER 
                  ? 'bg-white text-blue-900 shadow-[0_4px_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white'
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => { setRole(UserRole.ADMIN); setError(''); }}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-500 ${
                  role === UserRole.ADMIN 
                  ? 'bg-white text-blue-900 shadow-[0_4px_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 p-4 rounded-2xl flex items-center space-x-3 text-red-100 animate-bounce">
                <i className="fas fa-circle-exclamation"></i>
                <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className={`relative transition-all duration-300 ${isFocused === 'email' ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <i className={`fas fa-envelope transition-colors ${isFocused === 'email' ? 'text-white' : 'text-white/40'}`}></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 outline-none transition-all"
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className={`relative transition-all duration-300 ${isFocused === 'password' ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <i className={`fas fa-lock transition-colors ${isFocused === 'password' ? 'text-white' : 'text-white/40'}`}></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 outline-none transition-all"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end px-2">
              <button type="button" className="text-xs font-bold text-white/50 hover:text-white transition-colors">
                FORGOT PASSWORD?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-900 font-extrabold py-5 rounded-[2rem] shadow-xl hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              LOG IN
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
              EduQuest Academy Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
