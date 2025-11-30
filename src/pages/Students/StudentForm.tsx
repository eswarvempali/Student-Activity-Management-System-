import React, { useState } from 'react';
import { useStudents } from '../../hooks/useStudents';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import { Student } from '../../types';

const StudentForm: React.FC<{ student?: Student | null }> = ({ student }) => {
    const { addStudent, updateStudent } = useStudents();
    const [formData, setFormData] = useState<{ name: string; age: number | string; grade?: string }>({
        name: student ? student.name : '',
        age: student ? student.age : '',
        grade: student ? student.grade : ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGradeChange = (value: string) => {
        setFormData({ ...formData, grade: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (student) {
            updateStudent(student.id, formData as any);
        } else {
            addStudent(formData as any);
        }
    };

    const gradeOptions = [
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        { value: '4th', label: '4th' },
        { value: '5th', label: '5th' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="name"
                value={String(formData.name)}
                onChange={handleInputChange}
                placeholder="Student Name"
                required
            />
            <Input
                name="age"
                type="number"
                value={String(formData.age)}
                onChange={handleInputChange}
                placeholder="Student Age"
                required
            />
            <Select
                value={formData.grade || ''}
                onChange={handleGradeChange}
                options={gradeOptions}
                placeholder="Select grade"
            />
            <button type="submit">{student ? 'Update' : 'Add'} Student</button>
        </form>
    );
};

export default StudentForm;