import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
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
  const [currentUser, setCurrentUser] = useState(null); // store logged-in user info (for students)
  const [students, setStudents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('students') || '[]') || [];
    } catch (e) {
      return [];
    }
  });
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
    const title = events.find(ev => ev.id === id)?.title || 'event';
    // only proceed if a student is logged in
    const studentId = currentUser?.id;
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev;
      const already = Array.isArray(ev.participants) ? ev.participants : [];
      // avoid duplicate registration
      const participants = studentId && !already.includes(studentId) ? [...already, studentId] : already;
      return { ...ev, participants, registered: !!(studentId && participants.includes(studentId)) };
    }));
    // persist registration on student record
    if (studentId) {
      setStudents(slist => {
        const updated = slist.map(s => s.id === studentId ? { ...s, registrations: Array.isArray(s.registrations) ? Array.from(new Set([...(s.registrations || []), id])) : [id] } : s);
        try { localStorage.setItem('students', JSON.stringify(updated)); } catch (e) {}
        return updated;
      });
    }
    setToast({ open: true, message: `You have successfully registered for "${title}".`, type: 'success' });
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
    const title = events.find(ev => ev.id === id)?.title || 'event';
    const studentId = currentUser?.id;
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev;
      const already = Array.isArray(ev.participants) ? ev.participants : [];
      const participants = studentId ? already.filter(p => p !== studentId) : already.slice(0, -1);
      return { ...ev, participants, registered: !!(studentId && participants.includes(studentId)) };
    }));
    // update student registrations
    if (studentId) {
      setStudents(slist => {
        const updated = slist.map(s => s.id === studentId ? { ...s, registrations: (s.registrations || []).filter(rid => rid !== id) } : s);
        try { localStorage.setItem('students', JSON.stringify(updated)); } catch (e) {}
        return updated;
      });
    }
    setToast({ open: true, message: `You have been unregistered from "${title}".`, type: 'success' });
  };

  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  function closeToast() {
    setToast(t => ({ ...t, open: false }));
  }

  const handleLogin = (role, user = null) => {
    setUserRole(role);
    setIsLoggedIn(true);
    // if logging in as a student, try to resolve the stored student object
    if (role === 'student' && user) {
      const found = students.find(s => String(s.id) === String(user.id)) || students.find(s => s.email === user.email) || students.find(s => s.name === user.name) || null;
      if (found) {
        setCurrentUser(found);
      } else {
        // user not present in central students list yet (likely just signed up) -> add and persist
        const toAdd = { ...user, registrations: user.registrations || [] };
        setStudents(prev => { const next = [...prev, toAdd]; try { localStorage.setItem('students', JSON.stringify(next)); } catch(e){}; return next; });
        setCurrentUser(toAdd);
      }
    } else {
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('student'); // Reset to default
    setCurrentUser(null);
  };

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar userRole={userRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home events={events} isLoggedIn={isLoggedIn} userRole={userRole} />} />
            <Route path="/dashboard" element={<StudentDashboard events={events} onRegister={register} onUnregister={unregister} currentUser={currentUser} />} />
            <Route path="/admin" element={<AdminDashboard events={events} students={students} onCreateEvent={createEvent} onDeleteEvent={deleteEvent} onUpdateEvent={updateEvent} />} />
            <Route path="/activity/:id" element={<ActivityDetails events={events} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/students/new" element={<AddStudent />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} userRole={userRole} onLogin={handleLogin} onLogout={handleLogout} />} />
            <Route path="/test" element={<div style={{ padding: '20px' }}><h1>Test</h1><p>Test page</p></div>} />
          </Routes>
        </div>
        <Footer />
        <Toast open={toast.open} message={toast.message} onClose={closeToast} type={toast.type} />
      </div>
    </Router>
  );
}

export default App;