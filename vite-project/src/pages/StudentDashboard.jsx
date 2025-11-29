import React from "react";
import EventList from "../components/EventList";

export default function StudentDashboard({ events, onRegister, onUnregister }) {
    return (
        <div style={{
            padding: '0',
            backgroundColor: '#f0f8ff',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#2e8b57',
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '2.5em',
                padding: '20px'
            }}>Student Dashboard</h1>
            <EventList events={events} onRegister={onRegister} onUnregister={onUnregister} />
        </div>
    );
}