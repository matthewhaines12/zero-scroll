import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FocusHub from './pages/FocusHub';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <>
      <div>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<FocusHub />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Leaderboard" element={<Leaderboard />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
