import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Student Details Management System. All rights reserved.</p>
        </footer>
    );
};

export default Footer;