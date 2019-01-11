import axios from 'axios';
import { replace } from 'react-router-redux';
import { errorRoute } from './../shared/config';
import WebStorageService from './webStorageService';

class InterceptorsService {
  static setupResponseInterceptors = () => {
    axios.interceptors.response.use(response => {
      const notification = response.headers['event-changes-notification'];

      if (notification)
        WebStorageService.setEventsChanges(notification);

      return response;
    }, err => {
      const statusCodesToRedirect = [404];

      if (!err.response)
        return Promise.reject('Server is broken');

      const errorCode = statusCodesToRedirect.find(status => status === err.response.status);
      if (typeof errorCode !== 'undefined')
        window.store.dispatch(replace(`${errorRoute.url}/${errorCode}`));

      return Promise.reject(err.response.data.message);
    });
  }
}

export default InterceptorsService;
