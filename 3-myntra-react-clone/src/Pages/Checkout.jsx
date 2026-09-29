import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    
  };

  if (orderPlaced) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h1 style={{ color: "#03a685", fontSize: "32px", marginBottom: "20px" }}>
          Order Placed Successfully! 🎉
        </h1>
        <p style={{ color: "#535766", fontSize: "16px", marginBottom: "30px" }}>
          Thank you for shopping with Myntra. Your order is on the way!
        </p>
        <button 
          onClick={() => navigate("/")} 
          className="btn-place-order" 
          style={{ width: "200px", margin: "0 auto" }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "50%", margin: "40px auto", background: "#fff", padding: "30px", border: "1px solid #eaeaec", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "20px", color: "#282c3f" }}>Delivery Address & Payment</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Full Name</label>
          <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="Enter your name" />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Mobile Number</label>
          <input type="tel" required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="Enter mobile number" />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Shipping Address</label>
          <textarea required rows="3" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="Street, City, Pincode"></textarea>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Payment Method</label>
          <select style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
            <option>Cash on Delivery (COD)</option>
            <option>Credit / Debit Card</option>
            <option>UPI / Google Pay / PhonePe</option>
          </select>
        </div>

        <button type="submit" className="btn-place-order" style={{ marginTop: "10px" }}>
          CONFIRM AND PAY
        </button>
      </form>
    </div>
  );
};

export default Checkout;