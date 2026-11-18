import { AccessTokenKey } from '../constants/commonConstants';
import { AddCourseRequestDto, EditCourseRequestDto } from '../types/apiTypes';
import { Course } from '../types/models';
import { AxiosInstance } from './axiosInstance';

const getCourses = async () => {
    const { axiosGet } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosGet('/Courses') as Array<Course>;
}

const addCourse = async (addCourseData: AddCourseRequestDto) => {
    const { axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPost('/Courses/course', addCourseData) as number;
}

const editCourse = async (editCourseData: EditCourseRequestDto) => {
    const { axiosPut } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPut('/Courses/course', editCourseData) as void;
}

const deleteCourse = async (id: string | number) => {
    const { axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosDelete(`/Courses/course?id=${id}`) as void;
}

export const Courses = {
    addCourse,
    editCourse,
    deleteCourse,
    getCourses
}
