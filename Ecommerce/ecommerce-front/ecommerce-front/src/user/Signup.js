
// users Signin
import React, { useState } from "react";
import Layout from '../core/Layout';
import {API} from '../config';

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    studying: "",
    skills: [""],
    error: "",
    success: ""
  });

  const { name, email, password, studying, skills } = values;
  
  
  

  const signup = user => {
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clickSubmit = event => {
    event.preventDefault();
    signup({ name, email, password, studying, skills });
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const createInputs = () => {
    return values.skills.map((skill, idx) => {
      return (
        <div className="input-group">
          <input value={skill} placeholder="Enter a skill" onChange={e => updateSkill(e, idx)} type="text" className="form-control" />
          <div clasName="input-group-append">
      <button className="btn btn-danger mb-3" type = "button" id = "button-addon2" onClick={() => removeSkill(idx)}>x</button>
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

  const addSkill = () => {
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
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Studying</label>
        <input
          onChange={handleChange("studying")}
          type="text"
          className="form-control"
        />
      </div>

      <div>
        <div>{createInputs()}</div>
        <button className="btn btn-success btn-sm mb-3" onClick={addSkill} type="text">
          Add more skills
        </button>
      </div>

      <button onClick={clickSubmit} className="btn btn-primary" type="submit">
        Sign Up
      </button>
    </form>
  );

  return (
    <Layout
      title="Signup"
      description="Join today."
      className="container col-md-8 offset-md-2">
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;

