import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {projectsCreatedBy} from './apiUser';
import moment from "moment";


const AdminDashboard = () => {
  
  const {user: {_id, name, email, role_type, business_name}} = isAuthenticated();
    const [history, setHistory] = useState([]);
    const token = isAuthenticated().token;
    
    const init = (userId, token) => {
      projectsCreatedBy(userId, token).then(data => {
        if(data.error) {
          console.log(data.error);
        } else {
          setHistory(data);
        }
      });
    };
    
    useEffect(() => {
      init(_id, token)
    }, [])
    
    const adminLinks = () => {
      return (
        <div className="card">
            <h5 className="card-header">{name}</h5>
            <ul className="list-group"> 
               {/*
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">Create Category</Link>
                </li>
                */}
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/project">New Project</Link>
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
                  </ul>
            </div>
    );
  };
  
  const projectHistory = (history) => {
    return (
            <div className="card mb-5">
              <h5 className="card-header">My Projects</h5>
                  <ul className="list-group">
                      <li className="list-group-item">
                          {JSON.stringify(history)}
                      </li>
                  </ul>
            </div>
    );
  };
  
  return (
      <Layout title="Dashboard." description="Keeping track of your projects is easy with Campsite." className="container">
          <div className="row">
              <div className="col-3">
                  {adminLinks()}
              </div>
              <div className="col-9">
                  {adminInfo()}
                  {projectHistory(history)}
              </div>
          </div>
      </Layout>
      );
};

export default AdminDashboard;
