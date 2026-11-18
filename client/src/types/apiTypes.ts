import { Enrollment, StudentProgress, UserFile } from './models';

export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    username: string;
    role: string;
}

export interface RegistrationRequestDto {
    login: string;
    password: string;
}

export interface AddCourseRequestDto {
    name: string;
    description?: string;
}

export interface EditCourseRequestDto {
    id: number;
    name: string;
    description?: string;
}

export interface SetRoleRequestDto {
    userId: number;
    roleName: 'admin' | 'manager' | 'user';
}

export interface AddStudentRequestDto {
    courseId: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
}

export interface UpdateStudentRequestDto {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    enrollment: Array<Enrollment>;
    studentProgress: Array<StudentProgress>;
    userFiles: Array<UserFile>;
}

export interface AddEnrollmentRequestDto {
    studentId: number;
    moduleName: string;
    description?: string;
    status: string;
    grade: string;
}

export interface AddStudentProgressRequestDto {
    studentId: number;
    completedModules: number;
    description?: string;
}

export interface UploadFileRequestDto {
    studentId: number;
    fileString: string;
    fileName: string;
}

export interface DownloadFileRequestDto {
    systemName: string;
    displayName: string;
}
