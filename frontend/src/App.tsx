import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import TherapistDashboard from './pages/TherapistDashboard';
import StudentView from './pages/StudentView';
import './index.css';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<TherapistDashboard />} />
            <Route path="/student/:id" element={<StudentView />} />
            <Route path="/therapist" element={<TherapistDashboard />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
