import { AxiosInstance } from '../../config';
import { ILoad, IUpdateLoad} from './interfaces';

export const createLoadAPI = async (loadInfo: ILoad) => {
    const response = await AxiosInstance.post('/load', loadInfo);

    if(response.status === 201) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const getLoadsAPI = async () => {
    const response = await AxiosInstance.get('/load');
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const updateLoadAPI = async (loadDetails: IUpdateLoad, id: string) => {
    const response = await AxiosInstance.patch(`/load/${id}`, loadDetails);
    if(response.status === 200) {
        return response.data;
} else {
        return {error:  'Error', response}
    }
}

export const deleteLoadAPI = async (id: string) => {
    const response = await AxiosInstance.delete(`/load/${id}`);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const getLoadByDriverId = async (driverId: string, params: {min: Date, max: Date}) => {
    const response = await AxiosInstance.get(`/load/getByDriver?driverId=${driverId}&min=${params.min}&max=${params.max}`);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}