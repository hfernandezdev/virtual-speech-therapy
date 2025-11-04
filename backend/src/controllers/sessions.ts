import { Request, Response } from 'express';
import Session from '../models/Session';

export const createSession = async (req: Request, res: Response) => {
  try {
    const { studentId, correctAnswers, totalAnswers, notes, gameData } = req.body;

    const session = new Session({
      studentId,
      therapistId: 'mock-therapist-id',
      correctAnswers,
      totalAnswers,
      notes,
      gameData,
      date: new Date()
    });

    // En desarrollo, simular guardado
    const savedSession = {
      ...session.toObject(),
      _id: 'mock-session-id',
      percentage: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0
    };

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // Mock sessions
    const sessions = [
      {
        _id: '1',
        studentId,
        date: new Date('2024-01-15'),
        correctAnswers: 8,
        totalAnswers: 10,
        percentage: 80,
        notes: 'Great progress with vowel sounds'
      }
    ];

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error });
  }
};
