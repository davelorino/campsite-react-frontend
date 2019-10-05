import React, {useState, useEffect} from 'react';

const RadioBox = ({payments, handleFilters}) => {
  const [value, setValue] = useState(0);
  


const handleChange = (event) => {
  handleFilters(event.target.value);
  setValue(event.target.value);
};

  {/*
return payments.map((p, i) => (
    <div key={i}>
        <input type="radio"
               onChange={handleChange}
               value={`${p._id}`}
               name={p}
               className="mr-2 ml-4" />
        <label className="form-check-label">{p.name}</label>
    </div>
  ));
  */}
  
  return (                                                  
     <select
        onChange={handleChange}
        className="form-control"
     >
        <option className="text-muted"></option>
        {payments && payments.map((p, i) => (
           <option 
            key={i}
            value={`${p._id}`} >                                 
            {p.name}
          </option>
         ))}
    </select>
 );
  
  
};

export default RadioBox;
