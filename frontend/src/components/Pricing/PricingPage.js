// src/components/Pricing/PricingPage.jsx
import React from 'react';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Pricing Plans</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-4">
            <h4>Basic</h4>
            <h5>$29/month</h5>
            <ul>
              <li>Basic Support</li>
              <li>5 Projects</li>
              <li>Email Support</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4">
            <h4>Standard</h4>
            <h5>$59/month</h5>
            <ul>
              <li>Priority Support</li>
              <li>20 Projects</li>
              <li>Chat Support</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4">
            <h4>Premium</h4>
            <h5>$99/month</h5>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Projects</li>
              <li>Dedicated Manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
