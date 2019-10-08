import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem} from './cartHelpers';

const Card = ({project, showViewProjectButton = true, showApplyButton = true, showBeginButton = false }) => {
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
  

  const showApply = (showApplyButton) => {
    return (
      showApplyButton && (
      <button onClick={addToCart} className="btn btn-outline-info mt-2 mb-2">
          Apply 
      </button>
    ));
  };

  const showBeginApplication = (showBeginButton) => {
    return (
      showBeginButton && (
     <Link to={`project/application/${project._id}`}>
          <button className="btn btn-outline-info mt-2 mb-2">
              Apply 
          </button>
      </Link>
    ));
  };
  
  return (
        <div className="card">
              <ShowImage item={project} url="project" />
            <div className="card-header name">{project.name}</div>
            <div className="card-body">
            <h6 className="card-title">{project.business_name}</h6>
            {shouldRedirect(redirect)}
                <p className="Lead mt-2">{project.description.substring(0, 100)}</p>
                <p className="black-10">${project.pitch_price}</p>
                <p className="black-10">{project.category && project.category.name}</p>
                <p className="black-10">Added {moment(project.createdAt).fromNow()}</p>
                    {showViewButton(showViewProjectButton)}
                    {showApply(showApplyButton)}
                    {showBeginApplication(showBeginButton)}
            </div>
            </div>
  );
};

export default Card;