import { AccessTokenKey } from '../constants/commonConstants';
import { SetRoleRequestDto } from '../types/apiTypes';
import { User } from '../types/models';
import { AxiosInstance } from './axiosInstance';

const getUsers = async () => {
    const { axiosGet } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosGet('/Administration/getusers') as Array<Pick<User, 'id' | 'login' | 'role'>>;
}

const setUserRole = async (setRoleData: SetRoleRequestDto) => {
    const { axiosPatch } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPatch('/Administration/setrole', setRoleData) as void;
}

export const AdministrationApi = {
    getUsers,
    setUserRole
}
