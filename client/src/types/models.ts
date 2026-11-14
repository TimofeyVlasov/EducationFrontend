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

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    enrollments: Array<Enrollment>;
    progress: Array<StudentProgress>;
}

export interface Course {
    id: number;
    name: string;
    description?: string;
    students: Array<Student>;
}
