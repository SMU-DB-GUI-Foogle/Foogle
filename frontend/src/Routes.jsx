import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { Login, Register } from './Login';
import { ProductView } from './Products';


export default function Routes({ appProps }) {
    return (
      <Switch>
        {/* <AppliedRoute path="/" exact component={Home} appProps={appProps} /> */}
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
        <AppliedRoute path="/product/:name" component={ProductView} appProps={appProps} />

        
        { /* Add catch for routes not found */ }
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
  }