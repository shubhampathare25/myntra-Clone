import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../store/searchSlice";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaUser, FaShieldAlt } from "react-icons/fa";

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
            alt="Myntra Home"
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
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CgProfile style={{ fontSize: "22px" }} />
            <span className="action_name">Login</span>
          </div>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                width: "180px",
                padding: "10px 0",
                zIndex: 1000,
                textAlign: "left",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: "8px 15px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#333",
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                SIGN IN TO MYNTRA-CLONE
              </div>
              <Link
                to="/login?type=user"
                onClick={() => setShowDropdown(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  color: "#282c3f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <FaUser style={{ fontSize: "12px", color: "#535766" }} /> User
                Login
              </Link>

              <Link
                to="/admin/login"
                onClick={() => setShowDropdown(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  color: "#282c3f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <FaShieldAlt style={{ fontSize: "12px", color: "#535766" }} />{" "}
                Admin Login
              </Link>
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
