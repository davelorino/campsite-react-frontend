 import {API} from '../config';
 import queryString from 'query-string';
 
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

  export const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  };


export const getFilteredProjects = (skip, limit, filters = {}) => {
   const data = {
     limit, skip, filters
   };
   return fetch(`${API}/projects/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
         console.log(err);
      });
  };
  
  
     export const list = (params) => {
        const query = queryString.stringify(params);
        return fetch(`${API}/projects/search?${query}`, {
          method: "GET"
        })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          console.log(err);
        });
      };
  
  
  