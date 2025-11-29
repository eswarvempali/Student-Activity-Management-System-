import React, { useState, useEffect } from "react";

export default function EventForm({ onCreate, editingEvent, onUpdate, onCancel }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("State");
    const [category, setCategory] = useState("Academic");

    useEffect(() => {
        if (editingEvent) {
            setTitle(editingEvent.title);
            setDate(editingEvent.date);
            setDescription(editingEvent.description);
            setLevel(editingEvent.level);
            setCategory(editingEvent.category || "Academic");
        } else {
            setTitle("");
            setDate("");
            setDescription("");
            setLevel("State");
            setCategory("Academic");
        }
    }, [editingEvent]);

    function submit(e) {
        e.preventDefault();
        if (!title || !date) return;
        if (editingEvent) {
            onUpdate({ title, date, description, level, category });
        } else {
            onCreate({ title, date, description, level, category });
        }
        if (!editingEvent) {
            setTitle(""); setDate(""); setDescription(""); setLevel("State"); setCategory("Academic");
        }
    }

    return (
        <form onSubmit={submit} style={{
            marginTop: '20px',
            display: "grid",
            gap: '15px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h3 style={{
                color: '#dc143c',
                textAlign: 'center',
                marginBottom: '10px'
            }}>{editingEvent ? 'Edit Event' : 'Create Event'}</h3>
            <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em'
            }} />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em'
            }} />
            <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em'
            }} />
            <select value={level} onChange={e=>setLevel(e.target.value)} style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em'
            }}>
              <option value="State">State</option>
              <option value="International">International</option>
            </select>
            <select value={category} onChange={e=>setCategory(e.target.value)} style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em'
            }}>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Technology">Technology</option>
              <option value="Community">Community</option>
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1em',
                    flex: 1
                }}>{editingEvent ? 'Update Event' : 'Save Event'}</button>
                {editingEvent && (
                    <button type="button" onClick={onCancel} style={{
                        backgroundColor: '#ccc',
                        color: 'black',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1em',
                        flex: 1
                    }}>Cancel</button>
                )}
            </div>
        </form>
    );
}