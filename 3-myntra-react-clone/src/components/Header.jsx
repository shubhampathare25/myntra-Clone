import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../store/searchSlice";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { RiShoppingBagFill } from "react-icons/ri";

const Header = () => {
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag || []);
  const wishlist = useSelector((store) => store.wishlist || []);

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
        {}
        <Link
          to="/"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <CgProfile style={{ fontSize: "22px" }} />
          <span className="action_name">Profile</span>
        </Link>

        {}
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

        {}
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
