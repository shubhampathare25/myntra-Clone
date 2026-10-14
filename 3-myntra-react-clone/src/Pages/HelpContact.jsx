import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaClock, 
  FaChevronDown, 
  FaChevronUp, 
  FaBox, 
  FaTruck, 
  FaUndoAlt, 
  FaCreditCard, 
  FaUser 
} from 'react-icons/fa';

const FAQS = [
  {
    topic: "orders",
    q: "How do I track my order?",
    a: "Open Orders from your account menu and select the order. You will see its current status and tracking details once it has shipped.",
  },
  {
    topic: "orders",
    q: "Can I cancel or change my order?",
    a: "You can cancel an order from the Orders page until it is shipped. If it has already shipped, please wait for delivery and use the return option instead.",
  },
  {
    topic: "shipping",
    q: "How long does delivery take?",
    a: "Most orders arrive in 3 to 7 working days depending on your pincode. The estimated date is shown at checkout.",
  },
  {
    topic: "shipping",
    q: "Is there a delivery charge?",
    a: "Delivery charges, if any, are shown in your bag before you pay. Some orders qualify for free delivery.",
  },
  {
    topic: "returns",
    q: "How do I return an item?",
    a: "Go to Orders, choose the item and tap Return. Pack it in its original condition with tags, and we will arrange a pickup.",
  },
  {
    topic: "returns",
    q: "When will I get my refund?",
    a: "Refunds are issued to your original payment method after the returned item passes quality check. Banks may take a few extra days to show it.",
  },
  {
    topic: "payments",
    q: "Which payment methods do you accept?",
    a: "We accept UPI, debit and credit cards, net banking and, where available, cash on delivery.",
  },
  {
    topic: "payments",
    q: "My payment failed but money was deducted.",
    a: "Do not worry. Amounts from failed payments are usually returned to your account within 5 to 7 working days. If not, contact us with your transaction ID.",
  },
  {
    topic: "account",
    q: "How do I update my profile or address?",
    a: "Open the account menu, choose Edit profile to change your details and Saved addresses to manage delivery addresses.",
  },
  {
    topic: "account",
    q: "I forgot my password.",
    a: "On the login page choose the forgot password option and follow the steps sent to your registered email.",
  },
];

const HelpContact = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  
  const filteredFaqs = activeTab === 'All'
    ? FAQS
    : FAQS.filter(faq => {
        if (activeTab === 'Orders') return faq.topic === 'orders';
        if (activeTab === 'Shipping') return faq.topic === 'shipping';
        if (activeTab === 'Returns and refunds') return faq.topic === 'returns';
        if (activeTab === 'Payments') return faq.topic === 'payments';
        if (activeTab === 'Account') return faq.topic === 'account';
        return true;
      });

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const tabs = [
    { name: 'All', icon: null },
    { name: 'Orders', icon: <FaBox /> },
    { name: 'Shipping', icon: <FaTruck /> },
    { name: 'Returns and refunds', icon: <FaUndoAlt /> },
    { name: 'Payments', icon: <FaCreditCard /> },
    { name: 'Account', icon: <FaUser /> }
  ];

  return (
    <div className="help-contact-container">
      <div className="help-header">
        <span className="help-sub-title">HELP CENTRE</span>
        <h1>How can we help?</h1>
        <p>Find quick answers below, or reach out our team. <br />We are happy to help with orders, returns, payments and anything else</p>

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
        <span className="faq-sub-title">QUICK ANSWERS</span>
        <h2>Frequently asked questions</h2>
        <div className="faq-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`faq-tab-btn ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.name);
                setOpenIndex(null);
              }}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-arrow-icon">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Send Message Section */}
<div className="help-message-section">
  <div className="help-message-left">
    <span className="help-pink-sub">STILL NEED HELP?</span>
    <h2>Send us a message</h2>
    <p>
      Share as much detail as you can. If your question is about an order, add the order ID so we can look it up faster.
    </p>
  </div>

  <div className="help-message-right-card">
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
            <option>Shipping</option>
            <option>Account</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="form-group">
          <label>Order ID (optional)</label>
          <input type="text" placeholder="e.g. SK123456" />
        </div>
      </div>

      <div className="form-group full-width">
        <label>How can we help?</label>
        <textarea placeholder="Tell us what happened" rows="4"></textarea>
      </div>

      <button type="submit" className="send-msg-btn">Send message</button>
    </form>
  </div>
</div>
</div>
);
};

export default HelpContact;