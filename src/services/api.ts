import axios from 'axios';
import { Student } from '../types';

const API_URL = 'https://api.example.com/students';

export const fetchStudents = async (): Promise<Student[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchStudentById = async (id: number): Promise<Student> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addStudent = async (studentData: Partial<Student>): Promise<Student> => {
    const response = await axios.post(API_URL, studentData);
    return response.data;
};

export const updateStudent = async (id: number, studentData: Partial<Student>): Promise<Student> => {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};