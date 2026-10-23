import { Link } from "react-router-dom";

const HomeCategory = () => {
  const categories = [
    {
      id: "men",
      title: "Men",
      subtitle: "Everyday essentials and standout styles",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=600",
      path: "/category/men"
    },
    {
      id: "women",
      title: "Women",
      subtitle: "Fresh fashion for every moment",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
      path: "/category/women"
    },
    {
      id: "kids",
      title: "Kids",
      subtitle: "Big style for little trendsetters",
      image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=600",
      path: "/category/kids"
    },
    {
      id: "beauty",
      title: "Beauty",
      subtitle: "Beauty picks made for you",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600",
      path: "/category/beauty"
    },
    {
      id: "home-living",
      title: "Home & Living",
      subtitle: "Elevate your living spaces",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600",
      path: "/category/home-living"
    }
  ];

  return (
    <div className="shop-by-category-container">
      <div className="category-header">
        <span className="category-tagline">FIND YOUR STYLE</span>
        <h2 className="category-title">Shop by category</h2>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.id} className="category-card">
            <img src={cat.image} alt={cat.title} className="category-card-img" />
            <div className="category-card-overlay">
              <h3 className="category-card-title">{cat.title}</h3>
              <p className="category-card-subtitle">{cat.subtitle}</p>
              <span className="category-shop-now">SHOP NOW</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;