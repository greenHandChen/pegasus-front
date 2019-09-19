import React from 'react';
import {Route, Router, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/authorize/Login';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <AuthenticatedRoute path="/" component={IndexPage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
