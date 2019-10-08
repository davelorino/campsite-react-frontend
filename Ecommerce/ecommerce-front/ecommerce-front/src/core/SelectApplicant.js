// src/core/Project.js single project component

import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {getProjects, read, listRelated, getBraintreeClientToken, processPayment} from '../core/apiCore';
import {getApplication} from '../user/apiUser';
import Card from '../core/Card';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import moment from 'moment';
import DropIn from 'braintree-web-drop-in-react';

const SelectApplicant = (props) => {
  const [applicant, setApplicant] = useState({});
  const [error, setError] = useState(false);
  const {user: {_id, name, email, role_type}} = isAuthenticated();
  const token = isAuthenticated().token;
  
  const {skills, bio, applicantName, studying} = applicant;
  
  const loadApplicant = (applicationId, userId) => {
    getApplication(userId, applicationId, token).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setApplicant(data);
        console.log(data);
        console.log(applicant);
      }
    });
  };
  
  useEffect(() => {
    const applicationId = props.match.params.applicationId;
    loadApplicant(applicationId, _id);
  }, [props]);
  
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });
  
  const userId = isAuthenticated() && isAuthenticated().user._id;

  
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if(data.error){
        setData({...data, error: data.error});
      } else {
        setData({...data, clientToken: data.clientToken});
      }
    });
  };
  
  
  useEffect(() => {
    getToken(userId, token);
  }, []);
  
  const buy = () => {
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
      console.log(data);
      nonce = data.nonce;
    {/*
      console.log('send nonce and total to process: ', nonce, applicant[0].payment);
    */}
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: applicant[0].payment
    };
    
    processPayment(userId, token, paymentData)
    .then(response => console.log(response))
    .catch(error => console.log(error));
    })
    .catch(error => {
      console.log('dropin error:', error);
      setData({...data, error: error.message});
    });
  };
  
  const showDropIn = () => (
    <div onBlur={() => setData({...data, error: ""})}>
    {data.clientToken !== null ? (
      <div>
          <DropIn options={{
            authorization: data.clientToken
          }} onInstance={instance => (data.instance = instance)} />
          <button onClick={buy} className="btn btn-success">Start Project</button>
      </div>
      
    ) : null}
    </div>
  );
  
  const showError = (error) => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
      </div>
  );
  
  return (
      <Layout title="Select Applicant." description="One step closer." className="container">
          <div className="container" style={{width: 9001}}>
                                 {showError(data.error)}
         <div className="row">
                        <>
                        <div className="card col-4 mr-4 mb-3">
                          <div className="card-header name">{applicant[0] && applicant[0].applicantName}</div>
                          <div className="card-body">
                              <p style={{fontSize:"smaller"}} 
                                 className="Lead"> 
                                 Studying  
                                        {applicant[0] && applicant[0].studying} 
                                           
                                 at {applicant[0] && applicant[0].university} 
                              </p>
                          <hr/>
                        <p style={{fontSize:"small",fontStyle: "italic"}} 
                             className="black-10">
                             "Tell us why you'd make a great fit..."
                             </p>
                          <p className="Lead" style={{fontSize: "small"}}>{applicant[0] && applicant[0].bio}</p>
                              <hr/>

                              {applicant[0] && applicant[0].skills.map((s, j) => {
                                return(
                                <>  
                                  <p style={{fontSize: "smaller", fontStyle:"italic"}} 
                                     className="black-10" key={j}>
                                     "{s}..."
                                   </p>
                                  <p style={{fontSize: "smaller"}} 
                                     className="Lead">
                                     {applicant[0].experience && applicant[0].experience[j]}
                                     </p>
                                  <hr/>
                                </>
                                )
                              })}
                              
                              <p style={{fontSize: "smaller", fontStyle:"italic"}} 
                                     className="black-10">
                                     ${applicant[0] && applicant[0].payment}
                                   </p>

                              
                          <p style={{fontSize:"smaller"}} className="sm">Posted {applicant[0] && moment(applicant[0].createdAt).fromNow()}</p>
 

                          </div>
                        <hr/>
                        </div>
                        </>
                {showDropIn()}                
                    </div>
        
                </div>
                <div className="col-8">
                  
                </div>
      </Layout>
  );
};

export default SelectApplicant;
