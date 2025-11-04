import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  getStudents: () => api.get('/students'),
  getStudentProgress: (studentId: string) => api.get(`/students/${studentId}/progress`),
};

export const sessionService = {
  createSession: (sessionData: any) => api.post('/sessions', sessionData),
  getStudentSessions: (studentId: string) => api.get(`/sessions/student/${studentId}`),
};
