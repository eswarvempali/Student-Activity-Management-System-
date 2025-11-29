import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ActivityDetails from './pages/ActivityDetails';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';
import AddStudent from './pages/AddStudent';
import Footer from './components/Footer';

function App() {
  const [userRole, setUserRole] = useState('student'); // Manage role here
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [events, setEvents] = useState([
    { id: 1, title: "Chess Club", date: "2025-11-10", description: "Weekly chess practice and tournaments", participants: [], registered: false, level: "State", category: "Sports" },
    { id: 2, title: "Soccer Tryouts", date: "2025-11-15", description: "Join the team tryouts for the upcoming season", participants: [], registered: false, level: "International", category: "Sports" },
    { id: 3, title: "Debate Society Meeting", date: "2025-11-12", description: "Discuss current topics and improve speaking skills", participants: [], registered: false, level: "State", category: "Academic" },
    { id: 4, title: "Art Workshop", date: "2025-11-18", description: "Learn painting and drawing techniques with professional artists", participants: [], registered: false, level: "International", category: "Arts" },
    { id: 5, title: "Science Fair Prep", date: "2025-11-20", description: "Prepare projects for the upcoming science fair", participants: [], registered: false, level: "State", category: "Academic" },
    { id: 6, title: "Music Band Practice", date: "2025-11-22", description: "Rehearse for the school concert and performances", participants: [], registered: false, level: "International", category: "Arts" },
    { id: 7, title: "Volleyball Tournament", date: "2025-11-25", description: "Compete in the inter-school volleyball event", participants: [], registered: false, level: "State", category: "Sports" },
    { id: 8, title: "Coding Bootcamp", date: "2025-11-28", description: "Introduction to programming for beginners", participants: [], registered: false, level: "International", category: "Technology" },
    { id: 9, title: "Environmental Club", date: "2025-12-01", description: "Clean-up drives and environmental awareness campaigns", participants: [], registered: false, level: "State", category: "Community" },
    { id: 10, title: "Photography Workshop", date: "2025-12-05", description: "Learn digital photography and editing techniques", participants: [], registered: false, level: "International", category: "Arts" },
    { id: 11, title: "Math Olympiad Prep", date: "2025-12-08", description: "Prepare for regional and national math competitions", participants: [], registered: false, level: "State", category: "Academic" },
    { id: 12, title: "Drama Club Auditions", date: "2025-12-10", description: "Join the school theater group for upcoming productions", participants: [], registered: false, level: "International", category: "Arts" },
    { id: 13, title: "Basketball League", date: "2025-12-12", description: "Intra-school basketball tournament and training", participants: [], registered: false, level: "State", category: "Sports" },
    { id: 14, title: "Robotics Workshop", date: "2025-12-15", description: "Build and program robots with Arduino kits", participants: [], registered: false, level: "International", category: "Technology" },
    { id: 15, title: "Community Service Day", date: "2025-12-18", description: "Volunteer work at local shelters and organizations", participants: [], registered: false, level: "State", category: "Community" },
    { id: 16, title: "Dance Competition", date: "2025-12-20", description: "Showcase your dance moves in the annual competition", participants: [], registered: false, level: "International", category: "Arts" }
  ]);

  const register = (id) => {
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev;
      const already = ev.participants || [];
      return { ...ev, participants: [...already, "student"], registered: true };
    }));
  };

  const createEvent = (data) => {
    const next = { id: Date.now(), participants: [], registered: false, ...data };
    setEvents(e => [next, ...e]);
  };

  const updateEvent = (id, data) => {
    setEvents(list => list.map(ev => ev.id === id ? { ...ev, ...data } : ev));
  };

  const deleteEvent = (id) => {
    setEvents(list => list.filter(ev => ev.id !== id));
  };

  const unregister = (id) => {
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev;
      return { ...ev, participants: (ev.participants || []).slice(0, -1), registered: false };
    }));
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('student'); // Reset to default
  };

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar userRole={userRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home events={events} isLoggedIn={isLoggedIn} userRole={userRole} />} />
            <Route path="/dashboard" element={<StudentDashboard events={events} onRegister={register} onUnregister={unregister} />} />
            <Route path="/admin" element={<AdminDashboard events={events} onCreateEvent={createEvent} onDeleteEvent={deleteEvent} onUpdateEvent={updateEvent} />} />
            <Route path="/activity/:id" element={<ActivityDetails events={events} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/students/new" element={<AddStudent />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} userRole={userRole} onLogin={handleLogin} onLogout={handleLogout} />} />
            <Route path="/test" element={<div style={{ padding: '20px' }}><h1>Test</h1><p>Test page</p></div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;