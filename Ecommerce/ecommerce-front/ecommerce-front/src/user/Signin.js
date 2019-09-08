
// users Signin
import React, { useState } from "react";
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const {user} = isAuthenticated();
  
 

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({ email, password })
    .then( data => {
      if(data.error) {
        setValues({...values, error: data.error, loading: false});
      } else {
          authenticate(data, () => {
            setValues({
            ...values,
            redirectToReferrer: true 
          });
        });
      }
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const signUpForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
        />
      </div>


      <button onClick={clickSubmit} className="btn btn-primary" type="submit">
        Sign In
      </button>
    </form>
  );

  
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
        {error}
      </div>
  );
  
  const showLoading = () => 
    loading && (<div className="alert alert-info">
                    <h5>Loading...</h5>
                </div>
                );
  
  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role_type === "Post a project") {
          return <Redirect to="/admin/dashboard" />
      } else {
          return <Redirect to="/user/dashboard" />
      }
    }
  };



  return (
    <Layout
      title="Connect."
      description="Sign in and connect with local opportunities."
      className="container col-md-8 offset-md-2">
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;

