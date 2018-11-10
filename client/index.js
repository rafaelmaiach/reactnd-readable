import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { setConfig } from 'react-hot-loader';
import reducer from './reducers';
import middleware from './middleware';

import Application from './Application';

const store = createStore(reducer, middleware);

setConfig({ pureSFC: true });

render(
  <Provider store={store}>
    <Application />
  </Provider>, document.getElementById('root')
);
