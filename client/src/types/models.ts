export interface Enrollment {
    id: number;
    moduleName: string;
    status: string;
    grade: string;
    description?: string;
}

export interface StudentProgress {
    id: number;
    completedModules: number;
    description?: string;
}

export interface UserFile {
    id: number;
    systemName: string;
    displayName: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    enrollment: Array<Enrollment>;
    studentProgress: Array<StudentProgress>;
    userFiles: Array<UserFile>;
}

export interface Course {
    id: number;
    name: string;
    description?: string;
    students: Array<Student>;
}
