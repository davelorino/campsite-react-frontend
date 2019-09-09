import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories, getFilteredProjects} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import {payments} from './fixedPayments';

const LiveProjects = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], pitch_price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setlimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);
  
    // load categories and set form data
     const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  
  const loadFilteredResults = (newFilters) => {
   // console.log(newFilters);
   getFilteredProjects(skip, limit, newFilters).then(data => {
     if(data.error) {
       setError(data.error);
     } else {
       setFilteredResults(data);
     }
   })
  };
  
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.Filters);
  }, []);
  
  const handleFilters = (filters, filterBy) => {
    // console.log('LIVE PROJECTS', filters, filterBy);
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
    
    if(filterBy === 'pitch_price') {
      let paymentValues = handlePayment(filters);
      newFilters.filters[filterBy] = paymentValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
    };
  
  const handlePayment = value => {
    const data = payments;
    let array = [];
    
    for(let key in data) {
      if(data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  
  
  
  return(
  <Layout 
        title="Live Projects" 
        description="These projects are live and waiting for you to apply." 
        className="container-fluid"
        >
            <div className="row">
                  <div className="col-4">
                    <h5>Filter by Category</h5>
                    <ul>
                      <Checkbox 
                                categories={categories} 
                                handleFilters={filters => handleFilters(filters, 'category')
                                }
                              />
                        </ul>
                        <h5>Filter by Payment</h5>
                    <div>
                      <RadioBox 
                                payments={payments} 
                                handleFilters={filters => handleFilters(filters, 'pitch_price')
                                }
                              />
                        </div>
                    </div>
                  <div className="col-8"> {JSON.stringify(filteredResults)}</div>
            </div>
  </Layout>
  );
};

export default LiveProjects;