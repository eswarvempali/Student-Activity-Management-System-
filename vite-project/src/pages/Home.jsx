import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ events, isLoggedIn, userRole }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
  const totalParticipants = events.reduce((sum, event) => sum + event.participants.length, 0);
  const categories = [...new Set(events.map(event => event.category))];

  // Filter events based on selected category
  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  const featuredEvents = filteredEvents.slice(0, 3); // Show first 3 events as featured

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3em',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {isLoggedIn
            ? `Welcome back${userRole === 'admin' ? ', Administrator' : ', Student'}!`
            : 'Welcome to the Student Activity Management Portal'
          }
        </h1>
        <p style={{
          fontSize: '1.3em',
          marginBottom: '30px',
          opacity: '0.9'
        }}>
          {isLoggedIn
            ? 'Continue exploring student activities and managing your experience.'
            : 'Student Activities Platform - Discover, Participate, Excel'
          }
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {isLoggedIn ? (
            <>
              <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} style={{
                backgroundColor: 'white',
                color: '#4CAF50',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em',
                transition: 'all 0.3s'
              }}>
                Go to {userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
              <Link to="/login" style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '12px 24px',
                border: '2px solid white',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em',
                transition: 'all 0.3s'
              }}>Account Settings</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{
                backgroundColor: 'white',
                color: '#4CAF50',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em',
                transition: 'all 0.3s'
              }}>View Dashboard</Link>
              <Link to="/login" style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '12px 24px',
                border: '2px solid white',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em',
                transition: 'all 0.3s'
              }}>Login</Link>
            </>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <h3 style={{ color: '#4CAF50', fontSize: '2.5em', margin: '0' }}>{totalEvents}</h3>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Total Events</p>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <h3 style={{ color: '#2196F3', fontSize: '2.5em', margin: '0' }}>{upcomingEvents}</h3>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Upcoming Events</p>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <h3 style={{ color: '#FF9800', fontSize: '2.5em', margin: '0' }}>{totalParticipants}</h3>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Total Participants</p>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <h3 style={{ color: '#9C27B0', fontSize: '2.5em', margin: '0' }}>{categories.length}</h3>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Categories</p>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '2.2em'
        }}>
          {selectedCategory ? `${selectedCategory} Events` : 'Featured Events'}
        </h2>
        {filteredEvents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#666', margin: '0' }}>No events found in this category</h3>
            <p style={{ color: '#999', margin: '10px 0 20px 0' }}>Try selecting a different category</p>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em'
              }}
            >
              Show All Events
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {featuredEvents.map(event => (
                <div key={event.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{
                    backgroundColor: event.level === 'International' ? '#FF6B6B' : '#4ECDC4',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'inline-block',
                    fontSize: '0.8em',
                    marginBottom: '10px'
                  }}>
                    {event.level}
                  </div>
                  <h3 style={{
                    color: '#333',
                    margin: '10px 0',
                    fontSize: '1.4em'
                  }}>{event.title}</h3>
                  <p style={{
                    color: '#666',
                    margin: '10px 0',
                    lineHeight: '1.5'
                  }}>{event.description}</p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <span style={{ color: '#999', fontSize: '0.9em' }}>
                      📅 {new Date(event.date).toLocaleDateString()}
                    </span>
                    <Link to={`/activity/${event.id}`} style={{
                      color: '#4CAF50',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}>View Details →</Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link to="/dashboard" style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}>View All Events</Link>
            </div>
          </>
        )}
      </div>

      {/* Categories Section */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '30px',
          fontSize: '2.2em'
        }}>Explore Categories</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              backgroundColor: selectedCategory === null ? '#4CAF50' : '#e9ecef',
              color: selectedCategory === null ? 'white' : '#333',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            All Categories
          </button>
          {categories.map(category => {
            const eventCount = events.filter(event => event.category === category).length;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#4CAF50' : '#e9ecef',
                  color: selectedCategory === category ? 'white' : '#333',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9em',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
              >
                {category} ({eventCount})
              </button>
            );
          })}
        </div>
        {selectedCategory && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #ccc',
                padding: '5px 15px',
                borderRadius: '15px',
                fontSize: '0.8em',
                cursor: 'pointer'
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;