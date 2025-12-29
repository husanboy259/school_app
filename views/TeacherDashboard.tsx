
import React, { useState } from 'react';
import { generateGradeComment } from '../services/geminiService';
import { User } from '../types';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grade, setGrade] = useState(5);
  const [comment, setComment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);

  const students = [
    { id: '1', name: 'Alice Thompson' },
    { id: '2', name: 'Bob Richards' },
    { id: '3', name: 'Charlie Davis' },
    { id: '4', name: 'Diana Prince' },
  ];

  const handleGenerateComment = async () => {
    if (!selectedStudent) {
      alert("Please select a student first");
      return;
    }
    setIsGenerating(true);
    try {
      const student = students.find(s => s.id === selectedStudent);
      const res = await generateGradeComment(student?.name || 'Student', user.subject || 'Subject', grade);
      setComment(res);
    } catch (e) {
      setComment("Great performance in " + (user.subject || 'the course'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }
    alert(`Grade submitted successfully for ${students.find(s => s.id === selectedStudent)?.name} in ${user.subject}!`);
    // Reset form
    setSelectedStudent('');
    setComment('');
  };

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grading Portal</h1>
          <p className="text-gray-500">Welcome, {user.name}. Specialized in <span className="text-blue-600 font-bold">{user.subject}</span></p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex items-center space-x-3">
          <i className="fas fa-calendar-day text-blue-600"></i>
          <span className="text-sm font-bold text-blue-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">New Entry</h2>
          
          <form onSubmit={handleSubmitGrade} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Class</label>
              <select 
                value={selectedClass} 
                onChange={e => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              >
                <option value="10-A">10-A (Secondary)</option>
                <option value="11-B">11-B (High School)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Student</label>
              <select 
                required
                value={selectedStudent} 
                onChange={e => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              >
                <option value="">Choose a student...</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subject (Locked)</label>
              <div className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 font-bold flex items-center">
                <i className="fas fa-lock mr-2 opacity-50"></i>
                {user.subject || 'Not Assigned'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Assessment Date</label>
              <input 
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Grade (1-5)</label>
              <div className="flex justify-between items-center gap-2">
                {[1,2,3,4,5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGrade(num)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      grade === num ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">Teacher's Comment</label>
                <button 
                  type="button"
                  onClick={handleGenerateComment}
                  disabled={isGenerating}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center transition-colors"
                >
                  {isGenerating ? (
                    <span className="flex items-center"><i className="fas fa-spinner fa-spin mr-1"></i> drafting...</span>
                  ) : (
                    <><i className="fas fa-wand-magic-sparkles mr-1"></i> Use AI Draft</>
                  )}
                </button>
              </div>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                placeholder={`How did the student perform in ${user.subject}?`}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-900 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-[0.98] mt-4"
            >
              Submit Results
            </button>
          </form>
        </div>

        {/* Recent Grades List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Recent Entries for {user.subject}</h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600"><i className="fas fa-filter"></i></button>
                <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600"><i className="fas fa-download"></i></button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left">
                  <tr className="border-b border-gray-50">
                    <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Student</th>
                    <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Class</th>
                    <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Grade</th>
                    <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Alice Thompson', cls: '10-A', grade: 5, date: 'Oct 12' },
                    { name: 'Bob Richards', cls: '10-A', grade: 4, date: 'Oct 12' },
                    { name: 'Charlie Davis', cls: '11-B', grade: 2, date: 'Oct 11' },
                    { name: 'Diana Prince', cls: '10-A', grade: 5, date: 'Oct 10' },
                  ].map((entry, i) => (
                    <tr key={i} className="group hover:bg-blue-50/30 transition-all">
                      <td className="py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {entry.name.charAt(0)}
                          </div>
                          <span className="font-bold text-gray-900">{entry.name}</span>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold">{entry.cls}</span>
                      </td>
                      <td className="py-5">
                        <div className="flex justify-center">
                           <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-sm ${
                             entry.grade >= 4 ? 'bg-green-100 text-green-700' : entry.grade >= 3 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                           }`}>
                             {entry.grade}
                           </span>
                        </div>
                      </td>
                      <td className="py-5 text-gray-400 text-sm font-medium">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-10 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                <i className="fas fa-info-circle"></i>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Grading Reminder</h4>
                <p className="text-amber-700/80 text-xs mt-1 leading-relaxed">
                  Grades submitted are final once the academic period closes. Ensure all feedback comments are professional and helpful for student growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
