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
          placeholder="Search products...."
          onChange={handleSearchChange}
        />
      </div>

      <div className="action_bar">
        <div
          className="action_container"
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CgProfile style={{ fontSize: "20px" }} />
            <span className="action_name" style={{ fontWeight: "600" }}>Log in</span>
            <FaChevronDown style={{ fontSize: "10px", marginTop: "2px" }} />
          </div>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "8px",
                width: "240px",
                padding: "16px",
                zIndex: 1000,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#282c3f",
                  marginBottom: "4px",
                }}
              >
                Welcome to StyleKart
              </div>
              <p style={{ fontSize: "12px", color: "#696e79", margin: "0 0 14px 0", lineHeight: "1.4" }}>
                Log in to track orders, save favourites and check out faster.
              </p>

              <Link
                to="/login?type=user"
                onClick={() => setShowDropdown(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#141b2d",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "13px",
                  marginBottom: "12px",
                }}
              >
                Log in or sign up
              </Link>

              <div style={{ borderTop: "1px solid #eaeaec", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <Link
                  to="/orders"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 4px",
                    color: "#282c3f",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  <FaBox style={{ fontSize: "13px", color: "#535766" }} /> Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 4px",
                    color: "#282c3f",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  <IoHeart style={{ fontSize: "14px", color: "#535766" }} /> Wishlist
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 4px",
                    color: "#282c3f",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  <FaHeadset style={{ fontSize: "13px", color: "#535766" }} /> Help and contact
                </Link>

                <div style={{ borderTop: "1px solid #eaeaec", marginTop: "4px", paddingTop: "4px" }}>
                  <Link
                    to="/admin/login"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px 4px",
                      color: "#282c3f",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    <FaShieldAlt style={{ fontSize: "13px", color: "#535766" }} /> Admin login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/wishlist"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <IoHeart style={{ fontSize: "22px" }} />
          <span className="action_name">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="count_badge">{wishlist.length}</span>
          )}
        </Link>

        <Link
          to="/bag"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <RiShoppingBagFill style={{ fontSize: "20px" }} />
          <span className="action_name">Bag</span>
          {bag.length > 0 && <span className="count_badge">{bag.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;