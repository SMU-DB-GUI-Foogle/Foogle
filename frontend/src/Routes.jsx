import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { ProfileView, ProfileEditor, GroupView, GroupEditor, RecipeView, RecipeEditor } from './Profile';
import { loginLanding } from './Login'
import { ProductView } from './Products';


export default function Routes({ appProps }) {
    return (
      <Switch>
        {/* <AppliedRoute path="/" exact component={Home} appProps={appProps} /> */}
        <AppliedRoute path="/login" exact component={loginLanding} appProps={appProps} />
        <AppliedRoute path="/:username" exact component={ProfileView} appProps={appProps} />
        <AppliedRoute path="/product/:name" exact component={ProductView} appProps={appProps} />
        <AppliedRoute path="/:username/edit" exact component={ProfileEditor} appProps={appProps} />
        <AppliedRoute path="/:username/groups" exact component={GroupView} appProps={appProps} />
        <AppliedRoute path="/:username/groups/edit" exact component={GroupEditor} appProps={appProps} />
        <AppliedRoute path="/:username/recipes" exact component={RecipeView} appProps={appProps} />
        <AppliedRoute path="/:username/recipes/:recipeName" exact component={RecipeEditor} appProps={appProps} />
        
        { /* Add catch for routes not found */ }
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
}
