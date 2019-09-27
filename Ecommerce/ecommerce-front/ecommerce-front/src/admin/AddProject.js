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
    photo: '',
    created_by: '',
    loading: false,
    error: '',
    createdProject: '',
    redirectToProfile: false,
    formData: ''
  });
  
 const { user, token } = isAuthenticated();
  
  const { name,
          description,
          pitch_price,
          categories,
          category,
          quantity,
          business_name,
          applications,
          created_by,
          loading,
          error,
          createdProject,
          redirectToProfile,
          formData } = values;
  
  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data, formData: new FormData()})
      }
    });
  };
  
  useEffect(() => {
    init();
  }, []); 
  
  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };
  
  const clickSubmit = event => {
    event.preventDefault()
    setValues({...values, error: '', loading: true});
    createProject(user._id, token, formData)
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
            applications: '',
            quantity: '',
            loading: false,
            createdProject: data.name
          });
        }
    });
  };
  
  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
    
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
              </div>
              
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
                                value={c._id}>
                                {c.name}
                            </option>
                                ))}
                    </select>
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
        <h4>{`${createdProject} is created`}</h4>
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