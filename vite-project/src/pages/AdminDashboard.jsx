import React, { useState } from "react";
import EventForm from "../components/EventForm";

export default function AdminDashboard({ events, onCreateEvent, onDeleteEvent, onUpdateEvent, students = [] }) {
    const [editingEvent, setEditingEvent] = useState(null);

    const handleEdit = (event) => {
        setEditingEvent(event);
    };

    const handleUpdate = (data) => {
        onUpdateEvent(editingEvent.id, data);
        setEditingEvent(null);
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
    };

    // Calculate statistics
    const totalRegistrations = events.reduce((sum, event) => sum + event.participants.length, 0);
    const eventsWithRegistrations = events.filter(event => event.participants.length > 0).length;
    const mostPopularEvent = events.reduce((max, event) =>
        event.participants.length > max.participants.length ? event : max, events[0] || { participants: [] });
    const categoriesStats = events.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + event.participants.length;
        return acc;
    }, {});

    return (
        <div style={{
            padding: '0',
            backgroundColor: '#fffacd',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#dc143c',
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '2.5em',
                padding: '20px'
            }}>Admin Dashboard</h1>

            {/* Statistics Section */}
            <div style={{
                padding: '20px',
                backgroundColor: 'white',
                margin: '0 20px 30px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    color: '#8b0000',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>Registration Statistics</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ color: '#4CAF50', fontSize: '2em', margin: '0' }}>{totalRegistrations}</h3>
                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Total Registrations</p>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ color: '#2196F3', fontSize: '2em', margin: '0' }}>{eventsWithRegistrations}</h3>
                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Events with Registrations</p>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ color: '#FF9800', fontSize: '1.5em', margin: '0' }}>
                            {mostPopularEvent?.title || 'None'}
                        </h3>
                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Most Popular Event</p>
                        <small style={{ color: '#999' }}>
                            {mostPopularEvent?.participants.length || 0} registrations
                        </small>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ color: '#9C27B0', fontSize: '2em', margin: '0' }}>
                            {Object.keys(categoriesStats).length}
                        </h3>
                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Active Categories</p>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>Registrations by Category:</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {Object.entries(categoriesStats).map(([category, count]) => (
                            <span key={category} style={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                padding: '5px 10px',
                                borderRadius: '15px',
                                fontSize: '0.8em',
                                fontWeight: 'bold'
                            }}>
                                {category}: {count}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <EventForm onCreate={onCreateEvent} editingEvent={editingEvent} onUpdate={handleUpdate} onCancel={handleCancelEdit} />
            <h2 style={{
                marginTop: '40px',
                color: '#8b0000',
                textAlign: 'center',
                padding: '0 20px'
            }}>Manage Events</h2>
            <ul style={{
                padding: '0 20px 20px',
                listStyle: "none",
                display: 'grid',
                gap: '15px'
            }}>
                {events.map(e => (
                    <li key={e.id} style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        borderRadius: "8px",
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                <strong style={{ color: '#333' }}>{e.title}</strong>
                                <span style={{
                                    backgroundColor: e.participants.length > 0 ? '#4CAF50' : '#ccc',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '0.7em',
                                    fontWeight: 'bold'
                                }}>
                                    {e.participants.length} registered
                                </span>
                            </div>
                            <small style={{ color: '#666' }}>📅 {e.date}</small>
                            <div style={{ marginTop: '5px', color: '#555' }}>
                                <small>Level: {e.level} | Category: {e.category}</small>
                            </div>
                            <div style={{ marginTop: '5px', color: '#555' }}><small>{e.description}</small></div>
                            {e.participants.length > 0 && (
                                <div style={{ marginTop: '8px' }}>
                                    <small style={{ color: '#666', fontWeight: 'bold' }}>Registered: </small>
                                    <span style={{ color: '#333', fontSize: '0.8em' }}>
                                        {e.participants.map(pid => (students.find(s => s.id === pid)?.name || pid)).join(', ')}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(e)} style={{
                                backgroundColor: '#ffa500',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>Edit</button>
                            <button onClick={() => onDeleteEvent(e.id)} style={{
                                backgroundColor: '#dc143c',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}