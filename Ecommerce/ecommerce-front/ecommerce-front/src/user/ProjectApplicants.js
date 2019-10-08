// src/core/Project.js single project component

import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {getProjects, read, listRelated, getBraintreeClientToken} from '../core/apiCore';
import {getApplicationHistoryByProjectId} from './apiUser';
import Card from '../core/Card';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import moment from 'moment';

const ProjectApplicants = (props) => {
  const [applications, setApplications] = useState([]);
  const [relatedProject, setRelatedProject] = useState([]);
  const [error, setError] = useState(false);
  const {user: {_id, name, email, role_type}} = isAuthenticated();
  const token = isAuthenticated().token;
  const userId = props.match.params.userId
  
  const loadProjectApplications = (projectId, userId) => {
    getApplicationHistoryByProjectId(userId, projectId, token).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setApplications(data);
      }
    });
  };
  
  useEffect(() => {
    const projectId = props.match.params.projectId;
    const userId = props.match.params.userId;
    console.log(projectId, userId);
    loadProjectApplications(userId, projectId);
  }, [props]);
  
  return (
      <Layout title="Dashboard." description="Keeping track of your projects is easy with Campsite." className="container">
          <div className="container">
         <div className="row">
          {/*    
              <h6 style={{fontSize: "small"}} className="card-header">My Applicants</h6>
                  <ul className="list-group">
                      <li className="list-group-item">
             */}   
                      {applications && applications.map((a, i) => {
                      return (
                        <>
                        <div className="card col-4 mb-3" key={i}>
                        

                          <div className="card-header name">{a.applicantName}</div>
                          <div className="card-body">
                              <p style={{fontSize:"smaller"}} 
                                 className="Lead"> 
                                 Studying {a.studying} at {a.university}
                              </p>
                          <hr/>
                          <p style={{fontSize:"small",fontStyle: "italic"}} 
                             className="black-10">
                             "Tell us why you'd make a great fit..."
                             </p>
                          <p className="Lead" style={{fontSize: "small"}}>{a.bio}</p>
                              <hr/>
                              {a.skills.map((s, j) => {
                                return(
                                <>  
                                  <p style={{fontSize: "smaller", fontStyle:"italic"}} 
                                     className="black-10" key={j}>
                                     "{s}..."
                                   </p>
                                  <p style={{fontSize: "smaller"}} 
                                     className="Lead">
                                     {a.experience[j]}
                                     </p>
                                  <hr/>
                                </>
                                )
                              })}

                          <p style={{fontSize:"smaller"}} className="sm">Posted {moment(a.createdAt).fromNow()}</p>
                          <button className="btn btn-sm btn-outline-dark">View Profile</button> 
                          <Link to={`/admin/${userId}/${a._id}`}>
                          <button className="btn btn-sm btn-outline-dark ml-2">Select Applicant</button> 
                          </Link>
                          </div>
                          
                        <hr/>
                        </div>
                        
                        </>
                      )})}
                      
            </div>
                </div>
      </Layout>
  );
};

export default ProjectApplicants;
