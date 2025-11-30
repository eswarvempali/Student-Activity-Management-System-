import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../../context/StudentContext';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const StudentList = () => {
    const { students } = useStudentContext();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.max(1, Math.ceil(students.length / 10));
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Age', accessor: 'age' },
        { header: 'Email', accessor: 'email' }
    ];

    const handleSearch = (query: string) => {
        // No-op search for now; kept to satisfy prop types
        console.debug('Search query:', query);
    };

    return (
        <div>
            <h1>Student List</h1>
            <SearchBar onSearch={handleSearch} />
            <Table data={students} columns={columns} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Link to="/students/new">Add New Student</Link>
        </div>
    );
};

export default StudentList;