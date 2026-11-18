import { AccessTokenKey } from '../constants/commonConstants';
import { DownloadFileRequestDto, UploadFileRequestDto } from '../types/apiTypes';
import { AxiosInstance } from './axiosInstance';

const uploadFile = async (uploadFileData: UploadFileRequestDto) => {
    const { axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosPost('/files/upload', uploadFileData) as void;
}

const downloadFile = async (downloadFileData: DownloadFileRequestDto) => {
    const { axiosBlob } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosBlob('/files/download', downloadFileData);
}

const deleteFile = async (systemName: string) => {
    const { axiosDelete } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
    return await axiosDelete(`/files/delete?systemName=${encodeURIComponent(systemName)}`) as void;
}

export const FilesApi = {
    uploadFile,
    downloadFile,
    deleteFile
}
