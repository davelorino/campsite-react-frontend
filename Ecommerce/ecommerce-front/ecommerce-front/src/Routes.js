// user/Routes.js
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import LiveProjects from './core/LiveProjects';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import ProjectApplicants from './user/ProjectApplicants';
import AddCategory from './admin/AddCategory';
import AddProject from './admin/AddProject';
import Project from './core/Project';
import Cart from './core/Cart';
import ProjectApplication from './user/ProjectApplication';
import SelectApplicant from './core/SelectApplicant';

const Routes = () => {
  return (<BrowserRouter> 
              <Switch>
                  <Route path = "/" exact component={Home}/>
                  <Route path = "/projects" exact component={LiveProjects}/>
                  <Route path = "/cart" exact component={Cart}/>
                  <Route path = "/project/:projectId" exact component={Project}/>
                  <Route path = "/signin" exact component={Signin}/>
                  <Route path = "/signup" exact component={Signup}/>
                  <Route path = "/project/application/:projectId" exact component={ProjectApplication}/>
                  
                  <PrivateRoute path = "/admin/:userId/:applicationId" exact component={SelectApplicant}/>
                  <PrivateRoute path = "/user/dashboard" exact component={Dashboard}/>
                  
                  <AdminRoute path = "/admin/project/applicants/:projectId/:userId" exact component={ProjectApplicants}/>
                  <AdminRoute path = "/admin/dashboard" exact component={AdminDashboard}/>
                  <AdminRoute path = "/create/category" exact component={AddCategory}/>
                  <AdminRoute path = "/create/project" exact component={AddProject}/>
                  
              </Switch>
          </BrowserRouter>
          );
};

export default Routes;