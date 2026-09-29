import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const BagSummary = ({ finalItems }) => {
  const navigate = useNavigate(); 
  const CONVENIENCE_FEES = 99;
  
  let totalItemCount = 0;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((item) => {
    const qty = item.quantity || 1;
    totalItemCount += qty;
    totalMRP += item.original_price * qty;
    totalDiscount += (item.original_price - item.current_price) * qty;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItemCount} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      
      <button className="btn-place-order" onClick={handleCheckout}>
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default BagSummary;