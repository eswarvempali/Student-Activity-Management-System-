import React from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Dashboard: React.FC = () => {
    const { students, loading, error } = useStudents();
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading students.</div>;

    const totalPages = Math.max(1, Math.ceil(students.length / 10));
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Age', accessor: 'age' },
        { header: 'Email', accessor: 'email' }
    ];

    const handleSearch = (query: string) => {
        console.debug('Dashboard search:', query);
    };

    return (
        <div>
            <h1>Student Details Management</h1>
            <SearchBar onSearch={handleSearch} />
            <Table data={students} columns={columns} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Link to="/students/new">Add New Student</Link>
        </div>
    );
};

export default Dashboard;