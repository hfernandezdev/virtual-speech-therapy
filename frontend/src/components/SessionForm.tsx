import React, { useState } from 'react';
import type { Student, Session } from '../types';
import { sessionService } from '../services/api';
import VideoCall from './VideoCall';
import PhaserGame from './PhaserGame';

interface SessionFormProps {
  student: Student;
  onSessionSaved: (session: Session) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ student, onSessionSaved }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<'video' | 'game' | 'notes'>('video');
  const [gameData, setGameData] = useState<any>({});
  const [roomUrl, setRoomUrl] = useState<string>('');

  // Simular creación de sala de video
  React.useEffect(() => {
    const generateRoomUrl = async () => {
      // En producción: const url = await DailyService.createRoom(DailyService.generateRoomName());
      const mockUrl = `https://therapy.daily.co/session-${student._id}-${Date.now()}`;
      setRoomUrl(mockUrl);
    };

    generateRoomUrl();
  }, [student._id]);

  const handleGameUpdate = (data: any) => {
    setGameData(data);
    // Actualizar respuestas basado en el juego
    if (data.isCorrect !== undefined) {
      setCorrectAnswers(prev => data.isCorrect ? prev + 1 : prev);
      setTotalAnswers(prev => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (totalAnswers === 0) {
      alert('Por favor completa al menos una ronda del juego');
      return;
    }

    setIsSubmitting(true);
    try {
      const sessionData = {
        studentId: student._id,
        correctAnswers,
        totalAnswers,
        notes,
        gameData
      };

      const response = await sessionService.createSession(sessionData);
      onSessionSaved(response.data);

      // Reset form
      setCorrectAnswers(0);
      setTotalAnswers(0);
      setNotes('');
      setGameData({});

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
        Sesión con {student.name}
      </h2>

      {/* Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['video', 'game', 'notes'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeSection === section
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {section === 'video' ? 'Video Call' :
                 section === 'game' ? 'Therapy Game' : 'Session Notes'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Section Content */}
      <div className="mb-6">
        {activeSection === 'video' && (
          <VideoCall
            roomUrl={roomUrl}
            onCallEnd={() => setActiveSection('game')}
          />
        )}

        {activeSection === 'game' && (
          <PhaserGame
            studentId={student._id}
            therapistId="mock-therapist-id"
            onGameUpdate={handleGameUpdate}
          />
        )}

        {activeSection === 'notes' && (
          <div className="space-y-6">
            {/* Stats Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Resumen del Juego</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-blue-600">Respuestas Correctas:</span>
                  <p className="text-lg font-bold">{correctAnswers}</p>
                </div>
                <div>
                  <span className="text-sm text-blue-600">Total Respuestas:</span>
                  <p className="text-lg font-bold">{totalAnswers}</p>
                </div>
                <div>
                  <span className="text-sm text-blue-600">Porcentaje:</span>
                  <p className={`text-lg font-bold ${
                    percentage >= 80 ? 'text-green-600' :
                    percentage >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Notes Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones y Notas de la Sesión
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notas sobre el progreso, comportamiento, áreas de mejora, observaciones durante el juego..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || totalAnswers === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : 'Finalizar y Guardar Sesión'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionForm;
