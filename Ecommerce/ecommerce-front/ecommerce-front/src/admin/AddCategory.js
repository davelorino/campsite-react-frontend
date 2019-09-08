// admin AddCategory.js

import React, {useState} from "react";
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const {user, token} = isAuthenticated();
  
  const handleChange = (e) => {
      setError('');
      setName(e.target.value);
  };
  
  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        }
      });
  };
  
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
        <div className="form-group">
            <label className="text-muted">Category Name</label>
                <input type="text" 
                 className="form-control" 
                 onChange={handleChange} 
                 value={name}
                 autoFocus
                 />
                 <button className="btn btn-outline-dark mt-2">Create Category</button>
        </div>
    </form>
  );
  
  const showSuccess = () => {
    if(success) {
      return <h5 className="text-info">{name} is created</h5>
    }
  };
  
  const showError = () => {
    if(error) {
      return <h5 className="text-danger">{name} should be unique.</h5>
    }
  };
  
  const goBack = () => (
    <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
    </div>
  );
  
  return(
      <Layout title="Category" description="Manage your projects more effectively with categories.">
          <div className="row">
              <div className="col-md-8 offset-md-2">
                  {showSuccess()}
                  {showError()}
                  {newCategoryForm()}
                  {goBack()}
              </div>
          </div>
      </Layout>
  );
  
};


export default AddCategory;





