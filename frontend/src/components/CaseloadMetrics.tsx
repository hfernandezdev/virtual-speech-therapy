import React from 'react';
import type { Student, Session } from '../types';

interface CaseloadMetricsProps {
  students: Student[];
  sessions: Session[];
}

const CaseloadMetrics: React.FC<CaseloadMetricsProps> = ({ students, sessions }) => {
  const totalStudents = students.length;
  const totalSessions = sessions.length;
  const avgPercentage = sessions.length > 0
    ? sessions.reduce((acc, session) => acc + session.percentage, 0) / sessions.length
    : 0;

  const metrics = [
    {
      title: 'Total Estudiantes',
      value: totalStudents,
      color: 'bg-blue-500',
      icon: '👥'
    },
    {
      title: 'Sesiones Totales',
      value: totalSessions,
      color: 'bg-green-500',
      icon: '📊'
    },
    {
      title: 'Progreso Promedio',
      value: `${avgPercentage.toFixed(1)}%`,
      color: 'bg-purple-500',
      icon: '📈'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className={`${metric.color} rounded-lg p-3 mr-4`}>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseloadMetrics;
