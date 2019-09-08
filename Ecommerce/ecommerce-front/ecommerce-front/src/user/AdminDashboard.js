import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
  
  const {user: {_id, name, email, role_type, business_name}} = isAuthenticated();
  
    const adminLinks = () => {
      return (
        <div className="card">
            <h5 className="card-header">Profile</h5>
            <ul className="list-group"> 
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/project">Create Project</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/profile/update">Update Profile</Link>
                </li>
            </ul>
        </div>
      );
  };
  
  const adminInfo = () => {
    return (
      <div className="card mb-5">
              <h5 className="card-header">My Information</h5>
                  <ul className="list-group">
                      <li className="list-group-item">{name}</li>
                      <li className="list-group-item">{email}</li>
                      <li className="list-group-item">{business_name}</li>
                      <li className="list-group-item">
                          {role_type === "Post a project" ? "Business / Organization" : "Student"}
                      </li>
                  </ul>
            </div>
    );
  };
  
  const projectHistory = () => {
    return (
            <div className="card mb-5">
              <h5 className="card-header">Project History</h5>
                  <ul className="list-group">
                      <li className="list-group-item">history</li>
                  </ul>
            </div>
    );
  };
  
  return (
      <Layout title="Dashboard" description="Keeping track of your projects is easy with Campsite." className="container">
          <div className="row">
              <div className="col-3">
                  {adminLinks()}
              </div>
              <div className="col-9">
                  {adminInfo()}
              </div>
          </div>
          <div className="row">
              <div className="col-3">
                  {projectHistory()}
              </div>
          </div>
      </Layout>
      );
};

export default AdminDashboard;
