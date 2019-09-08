import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const AdminRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props =>
      isAuthenticated() && isAuthenticated().user.role_type === "Post a project" ? (
          <Component {...props} />
   ) : (
          <Redirect to={{
                pathname: '/admin/dashboard',
                state: { from: props.location }
          }}
       />

    )}
  />
);

export default AdminRoute;