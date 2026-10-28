import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";
import { Link } from "react-router-dom";

const TrendingProducts = () => {
  const items = useSelector((store) => store.items || []);

  // 1. Beauty category che products filter kele
  const beautyItems = items.filter((item) => {
    return item.category && item.category.toLowerCase().trim() === "beauty";
  });

  // 2. Continuous 5 Beauty items ghetle
  const trendingBeautyItems = beautyItems.slice(0, 4);

  return (
    <div className="featured-section-container">
      <div className="featured-header-row">
        <div>
          <span className="featured-tag">MYNTRA SELECTION</span>
          <h2 className="featured-title">Trending now</h2>
          <p className="featured-subtitle">Styles customers are loving right now.</p>
        </div>
        <Link to="/beauty" className="view-all-link">
          View all
        </Link>
      </div>

      <div className="featured-items-container">
        {trendingBeautyItems.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;