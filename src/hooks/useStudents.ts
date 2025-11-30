import { useEffect, useState } from 'react';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../services/api';
import { Student } from '../types';

const useStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await fetchStudents();
                // If API returns no data, fall back to sample students
                if (!data || (Array.isArray(data) && data.length === 0)) {
                    setStudents([
                        { id: 1, name: 'Alice Johnson', age: 20, email: 'alice.johnson@example.com', enrolled: true },
                        { id: 2, name: 'Bob Smith', age: 22, email: 'bob.smith@example.com', enrolled: false },
                        { id: 3, name: 'Catherine Lee', age: 19, email: 'catherine.lee@example.com', enrolled: true }
                    ]);
                } else {
                    setStudents(data);
                }
            } catch (err) {
                // If fetching fails, provide demo students so profile pages can display data
                setStudents([
                    { id: 1, name: 'Alice Johnson', age: 20, email: 'alice.johnson@example.com', enrolled: true },
                    { id: 2, name: 'Bob Smith', age: 22, email: 'bob.smith@example.com', enrolled: false },
                    { id: 3, name: 'Catherine Lee', age: 19, email: 'catherine.lee@example.com', enrolled: true }
                ]);
                setError('Failed to fetch students; showing demo data');
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
    }, []);

    const createStudent = async (student: Student) => {
        try {
            const newStudent = await addStudent(student);
            setStudents((prev) => [...prev, newStudent]);
        } catch (err) {
            setError('Failed to add student');
        }
    };

    const editStudent = async (student: Student) => {
        try {
            const updatedStudent = await updateStudent(student);
            setStudents((prev) =>
                prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
            );
        } catch (err) {
            setError('Failed to update student');
        }
    };

    const removeStudent = async (id: number) => {
        try {
            await deleteStudent(id);
            setStudents((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            setError('Failed to delete student');
        }
    };

    return { students, loading, error, createStudent, editStudent, removeStudent };
};

export default useStudents;