import React from 'react';
import {API} from '../config';

const ShowImage = ({item, url}) => (
  <img className="card-img-top"
      src={`${API}/${url}/photo/${item._id}`} 
        />
);

export default ShowImage;