export interface Student {
    id: number;
    name: string;
    age: number;
    email: string;
    enrolled: boolean;
}

export interface StudentFormValues {
    name: string;
    age: number;
    email: string;
}

export interface StudentContextType {
    students: Student[];
    addStudent: (student: StudentFormValues) => void;
    updateStudent: (id: number, student: StudentFormValues) => void;
    deleteStudent: (id: number) => void;
}