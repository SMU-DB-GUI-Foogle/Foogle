import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { loginLanding, ProfileView } from './Accounts';
import { ProductView } from './Products';


export default function Routes({ appProps }) {
    return (
      <Switch>
        {/* <AppliedRoute path="/" exact component={Home} appProps={appProps} /> */}
        <AppliedRoute path="/login" exact component={loginLanding} appProps={appProps} />
        {/* <AppliedRoute path="/register" exact component={Register} appProps={appProps} /> */}
        <AppliedRoute path="/profile/:username" component={ProfileView} appProps={appProps} />
        <AppliedRoute path="/product/:name" component={ProductView} appProps={appProps} />

        
        { /* Add catch for routes not found */ }
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
}
