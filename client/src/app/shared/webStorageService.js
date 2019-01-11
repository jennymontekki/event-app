class WebStorageService {
  static isSignedIn() {
    return !!sessionStorage.jwt;
  }

  static getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  static getJwt() {
    return sessionStorage.getItem('jwt');
  }

  static saveAuthenticationData({ user, token }) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('jwt', token);
  }

  static deleteAuthenticationData() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwt');
  }

  static getEventsChanges() {
    return !!sessionStorage.getItem('event-changes-notification');
  }

  static setEventsChanges(notification) {
    notification === null ? sessionStorage.removeItem('event-changes-notification') : sessionStorage.setItem('event-changes-notification', notification);
  }
}

export default WebStorageService;
