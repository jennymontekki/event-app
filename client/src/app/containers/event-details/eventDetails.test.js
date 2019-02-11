import thunk from 'redux-thunk';
import moxios from 'moxios';
import localStorage from 'mock-local-storage';
import configureMockStore from 'redux-mock-store';
import eventDetailsReducer from './eventDetailsReducer';
import * as eventDetailsConstants from './eventDetailsConstants';
import * as eventDetailsActions from './eventDetailsActions';
import eventDetailsToastsFactory from './eventDetailsToastsFactory';

global.window = {};
if (!window.localStorage) {
  window.localStorage = global.localStorage;
}

const newMessageObj = {
  roomId: 1,
  message: 'new message 1',
  updatedAt: '2018-05-29T12:06:54.691Z',
  user: { name: 'user1' }
};

const eventDetailsObj = {
  id: 1,
  title: 'test event 1',
  address: 'Paryz\'koi Komuny St, Kherson, Khersons\'ka oblast, Ukraine, 73000',
  location: {
    lat: 46.6376803,
    lng: 32.6181838
  },
  description: '',
  user: { name: 'user1' },
  category: {
    id: 8,
    key: 'category-physics',
    name: 'Physics'
  },
  date: '2018-05-29T08:54:00.000Z',
  visitors: [
    {
      updatedAt: '2018-05-29T13:27:55.301Z',
      user: { name: 'user3' }
    },
    {
      updatedAt: '2018-06-01T10:30:34.063Z',
      user: { name: 'user2' }
    }
  ]
};

const eventMessagesArr = [
  {
    roomId: 2,
    message: 'new message 2',
    updatedAt: '2018-05-29T12:06:54.691Z',
    user: { name: 'user2' }
  },
  {
    roomId: 3,
    message: 'new message 3',
    updatedAt: '2018-05-29T12:06:54.691Z',
    user: { name: 'user3' }
  }
];

describe('testing eventDetails actions', () => {
  it('action changes loading from false to true', () => {
    expect(eventDetailsActions.startLoading()).toMatchSnapshot();
  });

  it('action adds new message from chat', () => {
    expect(eventDetailsActions.eventNewMessage(newMessageObj)).toMatchSnapshot();
  });

  it('action notifies user that authentication is required', () => {
    expect(eventDetailsActions.notAuthenticated()).toMatchSnapshot();
  });
});

