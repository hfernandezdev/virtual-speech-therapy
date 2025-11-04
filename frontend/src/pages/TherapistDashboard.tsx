import React, { useState, useEffect } from 'react';
import type { Student, Session } from '../types';
import { studentService, sessionService } from '../services/api';
import StudentList from '../components/StudentList';
import SessionForm from '../components/SessionForm';
import ProgressChart from '../components/ProgressChart';
import CaseloadMetrics from '../components/CaseloadMetrics';

const TherapistDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'caseload' | 'session'>('caseload');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (student: Student) => {
    setSelectedStudent(student);
    setActiveTab('session');
    try {
      const response = await studentService.getStudentProgress(student._id);
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error('Error loading student progress:', error);
    }
  };

  const handleSessionSaved = (newSession: Session) => {
    setSessions(prev => [newSession, ...prev]);
    setActiveTab('caseload');
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">
              Speech Therapy Platform
            </h1>
            <div className="text-sm text-gray-600">
              Terapeuta: Demo User
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('caseload')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'caseload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Caseload View
              </button>
              <button
                onClick={() => setActiveTab('session')}
                disabled={!selectedStudent}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'session'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 disabled:opacity-50'
                }`}
              >
                Session with {selectedStudent?.name || 'Student'}
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'caseload' && (
          <div className="space-y-6">
            <CaseloadMetrics students={students} sessions={sessions} />
            <StudentList
              students={students}
              onSelectStudent={handleSelectStudent}
            />
          </div>
        )}

        {activeTab === 'session' && selectedStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Session Form */}
            <div className="lg:col-span-2">
              <SessionForm
                student={selectedStudent}
                onSessionSaved={handleSessionSaved}
              />
            </div>

            {/* Progress Sidebar */}
            <div className="space-y-6">
              <ProgressChart sessions={sessions} />

              {/* Recent Sessions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Sesiones Recientes</h3>
                <div className="space-y-3">
                  {sessions.slice(0, 3).map((session) => (
                    <div key={session._id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          session.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {session.percentage}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {session.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TherapistDashboard;
