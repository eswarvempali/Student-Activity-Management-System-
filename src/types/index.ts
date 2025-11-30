export interface Student {
    id: number;
    name: string;
    age: number;
    email: string;
    enrolled: boolean;
    course?: string;
    grade?: string;
    registrations?: number[];
}

export interface StudentFormValues {
    name: string;
    age: number;
    email: string;
    grade?: string;
}

export interface StudentContextType {
    students: Student[];
    addStudent: (student: StudentFormValues) => void;
    updateStudent: (id: number, student: StudentFormValues) => void;
    deleteStudent: (id: number) => void;
}