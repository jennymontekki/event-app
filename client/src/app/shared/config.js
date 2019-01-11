export const serverUrl = 'http://localhost:3003';

export const googleMapsApiKey = 'AIzaSyBe_RcVW02pcND7g_uGm8osLNSLLFmK4iI';

export const eventsPerPage = 6;

export const messagesPerPage = 10;

export const profileRoute = {
  path: '/profile',
  url: '/profile'
};

export const eventsRoute = {
  path: '/events/page/:pageNum',
  url: '/events/page'
};

export const eventsCategoryIdRoute = {
  path: '/categories/:categoryId/events/page/:pageNum',
  url: '/categories/:categoryId/events/page'
};

export const myEventsRoute = {
  path: '/profile/events/my-events/page/:pageNum',
  url: '/profile/events/my-events/page'
};

export const subscribedEventsRoute = {
  path: '/profile/events/subscribed/page/:pageNum',
  url: '/profile/events/subscribed/page'
};

export const profileMessagesRoute = {
  path: '/profile/messages/page/:pageNum',
  url: '/profile/messages/page'
};

export const eventDetailsRoute = {
  path: '/event/details/:eventId',
  url: '/event/details'
};

export const addEventRoute = {
  path: '/event/add',
  url: '/event/add'
};

export const editEventRoute = {
  path: '/event/edit/:eventId',
  url: '/event/edit'
};

export const authRoute = {
  path: '/auth',
  url: '/auth'
};

export const errorRoute = {
  path: '/error/:errorCode',
  url: '/error'
};

export const headerNavigationRoutes = {
  alwaysRendered: {
    eventsRoute: {
      name: 'Events',
      ...eventsRoute,
      urlForActiveLink: eventsRoute.url
    },
    addEventRoute: {
      name: 'Add event',
      ...addEventRoute,
      urlForActiveLink: addEventRoute.url
    }
  },
  conditionallyRendered: {
    authRoute: {
      name: 'Log in',
      ...authRoute,
      urlForActiveLink: authRoute.url
    },
    profileRoute: {
      name: 'Profile',
      ...profileMessagesRoute,
      urlForActiveLink: profileRoute.url
    }
  }
};

export const profileNavigationRoutes = {
  profileMessagesRoute: {
    name: 'Messages',
    ...profileMessagesRoute,
    urlForActiveLink: profileMessagesRoute.url
  },
  myEventsRoute: {
    name: 'My events',
    ...myEventsRoute,
    urlForActiveLink: myEventsRoute.url
  },
  subscribedEventsRoute: {
    name: 'Subscribed events',
    ...subscribedEventsRoute,
    urlForActiveLink: subscribedEventsRoute.url
  }
};
