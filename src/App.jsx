import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
