import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './services/utils/ProtectedRoutes';
import FocusHub from './pages/FocusHub';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSuccess from './pages/SignupSuccess';
import Sidebar from './components/layout/Sidebar';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import { ModeProvider } from './context/ModeContext';
import { SettingsProvider } from './context/SettingsContext';
import { SessionProvider } from './context/SessionContext';
import { AudioProvider } from './context/AudioContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ModeProvider>
      <AuthProvider>
        <AudioProvider>
          <TaskProvider>
            <SettingsProvider>
              <SessionProvider>
                <TimerProvider>
                  <Router>
                    <Sidebar />
                    <Routes>
                      <Route path="/" element={<FocusHub />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="signup" element={<Signup />} />
                      <Route
                        path="signup-success"
                        element={<SignupSuccess />}
                      />
                      {/* Protected routes that require authentication */}
                      <Route element={<ProtectedRoutes />}>
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/settings" element={<Settings />} />
                      </Route>
                    </Routes>
                  </Router>
                </TimerProvider>
              </SessionProvider>
            </SettingsProvider>
          </TaskProvider>
        </AudioProvider>
      </AuthProvider>
    </ModeProvider>
  );
}

export default App;
