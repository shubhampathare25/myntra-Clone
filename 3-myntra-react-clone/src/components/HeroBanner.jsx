import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-content">
        <span className="hero-tag">NEW SEASON, NEW YOU</span>
        <h1 className="hero-title">Wear your point of view.</h1>
        <p className="hero-subtitle">
          Considered fashion, beauty, and everyday essentials for every way you show up.
        </p>
        <div className="hero-btn-group">
          <Link to="/categories" className="hero-btn-explore">Explore the edit</Link>
          <Link to="/categories" className="hero-btn-shop">Studio</Link>
        </div>
      </div>
<div className="hero-banner-image">
  <img 
    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
    alt="Hero Banner" 
  />
</div>
    </div>
  );
};

export default HeroBanner;