import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const HelpContact = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="help-contact-container">
      <div className="help-header">
        <span className="help-sub-title">HELP CENTRE</span>
        <h1>How can we help?</h1>
        <p>Find quick answers below, or reach out our team. We are happy to help with orders, returns, payments and anything else[cite: 4].</p>
        
        <div className="help-search-box">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search for answers, e.g. refund" />
        </div>
      </div>

      <div className="help-cards-section">
        <div className="help-card">
          <div className="help-icon-circle"><FaEnvelope /></div>
          <h3>Email us</h3>
          <p className="help-highlight">support@Myntra.com</p>
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

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently asked questions</h2>
        <div className="faq-tabs">
          {['All', 'Orders', 'Shipping', 'Returns and refunds', 'Payments', 'Account'].map((tab) => (
            <button 
              key={tab} 
              className={`faq-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="faq-list">
          <div className="faq-item">How do I track my order?</div>
          <div className="faq-item">Can I cancel or change my order?</div>
          <div className="faq-item">How long does delivery take?</div>
          <div className="faq-item">Is there a delivery charge?</div>
          <div className="faq-item">How do I return an item?</div>
          <div className="faq-item">When will i get my refund?</div>
          <div className="faq-item">Which payment methods do you accept?</div>
          <div className="faq-item">My payment failed but money was deducted.</div>
          <div className="faq-item">How do I update my profile or address?</div>
        </div>
      </div>

      {/* Send Message Form */}
      <div className="help-message-section">
        <h3>Still need help?</h3>
        <h2>Send us a message</h2>
        <p>Share as much detail as you can. If your question is about an order, add the order ID so we can look it up faster.</p>

        <form className="help-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Topic</label>
              <select>
                <option>Orders</option>
                <option>Payments</option>
                <option>Returns</option>
              </select>
            </div>
            <div className="form-group">
              <label>Order ID (optional)</label>
              <input type="text" placeholder="e.g. SK123456" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>How can we help?</label>
            <textarea placeholder="Tell us what happened"></textarea>
          </div>

          <button type="submit" className="send-msg-btn">Send message</button>
        </form>
      </div>
    </div>
  );
};

export default HelpContact;