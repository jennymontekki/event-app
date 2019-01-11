import axios from 'axios';
import { serverUrl, eventsPerPage, messagesPerPage } from './config';
import WebStorageService from './webStorageService';

const requestHeaders = () => {
  return { AUTHORIZATION: WebStorageService.getJwt() };
};

export class AuthApi {
  static signIn(userCreds) {
    return axios({
      method: 'post',
      url: `${serverUrl}/auth/sign-in`,
      data: userCreds
    });
  }

  static signUp(userCreds) {
    return axios({
      method: 'post',
      url: `${serverUrl}/auth/sign-up`,
      data: userCreds
    });
  }

  static signOut() {
    const headers = requestHeaders();
    return axios({
      method: 'delete',
      url: `${serverUrl}/auth/sign-out`,
      headers
    });
  }
}

export class CategoriesApi {
  static fetchAllCategories() {
    return axios({
      method: 'get',
      url: `${serverUrl}/categories`
    });
  }
}

export class EventsApi {
  static fetchAllEvents({ data }) {
    return axios({
      method: 'get',
      url: `${serverUrl}/events/page/${data.pageNum}?limit=${eventsPerPage}`
    });
  }

  static fetchEventsByUserId({ data }) {
    const headers = requestHeaders();
    return axios({
      method: 'get',
      url: `${serverUrl}/events/my-events/page/${data.pageNum}?limit=${eventsPerPage}`,
      headers
    });
  }

  static fetchSubscribedEvents({ data }) {
    const headers = requestHeaders();
    return axios({
      method: 'get',
      url: `${serverUrl}/events/subscribed/page/${data.pageNum}?limit=${eventsPerPage}`,
      headers
    });
  }

  static fetchEventsByCategoryId({ data }) {
    return axios({
      method: 'get',
      url: `${serverUrl}/categories/${data.categoryId}/events/page/${data.pageNum}?limit=${eventsPerPage}`
    });
  }

  static fetchFilteredEvents(searchValue) {
    return axios({
      method: 'get',
      url: `${serverUrl}/events/search?q=${searchValue}&limit=10`
    });
  }
}

export class EventDetailsApi {
  static fetchEventDetails(id) {
    return axios({
      method: 'get',
      url: `${serverUrl}/event/${id}/details`
    });
  }

  static fetchEventMessages(id) {
    return axios({
      method: 'get',
      url: `${serverUrl}/event/${id}/messages`
    });
  }

  static subscribe(eventId) {
    const headers = requestHeaders();
    return axios({
      method: 'post',
      url: `${serverUrl}/users/${eventId}/subscribe`,
      headers
    });
  }

  static unsubscribe(eventId) {
    const headers = requestHeaders();
    return axios({
      method: 'delete',
      url: `${serverUrl}/users/${eventId}/unsubscribe`,
      headers
    });
  }

  static deleteEvent(id) {
    const headers = requestHeaders();
    return axios({
      method: 'delete',
      url: `${serverUrl}/event/${id}/destroy`,
      headers
    });
  }
}

export class AddEditEventApi {
  static addEvent({ payload }) {
    const headers = requestHeaders();
    return axios({
      method: 'post',
      url: `${serverUrl}/event/add`,
      data: payload,
      headers
    });
  }

  static editEvent({ payload, eventId }) {
    const headers = requestHeaders();
    return axios({
      method: 'put',
      url: `${serverUrl}/event/${eventId}/edit`,
      data: payload,
      headers
    });
  }

  static fetchEventToEdit(id) {
    return axios({
      method: 'get',
      url: `${serverUrl}/event/${id}/details`
    });
  }
}

export class ProfileApi {
  static fetchMessages(pageNum) {
    const headers = requestHeaders();
    return axios({
      method: 'get',
      url: `${serverUrl}/users/profile/messages/page/${pageNum}?limit=${messagesPerPage}`,
      headers
    });
  }

  static deleteMessage(messageId) {
    const headers = requestHeaders();
    return axios({
      method: 'get',
      url: `${serverUrl}/users/profile/notifications/${messageId}/destroy`,
      headers
    });
  }

  static deleteMyEvent(id) {
    const headers = requestHeaders();
    return axios({
      method: 'delete',
      url: `${serverUrl}/event/${id}/destroy`,
      headers
    });
  }

  static unsubscribeFromEvent(eventId) {
    const headers = requestHeaders();
    return axios({
      method: 'delete',
      url: `${serverUrl}/users/${eventId}/unsubscribe`,
      headers
    });
  }
}

export class NavigationApi {
  static confirmNotification() {
    const headers = requestHeaders();
    return axios({
      method: 'patch',
      url: `${serverUrl}/users/notification/confirm`,
      headers
    });
  }
}
