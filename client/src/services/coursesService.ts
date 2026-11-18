import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    AddCourseRequestDto,
    EditCourseRequestDto,
    AddStudentRequestDto,
    UpdateStudentRequestDto,
    AddEnrollmentRequestDto,
    AddStudentProgressRequestDto,
    UploadFileRequestDto
} from '../types/apiTypes';
import { AsyncThunkOptions } from '../types/toolkitTypes';
import { Courses, StudentApi, FilesApi } from '../api';
import { Course } from '../types/models';

const NAMESPACE = 'courses';

export const getCourses = createAsyncThunk<Array<Course>, undefined, AsyncThunkOptions>(
    `${NAMESPACE}/getCourses`,
    async (_, { rejectWithValue }) => {
        try {
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addCourse = createAsyncThunk<Array<Course>, AddCourseRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/addCourse`,
    async (addCourseData, { rejectWithValue }) => {
        try {
            await Courses.addCourse(addCourseData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editCourse = createAsyncThunk<Array<Course>, EditCourseRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/editCourse`,
    async (editCourseData, { rejectWithValue }) => {
        try {
            await Courses.editCourse(editCourseData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteCourse = createAsyncThunk<Array<Course>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteCourse`,
    async (id, { rejectWithValue }) => {
        try {
            await Courses.deleteCourse(id);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addStudent = createAsyncThunk<Array<Course>, AddStudentRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/addStudent`,
    async (addStudentData, { rejectWithValue }) => {
        try {
            await StudentApi.addStudent(addStudentData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editStudent = createAsyncThunk<Array<Course>, UpdateStudentRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/editStudent`,
    async (editStudentData, { rejectWithValue }) => {
        try {
            await StudentApi.editStudent(editStudentData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteStudent = createAsyncThunk<Array<Course>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteStudent`,
    async (id, { rejectWithValue }) => {
        try {
            await StudentApi.deleteStudent(id);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addEnrollment = createAsyncThunk<Array<Course>, AddEnrollmentRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/addEnrollment`,
    async (enrollmentData, { rejectWithValue }) => {
        try {
            await StudentApi.addEnrollment(enrollmentData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteEnrollment = createAsyncThunk<Array<Course>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteEnrollment`,
    async (id, { rejectWithValue }) => {
        try {
            await StudentApi.deleteEnrollment(id);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addStudentProgress = createAsyncThunk<Array<Course>, AddStudentProgressRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/addStudentProgress`,
    async (progressData, { rejectWithValue }) => {
        try {
            await StudentApi.addStudentProgress(progressData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteStudentProgress = createAsyncThunk<Array<Course>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteStudentProgress`,
    async (id, { rejectWithValue }) => {
        try {
            await StudentApi.deleteStudentProgress(id);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const uploadFile = createAsyncThunk<Array<Course>, UploadFileRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/uploadFile`,
    async (uploadFileData, { rejectWithValue }) => {
        try {
            await FilesApi.uploadFile(uploadFileData);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteFile = createAsyncThunk<Array<Course>, string, AsyncThunkOptions>(
    `${NAMESPACE}/deleteFile`,
    async (systemName, { rejectWithValue }) => {
        try {
            await FilesApi.deleteFile(systemName);
            return await Courses.getCourses();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

\n