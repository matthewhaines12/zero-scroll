import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FocusHub from './pages/FocusHub';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import { ModeProvider } from './context/ModeContext';
import { SettingsProvider } from './context/SettingsContext';
import { SessionProvider } from './context/SessionContext';

function App() {
  return (
    <ModeProvider>
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
                </Routes>
              </Router>
            </TimerProvider>
          </SessionProvider>
        </SettingsProvider>
      </TaskProvider>
    </ModeProvider>
  );
}

export default App;
