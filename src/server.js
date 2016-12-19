import express from 'express';
const app = express();

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { reducer as screener } from './reducers/screener';
import NotFound from './components/NotFound';
import path from 'path';

const isDev = process.env.NODE_ENV === "dev";
let bundlePort = 3000;

if (isDev) {
  bundlePort = 3001;
}
const handleRender = (req, res) => {
  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {

      if (error) {
        return res.status(500).send(error.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // Create a new Redux store instance
      const store = createStore(screener);

      let html;
      if (renderProps) {
        // if the current route matched we have renderProps
        html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );
      } else {
        // otherwise we can render a 404 page
        html = renderToString(
          <Provider store={store}>
            <NotFound/>
          </Provider>
        );
        res.status(404);
      }

      // Grab the initial state from our Redux store
      const preloadedState = store.getState();

      // Send the rendered page back to the client
      res.send(renderFullPage(html, preloadedState));
    });
};

const renderFullPage = (html, preloadedState) => {
  return `
  <!doctype html>
    <html>
      <head>
        <title>Depression Screener - Universal React App</title>
      </head>
      <body>
        <div id="main">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
        </script>
        <script src="//localhost:${bundlePort}/bundle.js"></script>
      </body>
    </html>
    `;
};

if (!isDev) {
  app.use(express.static(path.join(__dirname + '/static')));
}
app.use('/', handleRender);
app.listen(3000);
