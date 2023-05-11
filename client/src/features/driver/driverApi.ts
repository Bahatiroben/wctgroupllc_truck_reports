import { AxiosInstance } from '../../config';
import { IDriver, IUpdateDriver} from './interfaces';

export const createDriverAPI = async (driverInfo: IDriver) => {
    const response = await AxiosInstance.post('/driver', driverInfo);

    if(response.status === 201) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const getDriversAPI = async () => {
    const response = await AxiosInstance.get('/driver');
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const updateDriverAPI = async (driverDetails: IUpdateDriver, id: string) => {
    const response = await AxiosInstance.patch(`/driver/${id}`, driverDetails);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const deleteDriverAPI = async (id: string) => {
    const response = await AxiosInstance.delete(`/driver/${id}`);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}