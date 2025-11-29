import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Student Details Management System</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/students">Students</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;