import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import notifier from './app/middleware/notifier';
import notificationChecker from './app/middleware/notificationChecker';
import redirector from './app/middleware/redirector';
import logger from 'redux-logger';

import MainComponent from './app/main-component/MainComponent';
import rootReducer from './app/rootReducer';
import InterceptorsService from './app/shared/interceprorsService';
import WebStorageService from './app/shared/webStorageService';
import { initSocketService } from './app/shared/socketService';

import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import './../node_modules/react-datepicker/dist/react-datepicker.css';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
// export const store = createStore(rootReducer, applyMiddleware(notifier, notificationChecker, redirector, thunk, routerMiddleware(history)));
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(notifier, notificationChecker, redirector, logger, thunk, routerMiddleware(history)));
window.store = store;

InterceptorsService.setupResponseInterceptors();
if (WebStorageService.getUser()) initSocketService();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={MainComponent} />
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
