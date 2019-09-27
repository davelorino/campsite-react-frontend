import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProjects} from './apiCore';
import Card from './Card';
import { getCart } from './cartHelpers';
import {Link} from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    setItems(getCart)
  }, [])
  
  const showItems = items => {
    return (
      <div>
        <h5>You have shortlisted these projects</h5><br/>
        <p className="lead">Complete the application by clicking 'Apply'</p>
        {items.map((project, i) => (<Card key={i} project={project} /> ))}
      </div>  
    );
  };
  
  const noItemsMessage = () => (
    <h5>
        Your list of projects is empty.<br/> <Link to="/projects">Continue browsing</Link> 
    </h5>
  );
  
  return(
  <Layout title="Applications." description="Complete your applications today." className="container-fluid">
      <div className="row">
          <div className="col-6">
              {items.length > 0 ? showItems(items) : noItemsMessage() }
          </div>
          <div className="col-6">
              <p>Show Checkout Options - Shipping, Address, Total, Update</p>       
              </div>
        </div>
      
  </Layout>
  );
  
};

export default Cart;