describe('testing eventDetails reducer', () => {
  it('reducer clears eventDetails and changes loading from false to true', () => {
    const state = eventDetailsReducer({ eventDetails: eventDetailsObj, loading: false },
      {
        type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING,
        payload: null
      }
    );

    expect(state.eventDetails).toBe(null);
    expect(state.loading).toBe(true);
  });

  it('reducer adds new message to chat', () => {
    const state = eventDetailsReducer({ eventMessages: [] },
      {
        type: eventDetailsConstants.ACTION_EVENT_NEW_MESSAGE,
        payload: newMessageObj
      }
    );

    expect(state.eventMessages).toEqual([newMessageObj]);
  });

  it('reducer adds eventDetails after successful fetching', () => {
    const state = eventDetailsReducer({ eventDetails: null, loading: true },
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_SUCCESS,
        payload: eventDetailsObj
      }
    );

    expect(state.eventDetails).toEqual(eventDetailsObj);
    expect(state.loading).toBe(false);
  });

  it('reducer adds eventDetails after unsuccessful fetching', () => {
    const state = eventDetailsReducer({ eventDetails: null, loading: true },
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_ERROR,
        payload: null
      }
    );

    expect(state.eventDetails).toBe(null);
    expect(state.loading).toBe(false);
  });

  it('reducer adds eventMessages after successful fetching', () => {
    const state = eventDetailsReducer(undefined,
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_SUCCESS,
        payload: eventMessagesArr
      }
    );

    expect(state.eventMessages).toEqual(eventMessagesArr);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions eventDetails', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates ACTION_EVENT_DETAILS_START_LOADING and ACTION_FETCH_EVENT_DETAILS_SUCCESS when fetching eventDetails has been done', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: eventDetailsObj,
      });
    });

    const expectedActions = [
      { type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING, payload: null },
      { type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_SUCCESS, payload: eventDetailsObj }
    ];

    const store = mockStore({ eventDetailsStore: { eventDetails: null } });

    return store.dispatch(eventDetailsActions.fetchEventDetails(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_EVENT_DETAILS_START_LOADING and ACTION_FETCH_EVENT_DETAILS_ERROR when fetching eventDetails has been failed', () => {
    const errorMsg = 'Error: Request failed with status code 404';
    const statusCode = 404;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: statusCode,
        response: { data: errorMsg },
      });
    });

    const expectedActions = [
      { type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING, payload: null },
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_DETAILS_ERROR,
        payload: { response: { data: errorMsg }, status: statusCode },
        error: true,
        meta: {
          notify: eventDetailsToastsFactory.fetchEventDetailsError({ response: { data: errorMsg }, status: statusCode })
        }
      }
    ];

    const store = mockStore({ eventDetailsStore: { eventDetails: null } });

    return store.dispatch(eventDetailsActions.fetchEventDetails(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_SUBSCRIPTION_SUCCESS when doing post request to subscribe to event', () => {
    const method = 'subscribe';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_SUBSCRIPTION_SUCCESS,
        payload: null,
        meta: {
          notify: eventDetailsToastsFactory.subscriptionSuccess(method)
        }
      },
      { type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING, payload: null }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.subscription(method, { eventId: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_SUBSCRIPTION_SUCCESS when doing delete request to unsubscribe from event', () => {
    const method = 'unsubscribe';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_SUBSCRIPTION_SUCCESS,
        payload: null,
        meta: {
          notify: eventDetailsToastsFactory.subscriptionSuccess(method)
        }
      },
      { type: eventDetailsConstants.ACTION_EVENT_DETAILS_START_LOADING, payload: null }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.subscription(method, { eventId: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_SUBSCRIPTION_ERROR when doing post request to subscribe to event', () => {
    const method = 'subscribe';
    const statusCode = 500;
    const errorMsg = 'server is broken';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: statusCode,
        response: { data: errorMsg },
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_SUBSCRIPTION_ERROR,
        payload: { response: { data: errorMsg }, status: statusCode },
        error: true,
        meta: {
          notify: eventDetailsToastsFactory.subscriptionError({ response: { data: errorMsg }, status: statusCode })
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.subscription(method, { eventId: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_SUBSCRIPTION_ERROR when doing delete request to unsubscribe from event', () => {
    const method = 'unsubscribe';
    const statusCode = 500;
    const errorMsg = 'server is broken';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: statusCode,
        response: { data: errorMsg },
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_SUBSCRIPTION_ERROR,
        payload: { response: { data: errorMsg }, status: statusCode },
        error: true,
        meta: {
          notify: eventDetailsToastsFactory.subscriptionError({ response: { data: errorMsg }, status: statusCode })
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.subscription(method, { eventId: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_DELETE_EVENT_SUCCESS when doing delete request to delete event', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_DELETE_EVENT_SUCCESS,
        payload: null,
        meta: {
          notify: eventDetailsToastsFactory.deleteEventSuccess(),
          redirect: null
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.deleteEvent(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_DELETE_EVENT_ERROR when doing delete request to delete event', () => {
    const statusCode = 401;
    const errorMsg = 'server is broken';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: statusCode,
        response: { data: errorMsg },
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_DELETE_EVENT_ERROR,
        payload: { response: { data: errorMsg }, status: statusCode },
        error: true,
        meta: {
          notify: eventDetailsToastsFactory.deleteEventError({ response: { data: errorMsg }, status: statusCode })
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.deleteEvent(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_FETCH_EVENT_MESSAGES_SUCCESS when fetching event messages', () => {
    const messages = [
      {
        message: 'new message 1',
        updatedAt: '2018-05-29T12:06:54.691Z',
        user: { name: 'user1' },
        roomId: 1
      },
      {
        message: 'new message 2',
        updatedAt: '2018-05-30T12:06:54.691Z',
        user: { name: 'user2' },
        roomId: 1
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: messages,
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_SUCCESS,
        payload: messages
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.fetchEventMessages(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ACTION_FETCH_EVENT_MESSAGES_ERROR when fetching event messages with fail', () => {
    const statusCode = 401;
    const errorMsg = 'server is broken';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: statusCode,
        response: { data: errorMsg },
      });
    });

    const expectedActions = [
      {
        type: eventDetailsConstants.ACTION_FETCH_EVENT_MESSAGES_ERROR,
        payload: { response: { data: errorMsg }, status: statusCode },
        error: true,
        meta: {
          notify: eventDetailsToastsFactory.fetchEventMessagesError({ response: { data: errorMsg }, status: statusCode })
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(eventDetailsActions.fetchEventMessages(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
