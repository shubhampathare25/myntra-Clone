import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer_container">
        
        {/* Column 1: Official Myntra Logo & Bio */}
        <div className="footer_column brand-col">
          <div className="footer-brand-header">
            <img 
              src="images/myntra_logo.webp" 
              alt="Myntra Logo" 
              className="footer-myntra-logo"
            />
            <span className="footer-brand-title">Myntra</span>
          </div>
          <p className="footer-bio">
            Fashion, beauty and everyday essentials in one simple shopping experience.
          </p>
        </div>

        {/* Column 2: SHOP */}
        <div className="footer_column">
          <h3>SHOP</h3>
          <div className="footer-links-list">
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/home-living">Home & Living</Link>
            <Link to="/beauty">Beauty</Link>
          </div>
        </div>

        {/* Column 3: ACCOUNT */}
        <div className="footer_column">
          <h3>ACCOUNT</h3>
          <div className="footer-links-list">
            <Link to="/login">Profile</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/bag">Bag</Link>
          </div>
        </div>

        {/* Column 4: MYNTRA PROMISE */}
        <div className="footer_column">
          <h3>MYNTRA PROMISE</h3>
          <p className="footer-promise-text">
            Secure checkout, clear pricing and a responsive experience across desktop and mobile.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2026 Myntra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;