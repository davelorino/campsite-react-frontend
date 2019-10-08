import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {projectsCreatedBy, getApplicationHistoryAdmin} from './apiUser';
import moment from "moment";


const AdminDashboard = () => {
  
  const {user: {_id, name, email, role_type, business_name}} = isAuthenticated();
    const [history, setHistory] = useState([]);
    const [applicationHistory, setApplicationHistory] = useState([]);
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
    
    const initApplications = (userId, token) => {
      getApplicationHistoryAdmin(userId, token).then(data => {
        if(data.error) {
          console.log(data.error);
        } else {
          setApplicationHistory(data);
        }
      });
    };
    
    useEffect(() => {
      init(_id, token);
    }, []);
    
    useEffect(() => {
      initApplications(_id, token);
    }, []);
    
    const adminLinks = () => {
      return (
        <div className="card">
            <h6 className="card-header">{name}</h6>
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
              <h6 className="card-header">My Information</h6>
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
              <h6 className="card-header">My Projects</h6>
                  <ul className="list-group">
                      <li className="list-group-item">
                      
                      {history.map((p, i) => (
                        <>
                        <div key={i}>
                          <p className="sm">{p.name}</p>
                          <p className="sm">Posted {moment(p.createdAt).fromNow()}</p>
                          <button className="btn btn-sm btn-outline-dark">View / Update</button> 
                          <Link to={`project/applicants/${_id}/${p._id}`}>
                          <button className="btn btn-sm btn-outline-dark ml-2">View Applicants</button> 
                          </Link>
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
