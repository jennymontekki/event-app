import WebStorageService from './../shared/webStorageService';
import { changeNotificationStatus } from './../containers/auth/authActions';

const notificationChecker = ({ dispatch }) => next => action => {
  const notificationStatus = WebStorageService.getEventsChanges();

  if (notificationStatus) {
    WebStorageService.setEventsChanges(null);
    dispatch(changeNotificationStatus(notificationStatus));
  }

  return next(action);
};

export default notificationChecker;
