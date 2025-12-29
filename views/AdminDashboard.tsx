
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { analyzeSchoolStats } from '../services/geminiService';
import { User, UserRole, Student, Class } from '../types';

type AdminTab = 'Overview' | 'Teachers' | 'Students' | 'Classes';

const SUBJECTS = ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English Literature', 'Computer Science', 'Arts', 'Physical Education'];

interface AdminDashboardProps {
  teachers: (User & { password?: string })[];
  onUpdateTeachers: React.Dispatch<React.SetStateAction<(User & { password?: string })[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ teachers, onUpdateTeachers }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const [students, setStudents] = useState<Student[]>([
    { id: 's1', name: 'Alice Thompson', classId: 'c1', rollNumber: '101' },
    { id: 's2', name: 'Bob Richards', classId: 'c1', rollNumber: '102' },
    { id: 's3', name: 'Charlie Davis', classId: 'c2', rollNumber: '201' },
  ]);

  const [classes, setClasses] = useState<Class[]>([
    { id: 'c1', name: '10-A', teacherId: 't1', gradeLevel: '10' },
    { id: 'c2', name: '11-B', teacherId: 't2', gradeLevel: '11' },
  ]);

  // Form States
  const [showModal, setShowModal] = useState<AdminTab | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const performanceData = [
    { name: 'Grade 9', average: 4.2 },
    { name: 'Grade 10', average: 3.8 },
    { name: 'Grade 11', average: 4.5 },
    { name: 'Grade 12', average: 4.1 },
  ];

  const COLORS = ['#1e3a8a', '#3b82f6', '#10b981', '#f59e0b'];

  const getInsights = async () => {
    setLoadingAi(true);
    try {
      const insight = await analyzeSchoolStats(performanceData);
      setAiInsight(insight);
    } catch (e) {
      setAiInsight('Failed to load AI insights.');
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Overview') getInsights();
  }, [activeTab]);

