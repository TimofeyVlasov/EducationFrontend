import { AccessTokenKey } from '../constants/commonConstants';
import {
    AddEnrollmentRequestDto,
    AddStudentProgressRequestDto,
    AddStudentRequestDto,
    UpdateStudentRequestDto
} from '../types/apiTypes';
import { AxiosInstance } from './axiosInstance';

const addStudent = async (addStudentData: AddStudentRequestDto) => {
    const { axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPost('/Students/students', addStudentData) as number;
}

const editStudent = async (editStudentData: UpdateStudentRequestDto) => {
    const { axiosPut } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPut('/Students/students', editStudentData) as void;
}

const deleteStudent = async (id: string | number) => {
    const { axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosDelete(`/Students/student?id=${encodeURIComponent(id)}`) as void;
}

const addStudentProgress = async (progressData: AddStudentProgressRequestDto) => {
    const { axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPost('/Students/studentprogress', progressData) as number;
}

const deleteStudentProgress = async (id: string | number) => {
    const { axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosDelete(`/Students/studentprogress?id=${encodeURIComponent(id)}`) as void;
}

const addEnrollment = async (enrollmentData: AddEnrollmentRequestDto) => {
    const { axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPost('/Students/enrollment', enrollmentData) as number;
}

const deleteEnrollment = async (id: string | number) => {
    const { axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosDelete(`/Students/enrollment?id=${encodeURIComponent(id)}`) as void;
}

export const StudentApi = {
    addStudent,
    editStudent,
    deleteStudent,
    addStudentProgress,
    deleteStudentProgress,
    addEnrollment,
    deleteEnrollment
}
