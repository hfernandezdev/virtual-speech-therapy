import React from 'react';
import type { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}


const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Estudiantes</h2>
      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => onSelectStudent(student)}
          >
            <div>
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-600">
                Última sesión: {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-blue-600 font-semibold">
              Ver progreso →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
