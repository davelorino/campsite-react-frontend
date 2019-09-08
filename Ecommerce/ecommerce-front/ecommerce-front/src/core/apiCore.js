 import {API} from '../config';
 
   export const getProjects = (sortBy) => {
    return fetch(`${API}/projects?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  };
