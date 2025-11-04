import { Request, Response } from 'express';
import Student from '../models/Student';
import Session from '../models/Session';

export const getStudents = async (req: Request, res: Response) => {
  try {
    // Mock data para desarrollo
    const students = [
      {
        _id: '1',
        name: 'Ana García',
        therapistId: 'mock-therapist-id',
        createdAt: new Date()
      },
      {
        _id: '2',
        name: 'Carlos López',
        therapistId: 'mock-therapist-id',
        createdAt: new Date()
      }
    ];

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

export const getStudentProgress = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // Mock sessions data
    const sessions = [
      {
        _id: '1',
        studentId,
        therapistId: 'mock-therapist-id',
        date: new Date('2024-01-15'),
        correctAnswers: 8,
        totalAnswers: 10,
        percentage: 80,
        notes: 'Excellent participation today'
      },
      {
        _id: '2',
        studentId,
        therapistId: 'mock-therapist-id',
        date: new Date('2024-01-10'),
        correctAnswers: 6,
        totalAnswers: 10,
        percentage: 60,
        notes: 'Good effort, needs practice with R sounds'
      }
    ];

    const overallStats = {
      totalSessions: sessions.length,
      averagePercentage: sessions.reduce((acc, session) => acc + session.percentage, 0) / sessions.length,
      lastSession: sessions[0]
    };

    res.json({ student: { _id: studentId, name: 'Ana García' }, sessions, overallStats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student progress', error });
  }
};
