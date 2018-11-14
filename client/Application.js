import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AppWrapper from 'Containers/AppWrapper';
import Details from 'Containers/Details';

import './index.scss';

/**
 * @constructor Application
 * @description Represents the application's main component.
 * It renders the specific component for each route defined
 * It's wrapped by AuthProvider from ContextAPI to enable access system to work on some components
 */
const Application = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AppWrapper} />
      <Route exact path="/:category" component={AppWrapper} />
      <Route path="/:category/:id" component={Details} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

const isDevEnv = process.env.NODE_ENV === 'development';

// If it's running on development environment, enables hot load
const App = isDevEnv ? hot(module)(Application) : Application;

export default App;
