import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({project, showViewProjectButton = true}) => {
  const showViewButton = (showViewProjectButton) => {
    return(
      showViewProjectButton && (
        <Link to={`/project/${project._id}`}>
                    <button className="btn btn-outline-dark mt-2 mb-2 mr-2">
                        View
                    </button>
                </Link>
      )
    );
  };
  
  const showApplyButton = () => {
    return (
      <button className="btn btn-outline-info mt-2 mb-2">
          Apply 
      </button>
    );
  };
  
  return (
        <div className="card">
            <div className="card-header name">{project.name}</div>
            <div className="card-body">
                <ShowImage item={project} url="project" />
                <p className="Lead mt-2">{project.description.substring(0, 100)}</p>
                <p className="black-10">${project.pitch_price}</p>
                <p className="black-9">Category: {project.category && project.category.name}</p>
                <p className="black-8">Added {moment(project.createdAt).fromNow()}</p>
                    {showViewButton(showViewProjectButton)}
                {showApplyButton()}
            </div>
            </div>
  );
};

export default Card;