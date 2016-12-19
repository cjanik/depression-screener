import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import { reducer as screener } from '../reducers/screener.js';

const preloadedState = window.__PRELOADED_STATE__;
const enhancers = window.devToolsExtension && window.devToolsExtension();
const store = createStore(screener, preloadedState, enhancers);

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      </Provider>
    );
  }
}
