import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // For demo: just mark as sent and log to console
    console.log('Contact form submitted', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Contact Us</h1>
      <p>If you have questions, feature requests or want to contribute, contact the project owner or open an issue on the repository.</p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <h2>Contact Info</h2>
          <p>
            <strong>Support</strong>: <a href="mailto:support@student-activity.example">support@student-activity.example</a><br />
            <strong>Project Email</strong>: <a href="mailto:contact@example.com">contact@example.com</a><br />
            <strong>Phone</strong>: +1 (555) 123-4567<br />
            <strong>Address</strong>: 123 School Lane, Education City
          </p>

          <h3>Office Hours</h3>
          <p>Mon — Fri: 09:00 — 17:00 (Local Time)</p>

          <h3>Social</h3>
          <p>
            <a href="#" onClick={(e) => e.preventDefault()}>Twitter</a> • <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a> • <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
          </p>
        </div>

        <div style={{ flex: '1 1 360px', minWidth: 300 }}>
          <h2>Send a Message</h2>
          {sent && <div style={{ padding: 12, background: '#ecfdf5', borderRadius: 6, marginBottom: 12 }}>Thank you — your message was sent.</div>}

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Your name</span>
              <input name="name" placeholder="Your name" value={form.name} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} required />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Your email</span>
              <input name="email" placeholder="Your email" value={form.email} onChange={onChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} required />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Message</span>
              <textarea name="message" placeholder="Message" value={form.message} onChange={onChange} rows={6} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db' }} required />
            </label>

            <div>
              <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, background: '#064e3b', color: 'white', border: 'none', cursor: 'pointer' }}>Send Message</button>
            </div>
          </form>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Map</h3>
        <div style={{ background: '#f3f4f6', height: 160, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Map placeholder
        </div>
      </div>
    </div>
  );
}
