import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs"; // Icon import kara jar nasel tar

const Header = () => {
  // Bag ani Wishlist che items fetch kara
  const bag = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist); // 1. Wishlist state anli

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
        <div className="action_container">
          <span className="action_name">Profile</span>
        </div>

        {/* Wishlist Link ani Count */}
        <Link
          to="/wishlist"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <span className="action_name">Wishlist</span>
          <span className="count_badge">{wishlist.length}</span>{" "}
          {/* 2. Ithe count disel */}
        </Link>

        {/* Bag Link ani Count */}
        <Link
          to="/bag"
          className="action_container"
          style={{ textDecoration: "none", color: "black" }}
        >
          <span className="action_name">Bag</span>
          <span className="count_badge">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
