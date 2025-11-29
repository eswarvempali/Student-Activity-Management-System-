import { useParams } from 'react-router-dom';

function ActivityDetails({ events }) {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center'
      }}>
        <h1 style={{ color: '#4169e1', fontSize: '2.5em' }}>Event Not Found</h1>
        <p style={{ fontSize: '1.2em', color: '#333' }}>The requested activity could not be found.</p>
      </div>
    );
  }

  return (
    <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
            color: '#4169e1',
            fontSize: '2.5em',
            marginBottom: '20px',
            textAlign: 'center'
        }}>{event.title}</h1>
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#333', fontSize: '1.2em' }}>Level:</strong> <span style={{ color: '#666' }}>{event.level}</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#333', fontSize: '1.2em' }}>Category:</strong> <span style={{ color: '#666' }}>{event.category}</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#333', fontSize: '1.2em' }}>Description:</strong>
          <p style={{ color: '#555', lineHeight: '1.6', marginTop: '10px' }}>{event.description}</p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#333', fontSize: '1.2em' }}>Participants:</strong> <span style={{ color: '#666' }}>{event.participants.length}</span>
        </div>
        {event.participants.length > 0 && (
          <div>
            <strong style={{ color: '#333', fontSize: '1.2em' }}>Registered Participants:</strong>
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              {event.participants.map((p, index) => (
                <li key={index} style={{ color: '#555' }}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityDetails;