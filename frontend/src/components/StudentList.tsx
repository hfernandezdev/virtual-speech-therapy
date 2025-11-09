import React from 'react';
import type { Student, Session } from '../types';

interface StudentListProps {
  students: Student[];
  sessions: Session[];
  onSelectStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onSelectStudent,
  sessions
}) => {

  const getStudentSessions = (studentId: string): Session[] => {
    return sessions.filter(session => session.studentId === studentId);
  };

  const getStudentProgress = (studentId: string) => {
    const studentSessions = getStudentSessions(studentId);

    if (studentSessions.length === 0) {
      return null;
    }

    const recentSessions = studentSessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);

    const avgPercentage = recentSessions.reduce((sum, session) =>
      sum + session.percentage, 0) / recentSessions.length;

    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recentSessions.length >= 2) {
      const latest = recentSessions[0].percentage;
      const previous = recentSessions[recentSessions.length - 1].percentage;
      const difference = latest - previous;

      if (difference > 5) trend = 'improving';
      else if (difference < -5) trend = 'declining';
    }

    return {
      percentage: Math.round(avgPercentage),
      sessionCount: studentSessions.length,
      trend,
      lastSessionDate: recentSessions[0].date
    };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '↗';
      case 'declining': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Estudiantes</h2>
      <div className="space-y-3">
        {students.map((student) => {
          const progress = getStudentProgress(student._id);

          return (
            <div
              key={student._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
              onClick={() => onSelectStudent(student)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {student.name}
                  </h3>
                  {progress ? (
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getProgressColor(progress.percentage)}`}>
                        {progress.percentage}%
                        <span className="ml-1 text-xs">
                          {getTrendIcon(progress.trend)}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {progress.sessionCount} sesión{progress.sessionCount !== 1 ? 'es' : ''}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      Sin sesiones
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  {progress ? (
                    `Última sesión: ${new Date(progress.lastSessionDate).toLocaleDateString()}`
                  ) : (
                    `Creado: ${new Date(student.createdAt).toLocaleDateString()}`
                  )}
                </p>

                {/* Mini barra de progreso */}
                {progress && (
                  <div className="mt-2 max-w-md">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progreso promedio</span>
                      <span>{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          progress.percentage >= 80 ? 'bg-green-500' :
                          progress.percentage >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 ml-4 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform whitespace-nowrap">
                Ver detalles →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentList;
