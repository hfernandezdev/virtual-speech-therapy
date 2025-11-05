import React from 'react';
import type { Session } from '../types';

interface ProgressChartProps {
  sessions: Session[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ sessions }) => {
  const sortedSessions = [...sessions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  const maxPercentage = Math.max(...sortedSessions.map(s => s.percentage), 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Progreso Reciente</h3>

      {sortedSessions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay datos de sesiones aún</p>
      ) : (
        <div className="space-y-3">
          {sortedSessions.map((session, /*index*/) => (
            <div key={session._id} className="flex items-center space-x-3">
              <div className="text-sm text-gray-600 w-20">
                {new Date(session.date).toLocaleDateString()}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    session.percentage >= 80 ? 'bg-green-500' :
                    session.percentage >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${(session.percentage / maxPercentage) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm font-medium w-12 text-right">
                {session.percentage}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
