import { configureStore } from "@reduxjs/toolkit";
import { administrationReducer, coursesReducer, userReducer } from "./slices";

export const store = configureStore({
    reducer: {
        administration: administrationReducer,
        courses: coursesReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
