import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";
import { Link } from "react-router-dom";

const BestDeals = () => {
  const items = useSelector((store) => store.items || []);

  // 1. Highest discount aslele items filter kara (e.g., discount >= 40%)
  const dealItems = items.filter((item) => {
    return item.discount_percentage && item.discount_percentage >= 40;
  });

  // Jar discount field nasel, tar normal items madhun 5 items slice karu shakto:
  const displayDeals = (dealItems.length > 0 ? dealItems : items).slice(0, 5);

  return (
    <div className="featured-section-container">
      <div className="featured-header-row">
        <div>
          <span className="featured-tag">MYNTRA SELECTION</span>
          <h2 className="featured-title">Best deals</h2>
          <p className="featured-subtitle">More style, less spend.</p>
        </div>
        <Link to="/men" className="view-all-link">
          View all
        </Link>
      </div>

      <div className="featured-items-container">
        {displayDeals.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BestDeals;