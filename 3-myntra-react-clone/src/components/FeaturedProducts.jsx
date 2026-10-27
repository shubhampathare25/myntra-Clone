import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const items = useSelector((store) => store.items || []);

  const getOneItemPerCategory = (allItems) => {
    const categoriesMap = new Map();
    
    allItems.forEach((item) => {
      if (item.category) {
        const catKey = item.category.toLowerCase().trim();
        
        if (!categoriesMap.has(catKey)) {
          categoriesMap.set(catKey, item);
        }
      }
    });

    return Array.from(categoriesMap.values());
  };

  const featuredItems = getOneItemPerCategory(items);

  return (
    <div className="featured-section-container">
      <div className="featured-header-row">
        <div>
          <span className="featured-tag">MYNTRA SELECTION</span>
          <h2 className="featured-title">Featured products</h2>
          <p className="featured-subtitle">Top-rated favourites from every category.</p>
        </div>
        <Link to="/men" className="view-all-link">
          View all
        </Link>
      </div>

      <div className="featured-items-container">
        {featuredItems.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;