import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { store, history } from './store';

import { Router, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />>
        </Switch>
      </Router>
    </Provider>   
), document.getElementById('root'));