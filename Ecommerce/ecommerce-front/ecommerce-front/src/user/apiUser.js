import {API} from '../config';

export const projectsCreatedBy = (userId, token) => {
  return fetch(`${API}/projects/by/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const createApplication = (userId, token, projectId, application) => {
   return fetch(`${API}/project/application/${projectId}/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(application)
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
         console.log(err);
      });
  };