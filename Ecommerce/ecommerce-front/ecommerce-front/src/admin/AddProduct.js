// admin AddCategory.js

import React, {useState, useEffect} from "react";
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct} from './apiAdmin';

const AddProduct = () => {
  
  const { user, token } = isAuthenticated();
  
  return (
      <Layout 
              title="Start something" 
              description="Start a project today." 
              >
          <div className="row">
              <div className="col-md-8 offset-md-2">
                  ...
              </div>
          </div>
      </Layout>
  );
}

export default AddProduct;