import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({project}) => {
  return (
    <div className="col-4 mb-3">
        <div className="card">
            <div className="card-header">{project.name}</div>
            <div className="card-body">
                <ShowImage item={project} url="project" />
                <p>{project.description.substring(0, 100)}</p>
                <p>${project.pitch_price}</p>
                <Link to="/">
                    <button className="btn btn-outline-dark mt-2 mb-2 mr-2">
                        View 
                    </button>
                </Link>
                <button className="btn btn-outline-warning mt-2 mb-2">
                        Apply 
                    </button>
            </div>
            </div>
        </div>
  );
};

export default Card;