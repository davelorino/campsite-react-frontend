import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getApplicationHistory} from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  
  const {user: {_id, name, email, role_type}} = isAuthenticated();
  const token = isAuthenticated().token;
  
  const [history, setHistory] = useState([]);
  
  const init = (userId, token) => {
    getApplicationHistory(userId, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };
  
  useEffect(() => {
    init(_id, token);
  }, []);
  
    const userLinks = () => {
      return (
        <div className="card">
            <h6 className="card-header">Profile</h6>
            <ul className="list-group"> 
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">Projects</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">Applications</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/profile/update">Update Profile</Link>
                </li>
            </ul>
        </div>
      );
  };
  
  
  
  const userInfo = () => {
    return (
      <div className="card mb-5">
              <h4 className="card-header">My Information</h4>
                  <ul className="list-group">
                      <li className="list-group-item">{name}</li>
                      <li className="list-group-item">{email}</li>
                      <li className="list-group-item">{role_type}</li>
                      <li className="list-group-item">
                          {role_type === "Post a project" ? "Business / Organization" : "Student"}
                      </li>
                  </ul>
            </div>
    );
  };
  
  
  
  const userApplicationHistory = (history) => {
    return (
            <div className="card mb-5">
              <h6 className="card-header">Project Application History</h6>
                  <ul className="list-group">
                      <li className="list-group-item">
                      
                      {history.map((p, i) => (
                        <>
                        <div key={i}>
                          <p className="sm">Project: {p.projectName}</p>
                          <p className="sm">Client: {p.projectClient}</p>
                          <p className="sm">Applied: {moment(p.createdAt).fromNow()}</p>
                          <button className="btn btn-sm btn-outline-dark">View / Update</button> 
                          </div>
                          
                        <hr/>
                        </>
                      ))}
                      
                      </li>
                  </ul>
            </div>
    );
  };
  
  return (
      <Layout title="Dashboard" description="Keeping track of your projects is easy with Campsite." className="container">
          <div className="row">
              <div className="col-3">
                  {userLinks()}
              </div>
              <div className="col-9">
                  {userApplicationHistory(history)}
              </div>
          </div>
      </Layout>
      );
};

export default Dashboard;
