import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth'
import {API} from '../config';

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: '#51f5df'};
  } else {
    return {color: '#ffffff'};
  }
};


const isSignin = (history, path) => {
  if(history.location.pathname === path){
    return "nav nav-tabs bg-dark";
    } else {
      return "nav nav-tabs bg-dark";
    }
};

const Menu = ({ history }) => (
  <div>
      <ul className={isSignin(history, "/signin")}>
          <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
              </Link>
          </li>
          
          {isAuthenticated() && isAuthenticated().user.role_type === "Work on a project" && (
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
              Dashboard
              </Link>
          </li>
          )}
          
          {isAuthenticated() && isAuthenticated().user.role_type === "Post a project" && (
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
              Dashboard
              </Link>
          </li>
          )}
          
          
          {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                  Signin
                  </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                  Signup
                  </Link>
              </li>
           </Fragment>
          )}
          
          {isAuthenticated() && (
              <li className="nav-item">
                  <span 
                        className="nav-link" 
                        style={{cursor: 'pointer', color: '#ffffff'}}
                         onClick={() => 
                              signout(() => {
                                   history.push('/');
                              })
                          }
                        >
                  Signout
                  </span>
              </li>  
          )}
          
      </ul>
  </div>
);

export default withRouter(Menu);