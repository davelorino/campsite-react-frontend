
// users Signup
import React, { useState } from "react";
import Layout from '../core/Layout';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    studying: "",
    skills: [""],
    error: "",
    success: "",
    role_type: "",
    business_name: ""
  });

  const { name, email, password, studying, skills, success, error, role_type, business_name } = values;
  
 

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({ name, email, password, studying, skills, role_type, business_name })
    .then( data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          business_name: '',
          studying: '',
          role_type: '',
          skills: [''],
          error: '',
          success: true 
        })
      }
    })
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const createInputs = () => {
    return values.skills.map((skill, idx) => {
      return (
        <div className="input-group">
            <input 
                  value={skill} placeholder="Enter a skill" 
                  onChange={e => updateSkill(e, idx)} 
                  type="text" 
                  className="form-control" 
               />
              <div className="input-group-append">
                  <button 
                        className="btn btn-outline-danger mb-3" 
                        type="button" 
                        id="button-addon2" 
                        onClick={() => removeSkill(idx)}>x
                   </button>
              </div>
        </div>
      );
    });
  };

  const updateSkill = (e, index) => {
    const userCopy = { ...values };
    userCopy.skills[index] = e.target.value;
    setValues(userCopy);
  };

  const removeSkill = index => {
    const userCopy = { ...values };
    const userCopySkills = [...userCopy.skills];

    userCopySkills.splice(index, 1);

    setValues({
      ...userCopy,
      skills: [...userCopySkills]
    });
  };

  const addSkill = event => {
    event.preventDefault();
    setValues(prevState => {
      return {
        ...prevState,
        skills: [...prevState.skills, ""]
      };
    });
  };

  const signUpForm = () => (
    <form onSubmit={clickSubmit}>
    
    
    <div className="form-group">
         <select onChange={handleChange("role_type")} class="form-control">
        <option selected>I want to...</option>
        <option>Post a project</option>
        <option>Work on a project</option>
      </select>
    </div>
  
    </form> 
  );



    const renderInput = () => {
      if(values.role_type === "Post a project"){
          return (
              <>  
                <div className="form-group">
                      <input
                        onChange={handleChange("name")}
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        value={name}
                      />
                </div>
                
                <div className="form-group">
                      <input
                        onChange={handleChange("business_name")}
                        type="text"
                        placeholder="Organization / Business"
                        className="form-control"
                        value={business_name}
                      />
                    </div>
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
                        placeholder="Choose a password"
                        className="form-control"
                        value={password}
                      />
                    </div>
                </>
          );
      } else if(values.role_type === "Work on a project") {
        return (
        <>  
          <div className="form-group">
                      <input
                        onChange={handleChange("name")}
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        value={name}
                      />
                </div>
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
                        onChange={handleChange("studying")}
                        type="text"
                        placeholder="I'm studying..."
                        className="form-control"
                        value={studying}
                      />
                    </div>
              
                    <div>
                      <div>{createInputs()}</div>
                      <button className="btn btn-outline-primary btn-sm mb-3" onClick={addSkill} type="text">
                        Add more skills
                      </button>
                    </div>
                    
                                  
                    <div className="form-group">
                      <input
                        onChange={handleChange("password")}
                        type="password"
                        placeholder="Choose a password"
                        className="form-control"
                        value={password}
                      />
                    </div>
              </>
        )
      }
    }
      
      const renderSubmitButton = () => {
       return (
         <button onClick={clickSubmit} className="btn btn-dark" type="submit">
            Sign Up
          </button>
          );
      }
    

      

      

  
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
        {error}
      </div>
  );
  
  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? "" : "none"}}>
        Success! Welcome to Campsite. <Link to="/signin">Sign in.</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Join today."
      className="container col-md-8 offset-md-2">
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {renderInput()}
      {renderSubmitButton()}
    </Layout>
  );
};

export default Signup;

