import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const StudentList = () => {
    const { students, fetchStudents } = useContext(StudentContext);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return (
        <div>
            <h1>Student List</h1>
            <SearchBar />
            <Table data={students} />
            <Pagination />
            <Link to="/students/new">Add New Student</Link>
        </div>
    );
};

export default StudentList;