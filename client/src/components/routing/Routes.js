import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Forgot from '../auth/Forgot';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

import '../components.css'

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/forgot" component={ Forgot } />
        <PrivateRoute exact path="/dashboard" component={ Dashboard } />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
