import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem} from './helpers';

const Card = ({project, showViewProjectButton = true}) => {
  const [redirect, setRedirect] = useState(false);
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
  
  const addToCart = () => {
    addItem(project, () => {
      setRedirect(true);
    });
  };
  
  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  };
  
  const showApplyButton = () => {
    return (
      <button onClick={addToCart} className="btn btn-outline-info mt-2 mb-2">
          Apply 
      </button>
    );
  };
  
  return (
        <div className="card">
            <div className="card-header name">{project.name}</div>
            <div className="card-body">
            {shouldRedirect(redirect)}
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