import React from 'react';
import { useParams } from 'react-router-dom';
import { useStudents } from '../../hooks/useStudents';

const StudentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { students } = useStudents();
    const student = students.find(student => student.id === id);

    if (!student) {
        return <div>Student not found</div>;
    }

    return (
        <div>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
        </div>
    );
};

export default StudentDetail;