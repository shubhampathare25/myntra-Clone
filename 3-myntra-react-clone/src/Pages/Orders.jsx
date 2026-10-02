import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaChevronRight } from 'react-icons/fa';

const Orders = () => {
  const ordersList = [
    {
      id: "SK123456",
      date: "28 Sep 2026",
      status: "Delivered",
      itemTitle: "Men Slim Fit Printed Casual Shirt",
      price: "₹799",
      image: "images/1.jpg" 
    }
  ];

  return (
    <div className="orders-page-container">
      <div className="orders-header">
        <h2>All Orders</h2>
        <p>from any time you placed</p>
      </div>

      {ordersList.length === 0 ? (
        <div className="no-orders-container">
          <FaBoxOpen className="no-orders-icon" />
          <h3>No orders found!</h3>
          <p>You have not placed any orders yet.</p>
          <Link to="/" className="shop-now-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {ordersList.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <span className="order-status-badge">{order.status}</span>
                  <span className="order-date">On {order.date}</span>
                </div>
                <span className="order-id">Order ID: {order.id}</span>
              </div>

              <div className="order-card-body">
                <div className="order-item-info">
                  <div className="order-details-text">
                    <h4>{order.itemTitle}</h4>
                    <p className="order-price">{order.price}</p>
                  </div>
                </div>
                <div className="order-action-link">
                  <span>View Details</span>
                  <FaChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;