import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Student Management</h2>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/students">Students</Link>
                </li>
                <li>
                    <Link to="/students/new">Add Student</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;