  const handleDelete = (id: string, type: AdminTab) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    if (type === 'Teachers') onUpdateTeachers(prev => prev.filter(t => t.id !== id));
    if (type === 'Students') setStudents(prev => prev.filter(s => s.id !== id));
    if (type === 'Classes') setClasses(prev => prev.filter(c => c.id !== id));
  };

  const handleEdit = (item: any, type: AdminTab) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setShowModal(type);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing item
      if (showModal === 'Teachers') {
        onUpdateTeachers(teachers.map(t => t.id === editingId ? { ...t, ...formData } : t));
      } else if (showModal === 'Students') {
        setStudents(students.map(s => s.id === editingId ? { ...s, ...formData } : s));
      } else if (showModal === 'Classes') {
        setClasses(classes.map(c => c.id === editingId ? { ...c, ...formData } : c));
      }
    } else {
      // Add new item
      const id = Math.random().toString(36).substr(2, 9);
      if (showModal === 'Teachers') {
        onUpdateTeachers([...teachers, { ...formData, id, role: UserRole.TEACHER, status: 'Active' }]);
      } else if (showModal === 'Students') {
        setStudents([...students, { ...formData, id }]);
      } else if (showModal === 'Classes') {
        setClasses([...classes, { ...formData, id }]);
      }
    }
    
    closeModal();
  };

  const closeModal = () => {
    setShowModal(null);
    setEditingId(null);
    setFormData({});
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Teachers', value: teachers.length.toString(), trend: '+2', icon: 'fa-user-tie', color: 'blue' },
          { label: 'Active Students', value: students.length.toString(), trend: '+12', icon: 'fa-user-graduate', color: 'green' },
          { label: 'Total Classes', value: classes.length.toString(), trend: 'Stable', icon: 'fa-chalkboard', color: 'amber' },
          { label: 'Avg Attendance', value: '94.2%', trend: '-0.3%', icon: 'fa-check-circle', color: 'indigo' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${m.color}-50 text-${m.color}-600`}>
                <i className={`fas ${m.icon}`}></i>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.trend}</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{m.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center lg:text-left">Academic Performance Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="average" radius={[6, 6, 0, 0]} barSize={50}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-brain text-8xl"></i>
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-sparkles text-amber-400 mr-2"></i> Admin Insights
            </h3>
            <div className="flex-grow">
              {loadingAi ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-full"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                </div>
              ) : (
                <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-line">
                  {aiInsight}
                </p>
              )}
            </div>
            <button 
              onClick={getInsights}
              className="mt-6 bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold py-3 rounded-2xl text-sm transition-all active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Update AI Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTable = (type: AdminTab) => {
    let data: any[] = [];
    let headers: string[] = [];
    if (type === 'Teachers') {
      data = teachers;
      headers = ['Name', 'Subject', 'Email', 'Status', 'Actions'];
    } else if (type === 'Students') {
      data = students;
      headers = ['Name', 'Roll Number', 'Class', 'Actions'];
    } else if (type === 'Classes') {
      data = classes;
      headers = ['Class Name', 'Grade Level', 'Assigned Teacher', 'Actions'];
    }

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Manage {type}</h3>
          <button 
            onClick={() => { setEditingId(null); setFormData({}); setShowModal(type); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20"
          >
            <i className="fas fa-plus mr-2"></i> Add {type.slice(0, -1)}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30 text-gray-500 text-xs font-bold uppercase tracking-wider">
                {headers.map(h => <th key={h} className="px-6 py-4">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item, i) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {type === 'Teachers' ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-blue-900">{item.subject}</span>
                      </div>
                    ) : type === 'Students' ? item.rollNumber : item.gradeLevel}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {type === 'Teachers' ? item.email : type === 'Students' ? (
                      <span className="text-sm font-semibold text-blue-600">
                        {classes.find(c => c.id === item.classId)?.name || 'Unassigned'}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {teachers.find(t => t.id === item.teacherId)?.name || 'None'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {type === 'Teachers' ? (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status}
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item, type)}
                        className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, type)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 px-4 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 mt-2 font-medium">Welcome back, Principal. Manage your staff, students, and academic tracks.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-[1.25rem] self-start md:self-auto">
          {(['Overview', 'Teachers', 'Students', 'Classes'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-bold rounded-[1rem] transition-all duration-300 ${
                activeTab === tab ? 'bg-white text-blue-900 shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="min-h-[500px]">
        {activeTab === 'Overview' ? renderOverview() : renderTable(activeTab)}
      </div>

      {/* Modal for adding/editing items */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl scale-in-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className={`fas ${showModal === 'Teachers' ? 'fa-user-tie' : showModal === 'Students' ? 'fa-user-graduate' : 'fa-chalkboard'} mr-3 text-blue-600`}></i>
              {editingId ? 'Edit' : 'Add New'} {showModal.slice(0, -1)}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name || ''}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                  placeholder="e.g. Dr. Robert Fox"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {showModal === 'Teachers' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Choose Subject</label>
                    <select 
                      required
                      value={formData.subject || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="">-- Select Subject --</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      placeholder="teacher@school.edu"
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password {editingId && <span className="text-xs text-gray-400 font-normal">(Leave blank to keep current)</span>}</label>
                    <input 
                      type="password" 
                      required={!editingId}
                      value={formData.password || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      placeholder="••••••••"
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  {editingId && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Account Status</label>
                      <select 
                        value={formData.status || 'Active'}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              {showModal === 'Students' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Roll Number</label>
                    <input 
                      type="text" 
                      required
                      value={formData.rollNumber || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Assign Class</label>
                    <select 
                      value={formData.classId || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      onChange={e => setFormData({ ...formData, classId: e.target.value })}
                    >
                      <option value="">Select a class</option>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </>
              )}

              {showModal === 'Classes' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Grade Level</label>
                    <input 
                      type="text" 
                      required
                      value={formData.gradeLevel || ''}
                      placeholder="e.g. 10"
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      onChange={e => setFormData({ ...formData, gradeLevel: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Class Teacher</label>
                    <select 
                      value={formData.teacherId || ''}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                      onChange={e => setFormData({ ...formData, teacherId: e.target.value })}
                    >
                      <option value="">Select a teacher</option>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>)}
                    </select>
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20"
                >
                  {editingId ? 'Update' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
