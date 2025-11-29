import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, userRole, onLogin, onLogout }) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Demo credentials - in a real app, this would be handled by a backend
  const credentials = {
    student: { username: 'student', password: 'student123' },
    admin: { username: 'admin', password: 'admin123' }
  };

  const handleLogin = () => {
    setError('');

    // Validate username and password
    if (!username) {
      setError('Please enter a username');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (username !== credentials[role].username || password !== credentials[role].password) {
      setError(`Incorrect username or password for ${role} account`);
      return;
    }

    // Credentials are correct
    onLogin(role);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (isLoggedIn) {
    // Logged in state
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '4em',
              marginBottom: '20px'
            }}>
              {userRole === 'admin' ? '👨‍💼' : '🎓'}
            </div>
            <h1 style={{
              color: '#333',
              marginBottom: '10px',
              fontSize: '2.5em',
              fontWeight: 'bold'
            }}>Welcome Back!</h1>
            <p style={{
              color: '#666',
              fontSize: '1.1em',
              margin: '0'
            }}>You are currently logged in as</p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              color: '#4CAF50',
              margin: '0 0 10px 0',
              fontSize: '1.5em'
            }}>
              {userRole === 'admin' ? 'Administrator' : 'Student'}
            </h2>
            <p style={{
              color: '#666',
              margin: '0',
              fontSize: '0.9em'
            }}>
              {userRole === 'admin'
                ? 'You have full access to event management and analytics.'
                : 'You can browse activities and manage your registrations.'
              }
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => navigate(userRole === 'admin' ? '/admin' : '/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1em',
                fontWeight: 'bold',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
              }}
            >
              Go to {userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: 'bold',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
              }}
            >
              Sign Out
            </button>
          </div>

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #e1e5e9'
          }}>
            <p style={{
              color: '#666',
              fontSize: '0.9em',
              margin: '0'
            }}>
              <strong>Current Session:</strong><br/>
              Access level: {userRole}<br/>
              Platform: Student Activities Management
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in state - show login form
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: '30px'
        }}>
          <h1 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '2.5em',
            fontWeight: 'bold'
          }}>Welcome Back</h1>
          <p style={{
            color: '#666',
            fontSize: '1.1em',
            margin: '0'
          }}>Sign in to your account</p>
        </div>

        <div style={{
            marginBottom: '25px'
        }}>
          <label style={{
              display: 'block',
              textAlign: 'left',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '0.9em'
          }}>Select Your Role</label>
          <select value={role} onChange={(e) => handleRoleChange(e.target.value)} style={{
              padding: '12px 15px',
              width: '100%',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1em',
              backgroundColor: 'white',
              color: '#333',
              transition: 'border-color 0.3s',
              outline: 'none'
          }}>
            <option value="student">🎓 Student</option>
            <option value="admin">👨‍💼 Administrator</option>
          </select>
        </div>

        <div style={{
            marginBottom: '25px'
        }}>
          <label style={{
              display: 'block',
              textAlign: 'left',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '0.9em'
          }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter ${role} username`}
            style={{
              padding: '12px 15px',
              width: '100%',
              border: error && error.includes('username') ? '2px solid #dc3545' : '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1em',
              backgroundColor: 'white',
              color: '#333',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
            marginBottom: '25px'
        }}>
          <label style={{
              display: 'block',
              textAlign: 'left',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '0.9em'
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Enter ${role} password`}
            style={{
              padding: '12px 15px',
              width: '100%',
              border: error && error.includes('password') ? '2px solid #dc3545' : '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1em',
              backgroundColor: 'white',
              color: '#333',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
          />
          {error && (
            <div style={{
              color: '#dc3545',
              fontSize: '0.8em',
              marginTop: '5px',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}
        </div>        <button onClick={handleLogin} style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1.1em',
          fontWeight: 'bold',
          width: '100%',
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
        }}>Sign In</button>

        <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #e1e5e9'
        }}>
          <p style={{
              color: '#666',
              fontSize: '0.9em',
              margin: '0 0 10px 0'
          }}>
            <strong>Demo Credentials:</strong>
          </p>
          <div style={{
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '0.8em',
              color: '#666'
          }}>
            <div><strong>Student:</strong> student / student123</div>
            <div><strong>Admin:</strong> admin / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;