import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";
import { Link } from "react-router-dom";

const RecentlyAdded = () => {
  const items = useSelector((store) => store.items || []);

  const recentItems = items.slice(-5).reverse();

  return (
    <div className="featured-section-container">
      <div className="featured-header-row">
        <div>
          <span className="featured-tag">MYNTRA SELECTION</span>
          <h2 className="featured-title">Recently added</h2>
          <p className="featured-subtitle">The latest additions to the StyleKart catalogue.</p>
        </div>
        <Link to="/men" className="view-all-link">
          View all
        </Link>
      </div>

      <div className="featured-items-container">
        {recentItems.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;