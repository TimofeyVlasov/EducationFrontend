import { UnknownAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../../types/models';
import {
    getCourses,
    addCourse,
    editCourse,
    deleteCourse,
    addStudent,
    editStudent,
    deleteStudent,
    addEnrollment,
    deleteEnrollment,
    addStudentProgress,
    deleteStudentProgress,
    uploadFile,
    deleteFile,
} from '../../services';

const NAME = 'courses';

interface CoursesState {
    courses: Array<Course>;
    loading: boolean;
    coursesError?: string | null;
}

const initialState: CoursesState = {
    courses: [],
    loading: false,
    coursesError: undefined
}

const isLoading = (action: UnknownAction) => action.type.endsWith('pending');

const isError = (action: UnknownAction) => action.type.endsWith('rejected');

const setState = (state: CoursesState, action: PayloadAction<Array<Course>>) => {
    state.courses = action.payload;
    state.coursesError = undefined;
    state.loading = false;
}

const coursesSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editCourse.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addEnrollment.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteEnrollment.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addStudentProgress.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteStudentProgress.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.coursesError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.coursesError = action.payload;
            })
    }
});

export const coursesReducer = coursesSlice.reducer;

\n