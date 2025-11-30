import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AddStudent() {
  const location = useLocation();
  const [student, setStudent] = useState({ name: '', email: '', roll: '', className: '' });
  const [saved, setSaved] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setStudent(s => ({ ...s, [name]: value }));
  }

  // Prefill form from URL query params (e.g. ?name=John&email=john%40example.com&roll=12&className=2025)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const roll = params.get('roll') || '';
    const className = params.get('className') || '';
    if (name || email || roll || className) {
      setStudent({ name, email, roll, className });
    }
  }, [location.search]);

  function onSubmit(e) {
    e.preventDefault();
    // Demo: persist to localStorage list
    try {
      const stored = JSON.parse(localStorage.getItem('students') || '[]');
      const next = { id: Date.now(), ...student };
      localStorage.setItem('students', JSON.stringify([next, ...stored]));
      // also write a refresh key so child list can react
      localStorage.setItem('students_last_update', String(Date.now()));
      setSaved(next);
      setStudent({ name: '', email: '', roll: '', className: '' });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 140px)' }}>
      <div style={{ width: '100%', maxWidth: 980 }}>
        <h1>Add Student</h1>
        <p>Use this form to add a student. For the demo, added students are saved to <code>localStorage</code>.</p>

        {saved && (
          <div style={{ padding: 12, background: '#ecfdf5', borderRadius: 6, marginBottom: 12 }}>Student <strong>{saved.name}</strong> (ID: {saved.id}) added successfully.</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Full name</span>
              <input name="name" placeholder="Full name" value={student.name} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} required />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Email</span>
              <input name="email" placeholder="Email" value={student.email} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} required />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Roll number</span>
              <input name="roll" placeholder="Roll number" value={student.roll} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Class / Year</span>
              <input name="className" placeholder="Class / Year" value={student.className} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} />
            </label>

            <div>
              <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, background: '#0f766e', color: 'white', border: 'none', cursor: 'pointer' }}>Add Student</button>
            </div>
          </form>

          <div>
            <h2 style={{ marginTop: 0 }}>Current Students (localStorage)</h2>
            <StudentList refreshKey={saved ? saved.id : null} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentList({ refreshKey = null }) {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('students') || '[]'); } catch (e) { return []; }
  });

  React.useEffect(() => {
    // reload list when refreshKey changes
    try { setList(JSON.parse(localStorage.getItem('students') || '[]')); } catch (e) { setList([]); }
  }, [refreshKey]);

  function remove(id) {
    const next = list.filter(s => s.id !== id);
    setList(next);
    localStorage.setItem('students', JSON.stringify(next));
  }

  if (!list.length) return <div>No students added yet.</div>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {list.map(s => (
        <li key={s.id} style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700 }}>{s.name}</div>
            <div style={{ fontSize: 13, color: '#374151' }}>{s.email} {s.roll ? ` • Roll: ${s.roll}` : ''} {s.className ? ` • ${s.className}` : ''}</div>
          </div>
          <div>
            <button onClick={() => remove(s.id)} style={{ color: '#b91c1c', background: 'transparent', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
