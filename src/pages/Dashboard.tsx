import React from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Dashboard: React.FC = () => {
    const { students, loading, error } = useStudents();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading students.</div>;

    return (
        <div>
            <h1>Student Details Management</h1>
            <SearchBar />
            <Table data={students} />
            <Pagination />
            <Link to="/students/new">Add New Student</Link>
        </div>
    );
};

export default Dashboard;