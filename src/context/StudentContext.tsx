import React, { createContext, useContext, useState } from 'react';

interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
}

interface StudentContextType {
    students: Student[];
    addStudent: (student: Student) => void;
    updateStudent: (student: Student) => void;
    deleteStudent: (id: number) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Student[]>([]);

    const addStudent = (student: Student) => {
        setStudents((prevStudents) => [...prevStudents, student]);
    };

    const updateStudent = (updatedStudent: Student) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
        );
    };

    const deleteStudent = (id: number) => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    };

    return (
        <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (context === undefined) {
        throw new Error('useStudentContext must be used within a StudentProvider');
    }
    return context;
};