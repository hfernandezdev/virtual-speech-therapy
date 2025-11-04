import React from 'react';
import { useParams } from 'react-router-dom';

const StudentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Vista del Estudiante
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-xl font-semibold mb-2">Vista del Estudiante</h2>
          <p className="text-gray-600 mb-4">
            Esta vista estaría optimizada para el estudiante con interfaces de juego grandes y simples.
          </p>
          <p className="text-sm text-gray-500">
            ID del estudiante: {id}
          </p>
        </div>
      </main>
    </div>
  );
};

export default StudentView;
