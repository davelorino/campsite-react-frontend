import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories, getFilteredProjects} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import Selectize from './Selectize';
import {payments} from './fixedPayments';

const LiveProjects = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], pitch_price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setlimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  
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
       setFilteredResults(data.data);
       setSize(data.size);
       setSkip(0);
     }
   });
  };
  
  const loadMore = () => {
    let toSkip = skip + limit;
   // console.log(newFilters);
   getFilteredProjects(toSkip, limit, myFilters.filters).then(data => {
     if(data.error) {
       setError(data.error);
     } else {
       setFilteredResults([...filteredResults, ...data.data]);
       setSize(data.size);
       setSkip(toSkip);
     }
   });
  };
  
  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className="btn btn-danger mb-5">Load more</button>
      )
    );
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
        title="Start something." 
        description="These projects are live and waiting for you to apply." 
        className="container-fluid"
        >
            <div className="row">
                  <div className="col-2">
                    {/*
                    <h5>Filter by Category</h5>
                    <ul>
                      <Checkbox 
                                categories={categories} 
                                handleFilters={filters => handleFilters(filters, 'category')
                                }
                              />
                        </ul>
                        */}
                    <h6>Category</h6>
                        <div className="mb-3">
                              <Selectize 
                                categories={categories} 
                                handleFilters={filters => handleFilters(filters, 'category')
                                }
                              />
                        </div>
                        <h6>Payment</h6>
                    <div>
                      <RadioBox 
                                payments={payments} 
                                handleFilters={filters => handleFilters(filters, 'pitch_price')
                                }
                              />
                        </div>
                        
                    
                    </div>
                    
                     
                    
                  <div className="container">
                  
                      <h5 className="mb-4"></h5>
                          <div className="row">
                              {filteredResults.map((project, i) => (
                                
                                    <div key={i} className="col-4 mb-3">
                                       <Card project={project} />
                                    </div>
                                
                              ))}
                              </div>
                              <hr />
                              {loadMoreButton()}
                  </div>
            </div>
  </Layout>
  );
};

export default LiveProjects;