import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";     // Solid Profile Icon
import { IoHeart } from "react-icons/io5";       // Solid Wishlist Heart Icon
import { RiShoppingBagFill } from "react-icons/ri"; // Solid Bag Icon

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist);

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
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>NEW</sup>
        </a>
      </nav>
      <div className="search_bar">
        <span className="search_icon material-symbols-outlined">search</span>
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div className="action_bar">
        
        {/* Profile Link & Solid Icon */}
        <div className="action_container" style={{ cursor: "pointer" }}>
          <CgProfile style={{ fontSize: "22px" }} />
          <span className="action_name">Profile</span>
        </div>

        {/* Wishlist Link, Solid Heart Icon & Count */}
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

        {/* Bag Link, Solid Bag Icon & Count */}
        <Link
          to="/bag"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <RiShoppingBagFill style={{ fontSize: "20px" }} />
          <span className="action_name">Bag</span>
          {bag.length > 0 && (
            <span className="count_badge">{bag.length}</span>
          )}
        </Link>

      </div>
    </header>
  );
};

export default Header;