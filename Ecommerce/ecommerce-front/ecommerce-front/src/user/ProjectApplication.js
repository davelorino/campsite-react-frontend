import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {getProjects, read, listRelated} from '../core/apiCore';
import Card from '../core/Card';
import {createApplication} from './apiUser';




const ProjectApplication = (props) => {
  
    const [application, setApplication] = useState({
      applicantId: '',
      ownerId: '',
      projectId: '',
      applicantName: '',
      university: '',
      studying: '',
      projectClient: '',
      bio: '',
      skills: [''],
      experience: [''],
      payment: ''
    })
  
    const {applicantId, 
           projectName, 
           ownerId, 
           projectId, 
           applicantName,
           projectClient,
           university, 
           studying, 
           skills, 
           experience, 
           bio,
           payment} = application;
    const {user, token} = isAuthenticated();
    const [project, setProject] = useState({});
    const [error, setError] = useState(false);
    const {user: {_id, name, email, role_type, business_name}} = isAuthenticated();
    
     const loadSingleProject = projectId => {
        read(projectId).then(data => {
          if(data.error) {
            setError(data.error);
          } else {
            setProject(data);
            }}
            );
          };
          
          
   const clickSubmit = event => {
    event.preventDefault();
    const projectId = props.match.params.projectId;
    console.log(user);
    console.log(user._id);
    console.log(props);
    setApplication({...application, 
                    projectId: projectId, ownerId: project.created_by
    });
    createApplication(user._id, token, projectId, { 
          projectId,
          bio,
          skills,
          experience,
          ownerId,
          payment,
          applicantId,
          applicantName,
          projectName,
          projectClient,
           })
    .then(data => {
      if(data.error) {
          setApplication({...application, error: data.error})
        } else {
          setApplication({
            ...application, 
            applicantId: '', 
            ownerId: '',
            projectName: '',
            payment: '',
            bio: '',
            projectClient: '',
            projectId: '',
            applicantName: '',
            skills: [''],
            experience: [''],
          });
        }
    });
  };
      
  
  
      useEffect(() => {
        const projectId = props.match.params.projectId;
        loadSingleProject(projectId);
      }, [props]);
      
  
  
      const handleChange = name => event => {
        setApplication({ ...application, 
                            error: false, [name]: 
                            event.target.value, 
                            applicantId: _id,
                            ownerId: project.created_by,
                            projectName: project.name,
                            payment: project.pitch_price,
                            projectClient: project.business_name,
                            applicantName: user.name
        });
      {/*
        console.log("console.log(values): ", values);
        console.log("console.log(values.category2): ", values.category2);
        console.log("console.log(JSON.parse([values.category2]).needed_skills): ", JSON.parse([values.category2]).needed_skills);
        console.log("console.log(values.category2.needed_skills): ", values.category2.needed_skills)
        console.log(JSON.parse([values.category2]).needed_skills.length)
        console.log([values.category2.name])
        */}
        console.log(application);
        console.log(project);
        console.log(_id);
        
      };
          
            const updateSkill = (e, index) => {
            const userCopy = { ...application };
            userCopy.skills[index] = e.target.value;
            setApplication(userCopy);
          };
        
          const removeSkill = index => {
            const userCopy = { ...application };
            const userCopySkills = [...userCopy.skills];
        
            userCopySkills.splice(index, 1);
        
            setApplication({
              ...userCopy,
              skills: [...userCopySkills]
            });
          };
        
          
          const addSkill = event => {
            event.preventDefault();
            setApplication(prevState => {
              return {
                ...prevState,
                skills: [...prevState.skills, ""]
              }; 
            });
          };
          
          
          const updateExperience = (e, index) => {
            const userCopy = { ...application };
            userCopy.experience[index] = e.target.value;
            setApplication(userCopy);
          };
        
          const removeExperience = index => {
            const userCopy = { ...application };
            const userCopyExperience = [...userCopy.experience];
        
            userCopyExperience.splice(index, 1);
        
            setApplication({
              ...userCopy,
              experience: [...userCopyExperience]
            });
          };
        
          const addExperience = event => {
            event.preventDefault();
            setApplication(prevState => {  
              return {
                ...prevState,
                experience: [...prevState.experience, ""]
              }; 
            });
          };
          
  
  
        const createInputs = () => {
        if(application) {
        return application.skills.map((skill, idx) => {
          return (
          <>  
            <hr/>
            <div className="input-group">
              <select
                      onChange={e => updateSkill(e, idx)} 
                      className="form-control">
                      type="text"
                      <option>Which skills do you have that match this project?</option>
                  
                {project.skills_required && project.skills_required.map((q, w) => {
                       console.log(application);
                           return(       
                                  <option 
                                     key={w}
                                    value={q} >
                                     {q}
                                    </option> 
                            )
                          })}}     
                   </select>
                  <div className="input-group-append">
                      <button 
                            className="btn btn-outline-danger mb-3" 
                            type="button" 
                            id="button-addon2" 
                            onClick={() => removeSkill(idx)}>x
                       </button>
                  </div>
                  <div className="input-group">
              <textarea
                onChange={e => updateExperience(e, idx)}
                className="form-control mb-3"
                value={experience[idx]}
                placeholder={application.skills[idx] ? `Give a brief summary of your experience with ${skill}` : ''} />
                </div>
             </div>  
            </>
          );
        });
        };
      };
    
  
  
        return (
        
          <Layout
              title={project && project.name}
              description={project && 
                           project.description && 
                           project.description.substring(0,100)
              }
              >
            <div className="row">
              <div className="col-md-6 offset-md-3">
                  <form className="mb-3" onSubmit={clickSubmit}>
        

                    <label className="text"></label>
                    <textarea
                          onChange={handleChange('bio')}
                          type="text" 
                          value={bio}
                          placeholder={`Tell ${project.business_name} why you make a great fit for this project`}
                          className="form-control mb-3"
                          />
                   
      
                 <div>{createInputs()}</div>
                    <button className="btn btn-outline-primary btn-sm mr-3" onClick={addSkill} type="text">
                        Add more skills
                      </button>
                
                <button className="btn btn-sm btn-outline-dark">Submit Application</button>  
              </form>
              </div>
                
              </div>
          </Layout>
        );
      };


export default ProjectApplication;
