import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FocusHub from './pages/FocusHub';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/layout/Sidebar';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import { ModeProvider } from './context/ModeContext';
import { SettingsProvider } from './context/SettingsContext';
import { SessionProvider } from './context/SessionContext';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <ModeProvider>
      <AudioProvider>
        <TaskProvider>
          <SettingsProvider>
            <SessionProvider>
              <TimerProvider>
                <Router>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<FocusHub />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                  </Routes>
                </Router>
              </TimerProvider>
            </SessionProvider>
          </SettingsProvider>
        </TaskProvider>
      </AudioProvider>
    </ModeProvider>
  );
}

export default App;
