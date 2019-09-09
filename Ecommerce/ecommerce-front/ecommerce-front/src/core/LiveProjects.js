import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';

const LiveProjects = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  
    // load categories and set form data
     const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    });
  };
  
  useEffect(() => {
    init()
  }, []);
  
  return(
  <Layout 
        title="Live Projects" 
        description="These projects are live and waiting for you to apply." 
        className="container-fluid"
        >
            <div className="row">
                  <div className="col-4">
                    <h5>Filter by Category</h5>
                    <ul>
                      <Checkbox categories={categories} />
                      </ul>  
                  </div>
                  
                  <div className="col-8">
                  
                  Right 
                  
                  </div>
                      
            </div>
  </Layout>
  );
};

export default LiveProjects;