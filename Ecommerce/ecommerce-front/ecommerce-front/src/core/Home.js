// core/Home.js

import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProjects} from './apiCore';
import Card from './Card';

const Home = () => {
  const [projectsByApplications, setProjectsByApplications] = useState([])
  const [projectsByArrival, setProjectsByArrival] = useState([])
  const [error, setError] = useState([])
  
  const loadProjectsByApplications = () => {
    getProjects('applications').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProjectsByApplications(data)
      }
    })
  }
  
  const loadProjectsByArrival = () => {
    getProjects('createdAt').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProjectsByArrival(data)
      }
    })
  }
  
  useEffect(() => {
      loadProjectsByArrival()
      loadProjectsByApplications()
  }, [])
  
  return(
  <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">
          <h4 className="mb-4">New Arrivals</h4>
              <div className="row">
                  {projectsByArrival.map((project, i) => (
                  <Card key={i} project={project} />
                  ))}
              </div>
          <h4 className="mb-4">Most Popular</h4>
              <div className="row">
                  {projectsByApplications.map((project, i) => (
                  <Card key={i} project={project} />
                  ))}
              </div>
  </Layout>
  );
};

export default Home;



