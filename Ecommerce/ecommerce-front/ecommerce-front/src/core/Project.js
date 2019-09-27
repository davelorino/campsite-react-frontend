// src/core/Project.js single project component

import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProjects, read, listRelated} from './apiCore';
import Card from './Card';

const Project = (props) => {
  const [project, setProject] = useState({});
  const [relatedProject, setRelatedProject] = useState([]);
  const [error, setError] = useState(false);
  
  const loadSingleProject = projectId => {
    read(projectId).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProject(data);
        listRelated(data._id).then(data => {
          if(data.error) {
            setError(data.error);
          } else {
            setRelatedProject(data);
          }
        });
      }
    });
  };
  
  
  useEffect(() => {
    const projectId = props.match.params.projectId;
    loadSingleProject(projectId);
  }, [props]);
  
  return (
    <Layout
        title={project && project.name}
        description={project && 
                     project.description && 
                     project.description.substring(0,100)
        }
        className="container-fluid"
        >
        <div className="row">
            <div className="col-8">
            {
              project && 
              project.description && (
              <Card project={project} showViewProjectButton={false} />
            )}
            </div>
            <div className="col-4">
                <h5>Related Projects</h5>
                {relatedProject.map((p, i) => (
                  <div className="mb-3">
                    <Card key={i} project={p} />
                  </div>
              ))}
            </div>
        </div>
        
    </Layout>
  );
};

export default Project;
