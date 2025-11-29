import React from 'react';

export default function About() {
  return (
    <div style={{ padding: 24 }}>
      <h1>About Student Activity Management</h1>
      <p>
        This project is a lightweight Student Activity Management System built with React and Vite.
        It demonstrates a simple event/activity dashboard, role-based views (student/admin), and
        client-side routing using React Router.
      </p>

      <h2>What is the Student Activity Management System?</h2>
      <p>
        The Student Activity Management System is a small demo application that helps manage school or
        college activities and events. It provides a clear view of upcoming activities, allows students
        to register or unregister, and offers administrative capabilities to create, update and remove events.
      </p>

      <h3>Purpose & Benefits</h3>
      <ul>
        <li>Centralize event details and schedules for students and staff.</li>
        <li>Simplify registration and attendance tracking for activities.</li>
        <li>Provide role-based views so admins can manage events while students can browse and sign up.</li>
        <li>Work as a starting point for integrating with a backend or persistent storage.</li>
      </ul>

      <h2>About (Navbar)</h2>
      <p>
        The <strong>About</strong> link in the navbar leads here. Use the navbar to navigate between
        the main sections: Home, Students, About, Contact and to quickly add a new student using
        the <em>Add Student</em> button. The navbar also includes a search field and a profile
        menu for quick account actions.
      </p>

      <h2>Features</h2>
      <ul>
        <li>List of student activities and events</li>
        <li>Register / unregister for events (demo state only)</li>
        <li>Admin view to create, update, and delete events</li>
        <li>Simple authentication stub (login/logout) with roles</li>
        <li>Search and navigation through the Navbar</li>
      </ul>

      <h2>Tech</h2>
      <p>Built with React, Vite, and React Router. Styles are minimal and inline for the demo.</p>

      <h2>Running Locally</h2>
      <p>From the project folder run:</p>
      <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
        npm install
        npm run dev
      </pre>

      <h2>Notes</h2>
      <p>
        Data in this demo is stored in React component state and will reset on refresh. If you'd like,
        the app can be extended to persist data to a backend or localStorage, and the inline styles
        can be extracted into dedicated CSS files.
      </p>
      <h2>Want More?</h2>
      <p>
        If you want the app to persist students or events, I can add a small in-memory students list
        or wire the forms to localStorage or a mock API. Tell me whether you prefer a simple demo
        storage (localStorage) or a stubbed backend (JSON server) and I will implement it.
      </p>
    </div>
  );
}
