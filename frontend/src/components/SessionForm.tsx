import React, { useState } from 'react';
import type { Student, Session } from '../types';
import { sessionService } from '../services/api';

interface SessionFormProps {
  student: Student;
  onSessionSaved: (session: Session) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ student, onSessionSaved }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (totalAnswers === 0) {
      alert('Por favor ingresa el número total de respuestas');
      return;
    }

    setIsSubmitting(true);
    try {
      const sessionData = {
        studentId: student._id,
        correctAnswers,
        totalAnswers,
        notes,
        gameData: {}
      };

      const response = await sessionService.createSession(sessionData);
      onSessionSaved(response.data);

      // Reset form
      setCorrectAnswers(0);
      setTotalAnswers(0);
      setNotes('');

    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error al guardar la sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentage = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Registro de Sesión - {student.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stats Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Respuestas Correctas
            </label>
            <input
              type="number"
              min="0"
              value={correctAnswers}
              onChange={(e) => setCorrectAnswers(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total de Respuestas
            </label>
            <input
              type="number"
              min="0"
              value={totalAnswers}
              onChange={(e) => setTotalAnswers(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Percentage Display */}
        {totalAnswers > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-800">Porcentaje de Éxito:</span>
              <span className={`text-lg font-bold ${
                percentage >= 80 ? 'text-green-600' :
                percentage >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  percentage >= 80 ? 'bg-green-500' :
                  percentage >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones y Notas
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Notas sobre el progreso, comportamiento, áreas de mejora..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || totalAnswers === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Sesión'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
