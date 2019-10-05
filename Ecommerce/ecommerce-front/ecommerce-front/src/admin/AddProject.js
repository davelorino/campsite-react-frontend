// admin AddCategory.js

import React, {useState, useEffect} from "react";
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProject, getCategories} from './apiAdmin';

const AddProject = () => {
  
  const [values, setValues] = useState({
    name: '',
    description: '',
    pitch_price: '',
    categories: [],
    category: '',
    quantity: '',
    applications: '',
    business_name: '',
    skills_required: [''],
    photo: '',
    created_by: '',
    loading: false,
    error: '',
    createdProject: '',
    redirectToProfile: false
  });
  
 const { user, token } = isAuthenticated();
 

 
  {/*
 const arrayExists = (values) => {
   let needed_skills = [""];
 values.category2.needed_skills ? needed_skills = values.category2.needed_skills : needed_skills = [""];
 console.log(needed_skills);
 }; */}
  
  const { name,
          description,
          pitch_price,
          categories,
          category,
          quantity,
          business_name,
          applications,
          created_by,
          skills_required,
          loading,
          error,
          createdProject,
          redirectToProfile } = values;
  
  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data})
      }
    });
  };
  
  
  
  
  useEffect(() => {
    init();
  }, []); 
  
  {/*}
  const handleChange = name => event => {
    {/*
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    
    setValues({...values, [name]: value});
    console.log(values);
  };
  
  */}
  
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  {/*
    console.log("console.log(values): ", values);
    console.log("console.log(values.category2): ", values.category2);
    console.log("console.log(JSON.parse([values.category2]).needed_skills): ", JSON.parse([values.category2]).needed_skills);
    console.log("console.log(values.category2.needed_skills): ", values.category2.needed_skills)
    console.log(JSON.parse([values.category2]).needed_skills.length)
    console.log([values.category2.name])
    */}
    console.log(values);
    };
  

      
  
  
  const createInputs = () => {
    if(values) {
    return values.skills_required.map((skill, idx) => {
      return (
        <div className="input-group">
          <select
                  onChange={e => updateSkill(e, idx)} 
                  className="form-control">
                  type="text"
                  <option>Select an option...</option>
                  <option>Select another option...</option>
              
            {categories && categories.map((q, w) => {
             if(q.name == category) { 
               console.log("Hello world");
                {return q.needed_skills.map((x, y) => {
                       return(       
                              <option 
                                 key={y}
                                value={x} >
                                 {x}
                                </option> 
                        )
                      })}}})}     
               </select>
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
  };

  const updateSkill = (e, index) => {
    const userCopy = { ...values };
    userCopy.skills_required[index] = e.target.value;
    setValues(userCopy);
  };

  const removeSkill = index => {
    const userCopy = { ...values };
    const userCopySkills = [...userCopy.skills_required];

    userCopySkills.splice(index, 1);

    setValues({
      ...userCopy,
      skills_required: [...userCopySkills]
    });
  };

  const addSkill = event => {
    event.preventDefault();
    setValues(prevState => {
      return {
        ...prevState,
        skills_required: [...prevState.skills_required, ""]
      }; 
    });
  };
  
  
  
  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: '', loading: true});
    createProject(user._id, token, { name,
          description,
          pitch_price,
          category,
          business_name,
          created_by,
          skills_required })
    .then(data => {
      if(data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({
            ...values, 
            name: '', 
            description: '',
            pitch_price: '',
            created_by: '',
            business_name: '',
            skills_required: [''],
            loading: false,
            createdProject: data.name
          });
        }
    });
  };
  
  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
    
    {/*
        <h5>Project Photo</h5>
            <div className="form-group">
                  <label className="btn btn-dark">
                      <input 
                           type="file" 
                           name="photo" 
                           accept="image/*" 
                           onChange={handleChange('photo')} 
                           />
                  </label>
              </div> */}
              
              <div className="form-group">
                  <label className="text-muted">Name</label>
                  <input
                        onChange={handleChange('name')}
                        type="text" 
                        value={name}
                        className="form-control"
                        />
              </div>
              
              <div className="form-group">
                  <label className="text-muted">Description</label>
                  <textarea
                        onChange={handleChange('description')}
                        value={description}
                        className="form-control"
                        />
              </div>
              <div className="form-group">
                  <label className="text-muted">Pitch</label>
                  <input
                        onChange={handleChange('pitch_price')}
                        type="number" 
                        value={pitch_price}
                        className="form-control"
                        />
              </div>
              
              
              <div className="form-group">
                  <label className="text-muted">Category</label>
                  <select
                        onChange={handleChange('category')}
                        className="form-control"
                        >
                        <option>Select an option...</option>
                        {categories && categories.map((c, i) => (
                          <option 
                                key = {i}
                                value={c.name}>
                                {c.name}
                            </option>
                                ))}
                    </select>
                </div>
                
                {showSkillsInfo()}
                
                   <div>
                      <div>{createInputs()}</div>
                      <button className="btn btn-outline-primary btn-sm mb-3" onClick={addSkill} type="text">
                        Add more skills
                      </button>
                    </div>
                
                <div className="form-group">
                  <label className="text-muted">On Premises</label>
                  <select
                        onChange={handleChange('on_premises')}
                        className="form-control"
                        >
                        <option>Selection an option...</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                
                <div className="form-group">
                  <label className="text-muted">Project Owner</label>
                  <select
                        onChange={handleChange('created_by')}
                        className="form-control"
                        >
                        <option value={user._id}>Select an option...</option>
                        <option value={user._id}>{user.business_name}</option>
                    </select>
                </div>
                
                <div className="form-group">
                  <label className="text-muted">Project is for</label>
                  <select
                        onChange={handleChange('business_name')}
                        className="form-control"
                        >
                        <option value={user.name}>Select an option...</option>
                        <option value={user.name}>{user.name}</option>
                    </select>
                </div>
                
                <button className="btn btn-outline-dark">Create Project</button>
                
    </form>
  );
  
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
    </div>
  );
  
  const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdProject ? '' : 'none'}}>
        <p>{`Success! ${createdProject} is created.`}</p>
    </div>
  );
  
  const showLoading = () => 
    loading && (
                <div classame="alert alert-info">
                    <h5>
                        Loading...
                    </h5>
                </div>
                );
                
      const showSkillsInfo = () => (
    <div className="alert alert-info" style={{display: category ? '' : 'none'}}>
        <p>{`These are some suggested skills for ${category} projects. We recommend that you select some skills that you want your applicants to have for this project.`}</p>
    </div>
  );            
  
  return (
      <Layout 
              title="Start something" 
              description="Start a project today." 
              >
          <div className="row">
              <div className="col-md-8 offset-md-2">
                  {showLoading()}
                  {showSuccess()}
                  {showError()}
                  {newPostForm()}

              </div>
          </div>
      </Layout>
  );
}

export default AddProject;