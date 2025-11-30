import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ userRole, isLoggedIn, onLogout, currentUser }) {
  const [query, setQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/students?q=${encodeURIComponent(q)}`);
      setQuery('');
    }
  }

  return (
    <nav style={{
      padding: '10px 18px',
      backgroundColor: '#4CAF50',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      gap: '12px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: 0, fontSize: '1.25em' }}>Student Activity Management</h2>
        <div style={{ fontSize: '0.8em', marginTop: '4px' }}>Student Activities Platform</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '700' }}>Home</Link>
        {isLoggedIn && userRole === 'student' && (
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        )}
        {isLoggedIn && userRole === 'admin' && (
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
        )}
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        <Link to="/students/new" className="add-btn" style={{ textDecoration: 'none' }}>Add Student</Link>
      </div>

      <form onSubmit={onSearch} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          aria-label="Search students"
          placeholder="Search students..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          style={{ padding: '6px 8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', position: 'relative' }}>
        <button aria-label="notifications" title="Notifications" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>🔔</button>

        {!isLoggedIn ? (
          <Link to="/login" style={{
            backgroundColor: 'white',
            color: '#4CAF50',
            padding: '8px 14px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontWeight: '700'
          }}>Login</Link>
        ) : (
          <>
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="btn-ghost"
            >
              Me ▾
            </button>

            {profileOpen && (
              <div className="profile-dropdown card" style={{ position: 'absolute', right: 0, top: '56px', padding: '8px', minWidth: '160px' }}>
                <Link to="/profile" style={{ display: 'block', padding: '8px', textDecoration: 'none', color: '#04201a' }}>Profile</Link>
                <Link to="/settings" style={{ display: 'block', padding: '8px', textDecoration: 'none', color: '#04201a' }}>Settings</Link>
                <button onClick={onLogout} style={{ display: 'block', width: '100%', padding: '8px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#dc2626' }}>Logout</button>
              </div>
            )}
          </>
        )}

      </div>

            {isLoggedIn && (
        <div style={{ fontWeight: '600', fontSize: '0.85em', marginLeft: '12px' }}>
          {currentUser && currentUser.name ? `${currentUser.name}` : (userRole === 'admin' ? '👨‍💼 Admin' : '🎓 Student')}
        </div>
      )}
    </nav>
  );
}

export default Navbar;