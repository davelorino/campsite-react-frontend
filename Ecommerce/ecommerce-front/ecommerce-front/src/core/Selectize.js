import React, {useState, useEffect} from 'react';

const Selectize = ({categories, handleFilters}) => {
  const [selected, setSelected] = useState([])
  
  const handleToggle = c => () => {
    // return the first index or -1
    const currentCategoryId = selected.indexOf(c);
    // If currently checked cateogry was not already in the state then push to state
    const newSelectedCategoryId = [...selected];
    // else pull/take off
    if(currentCategoryId === -1) {
      newSelectedCategoryId.push(c);
    } else {
      newSelectedCategoryId.splice(currentCategoryId, 1);
    }
    //  console.log(newCheckedCategoryId);
    setSelected(newSelectedCategoryId);
    handleFilters(newSelectedCategoryId);
  };
  
  const handleChange = (event) => {
  handleFilters(event.target.value);
  setSelected(event.target.value);
};

return (                                                  
     <select
        onChange={handleChange}
        className="form-control"
     >
        <option className="text-muted">Select an option...</option>
        {categories && categories.map((c, i) => (
          <option 
            key={i}
            value={`${c._id}`} >                                 
            {c.name}
          </option>
         ))}
    </select>
 );
    
};
  {/*
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
        <input type="checkbox"
               value={checked.indexOf(c._id === -1)}  
               onChange={handleToggle(c._id)}
               className="form-check-input" />
        <label className="form-check-label">{c.name}</label>
    </li>
  ));
};
*/}

export default Selectize;