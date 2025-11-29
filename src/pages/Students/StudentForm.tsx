import React, { useState } from 'react';
import { useStudents } from '../../hooks/useStudents';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';

const StudentForm = ({ student }) => {
    const { addStudent, updateStudent } = useStudents();
    const [formData, setFormData] = useState({
        name: student ? student.name : '',
        age: student ? student.age : '',
        grade: student ? student.grade : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (student) {
            updateStudent(student.id, formData);
        } else {
            addStudent(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Student Name"
                required
            />
            <Input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Student Age"
                required
            />
            <Select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                options={['1st', '2nd', '3rd', '4th', '5th']}
                required
            />
            <button type="submit">{student ? 'Update' : 'Add'} Student</button>
        </form>
    );
};

export default StudentForm;