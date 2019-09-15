import React from 'react';
import {API} from '../config';

const ShowImage = ({item, url}) => (
  <div className="img-cropper">
      <img src={`${API}/${url}/photo/${item._id}`} 
        alt={item.name} 
        style={{maxHeight: '70%', maxWidth: '70%'}} 
        className="mb-3"
        />
    </div>
);

export default ShowImage;