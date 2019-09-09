import React, {useState, useEffect} from 'react';

const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([])
  
  const handleToggle = c => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    // If currently checked cateogry was not already in the state then push to state
    const newCheckedCategoryId = [...checked];
    // else pull/take off
    if(currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //  console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  
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

export default Checkbox;