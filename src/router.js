import React from 'react';
import {Router, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <AuthenticatedRoute path="/" component={IndexPage}/>
        {/*<Route path="/products" exact component={Products}/>*/}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
