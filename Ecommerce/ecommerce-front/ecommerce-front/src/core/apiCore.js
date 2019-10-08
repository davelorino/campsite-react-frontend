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
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
 };



  export const listRelated = (projectId) => {
    return fetch(`${API}/projects/related/${projectId}`, {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }  
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  };
  
    export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify(paymentData)
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
      
      
    export const read = (projectId) => {
      return fetch(`${API}/project/${projectId}`, {
        method: "GET"
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
    };
      
     
      
  
  
  