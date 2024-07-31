import {appInfo} from '../constants/appInfors';
import axiosClient from './axiosClient';

class TaskAPI {
  HandleTask = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete' | 'update',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/task${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const taskAPI = new TaskAPI();
export default taskAPI;
