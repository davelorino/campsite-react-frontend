// admin AddCategory.js

import React, {useState, useEffect} from "react";
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProject} from './apiAdmin';

const AddProject = () => {
  
  const [values, setValues] = useState({
    name: '',
    description: '',
    pitch_price: '',
    categories: [],
    category: '',
    photo: '',
    loading: false,
    error: '',
    createdProject: '',
    redirectToProfile: false,
    formData: ''
  })
  
    const { user, token } = isAuthenticated();
  
  const { name,
          description,
          pitch_price,
          categories,
          category,
          loading,
          error,
          createdProject,
          redirectToProfile,
          formData } = values;
  
  useEffect(() => {
    setValues({...values, formData: new FormData()});
  }, []); 
  
  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };
  
  const clickSubmit = event => {
    event.preventDefault()
    setValues({...values, error: '', loading: true})
  
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
                  <label className="text-muted">Categpry</label>
                  <select
                        onChange={handleChange('category')}
                        className="form-control"
                        >
                        <option value="5d74edd793ffe3987f6e720a">PHP</option>
                        <option value="5d74edd793ffe3987f6e720a">Python</option>
                    </select>
                </div>
                <div className="form-group">
                  <label className="text-muted">On Premises</label>
                  <select
                        onChange={handleChange('on_premises')}
                        className="form-control"
                        >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                
                <button className="btn btn-outline-dark">Create Project</button>
                
    </form>
  );
  
  return (
      <Layout 
              title="Start something" 
              description="Start a project today." 
              >
          <div className="row">
              <div className="col-md-8 offset-md-2">
                  {newPostForm()}
              </div>
          </div>
      </Layout>
  );
}

export default AddProject;