import React from "react";
import { Link } from 'react-router-dom';

export default function EventList({ events, onRegister, onUnregister }) {
    return (
        <div>
            <h2 style={{
                color: '#2e8b57',
                textAlign: 'center',
                marginBottom: '20px'
            }}>Upcoming Activities</h2>
            {events.length === 0 ? <p style={{
                textAlign: 'center',
                color: '#666'
            }}>No events scheduled.</p> : null}
            <ul style={{
                padding: 0,
                listStyle: "none",
                display: 'grid',
                gap: '15px'
            }}>
                {events.map(e => (
                    <li key={e.id} style={{
                        border: "1px solid #ddd",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <strong style={{ color: '#333', fontSize: '1.2em' }}>{e.title}</strong> — <small style={{ color: '#666' }}>{e.date}</small>
                            <div style={{ marginTop: '5px', color: '#777', fontWeight: 'bold' }}>
                                Level: {e.level} | Category: {e.category}
                            </div>
                            <div style={{ marginTop: '5px', color: '#555' }}><small>{e.description}</small></div>
                            <Link to={`/activity/${e.id}`} style={{
                                fontSize: '0.9em',
                                color: '#4169e1',
                                textDecoration: 'none',
                                marginTop: '10px',
                                display: 'inline-block'
                            }}>View Details</Link>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            {e.registered ? (
                                <button onClick={() => onUnregister(e.id)} style={{
                                    backgroundColor: '#ff6347',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginBottom: '10px'
                                }}>Unregister</button>
                            ) : (
                                <button onClick={() => onRegister(e.id)} style={{
                                    backgroundColor: '#32cd32',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginBottom: '10px'
                                }}>Register</button>
                            )}
                            <div style={{
                                marginTop: '10px',
                                fontSize: '0.9em',
                                color: '#666'
                            }}>Participants: {e.participants?.length || 0}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}