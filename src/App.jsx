import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import UserDetails from './UserDetails';
import RepoDetails from './RepoDetails';
import ReposList from './ReposList';
import store from './store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          {/* Rota para a Landing Page */}
          <Route exact path="/" component={Landing} />
          {/* Rota para a página de dados do usuário */}
          <Route exact path="/:user" component={UserDetails} />
          {/*Rota para a página que lista os repositórios do usuário */}
          <Route path="/:user/repos" component={ReposList} />
          {/*Rota para a página com detalhes de um repositório */}
          <Route path="/:user/:repo" component={RepoDetails} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
