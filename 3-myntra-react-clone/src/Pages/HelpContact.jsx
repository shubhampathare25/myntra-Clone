import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const HelpContact = () => {
  return (
    <div className="help-contact-container">
      <div className="help-header">
        <span className="help-sub-title">HELP CENTRE</span>
        <h1>How can we help?</h1>
        <p>Find quick answers below, or reach out our team. We are happy to help with orders, returns, payments and anything else.</p>
        
        <div className="help-search-box">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search for answers, e.g. refund" />
        </div>
      </div>

      <div className="help-cards-section">
        <div className="help-card">
          <div className="help-icon-circle"><FaEnvelope /></div>
          <h3>Email us</h3>
          <p className="help-highlight">support@myntra.com</p>
          <span className="help-sub-text">We reply within 24 hours</span>
        </div>

        <div className="help-card">
          <div className="help-icon-circle"><FaPhoneAlt /></div>
          <h3>Call us</h3>
          <p className="help-highlight">+91 00000 00000</p>
          <span className="help-sub-text">Speak to a support executive</span>
        </div>

        <div className="help-card">
          <div className="help-icon-circle"><FaClock /></div>
          <h3>Support hours</h3>
          <p className="help-highlight">Mon to Sat, 9 AM to 8 PM IST</p>
          <span className="help-sub-text">Track an order instead</span>
        </div>
      </div>
    </div>
  );
};

export default HelpContact;