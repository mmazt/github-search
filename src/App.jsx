import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import UserDetails from './UserDetails';
import store from './store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          {/* Rota para a Landing Page */}
          <Route exact path="/" component={Landing} />
          {/* Rota para a página de dados do usuário */}
          <Route path="/user/:user" component={UserDetails} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
