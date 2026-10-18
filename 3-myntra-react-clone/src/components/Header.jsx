import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../store/searchSlice";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaBox, FaShieldAlt, FaHeadset, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag || []);
  const wishlist = useSelector((store) => store.wishlist || []);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    dispatch(searchActions.setSearchQuery(e.target.value));
  };

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img
            className="myntra_home"
            src="images/myntra_logo.webp"
            alt="StyleKart Home"
          />
        </Link>
      </div>

      <nav className="nav_bar">
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/home-living">Home & Living</Link>
        <Link to="/beauty">Beauty</Link>
        <Link to="/studio">
          Studio <sup>NEW</sup>
        </Link>
      </nav>

      <div className="search_bar">
        <span className="search_icon material-symbols-outlined">search</span>
        <input
          className="search_input"
          placeholder="Search products, brands and more"
          onChange={handleSearchChange}
        />
      </div>

      {/* Profile/Log in section moved right after Search Bar */}
      <div className="action_bar">
        <div
          className="action_container profile-menu-wrapper"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="profile-trigger">
            <div className="profile-icon-circle">
              <CgProfile className="profile-icon" />
            </div>
            <span className="action_name">Log in</span>
            <FaChevronDown className="chevron-icon" />
          </div>

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="profile-welcome-title">
                Welcome to StyleKart
              </div>
              <p className="profile-welcome-desc">
                Log in to track orders, save favourites and check out faster.
              </p>

              <Link
                to="/login?type=user"
                onClick={() => setShowDropdown(false)}
                className="login-signup-btn"
              >
                Log in or sign up
              </Link>

              <div className="profile-links-group">
                <Link
                  to="/Login"
                  onClick={() => setShowDropdown(false)}
                  className="profile-dropdown-link"
                >
                  <FaBox className="link-icon" /> Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setShowDropdown(false)}
                  className="profile-dropdown-link"
                >
                  <IoHeart className="link-icon" /> Wishlist
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setShowDropdown(false)}
                  className="profile-dropdown-link"
                >
                  <FaHeadset className="link-icon" /> Help and contact
                </Link>

                <div className="admin-link-wrapper">
                  <Link
                    to="/admin/login"
                    onClick={() => setShowDropdown(false)}
                    className="profile-dropdown-link admin-link"
                  >
                    <FaShieldAlt className="link-icon" /> Admin login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link to="/wishlist" className="action_container">
          <IoHeart className="action-icon-svg" />
          <span className="action_name">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="count_badge">{wishlist.length}</span>
          )}
        </Link>

        <Link to="/bag" className="action_container">
          <RiShoppingBagFill className="action-icon-svg" />
          <span className="action_name">Bag</span>
          {bag.length > 0 && <span className="count_badge">{bag.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;