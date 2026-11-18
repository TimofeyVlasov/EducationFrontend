import { createAsyncThunk } from '@reduxjs/toolkit';
import { SetRoleRequestDto } from '../types/apiTypes';
import { AsyncThunkOptions } from '../types/toolkitTypes';
import { AdministrationApi } from '../api';
import { User } from '../types/models';

const NAMESPACE = 'administration';

export const getUsers = createAsyncThunk<Array<Pick<User, 'id' | 'login' | 'role'>>, undefined, AsyncThunkOptions>(
    `${NAMESPACE}/getUsers`,
    async (_, { rejectWithValue }) => {
        try {
            return await AdministrationApi.getUsers();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const setUserRole = createAsyncThunk<Array<Pick<User, 'id' | 'login' | 'role'>>, SetRoleRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/setUserRole`,
    async (setRoleData, { rejectWithValue }) => {
        try {
            await AdministrationApi.setUserRole(setRoleData);
            return await AdministrationApi.getUsers();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
