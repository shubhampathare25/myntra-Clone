import { useState } from "react";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Men = () => {
  const items = useSelector((store) => store.items || []);
  
  // Sagle filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [availability, setAvailability] = useState("All");

  // Pahile category nusar filter kara
  const menItems = items.filter(
    (item) => item.category && item.category.toLowerCase() === "men"
  );

  // Sagle advanced filters apply karne
  const filteredMenItems = menItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = 
      !searchQuery ||
      item.item_name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesCategory = 
      selectedCategory === "All" || 
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesBrand = 
      !selectedBrand || 
      item.company.toLowerCase().includes(selectedBrand.toLowerCase());

    const matchesPrice = 
      item.current_price >= minPrice && item.current_price <= maxPrice;

    const matchesDiscount = 
      (item.discount_percentage || 0) >= minDiscount;

    const matchesRating = 
      (item.rating?.stars || 0) >= minRating;

    const matchesSize = 
      !selectedSize || (item.sizes && item.sizes.includes(selectedSize));

    const matchesColor = 
      !selectedColor || (item.color && item.color.toLowerCase().includes(selectedColor.toLowerCase()));

    const matchesAvailability = 
      availability === "All" || (availability === "In Stock" ? item.inStock : !item.inStock);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesDiscount &&
      matchesRating &&
      matchesSize &&
      matchesColor &&
      matchesAvailability
    );
  });

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Men");
    setSelectedBrand("");
    setMinPrice(0);
    setMaxPrice(5000);
    setMinDiscount(0);
    setMinRating(0);
    setSelectedSize("");
    setSelectedColor("");
    setAvailability("All");
  };

  return (
    <main style={{ padding: "20px" }}>
      <h2 className="category_heading" style={{ marginBottom: "20px" }}>Men's Collection</h2>
      
      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* Left Filter Sidebar */}
        <div style={{ width: "260px", borderRight: "1px solid #eaeaec", paddingRight: "20px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h4 style={{ margin: 0, fontWeight: "bold" }}>Filters</h4>
            <button 
              onClick={clearAllFilters}
              style={{ background: "none", border: "none", color: "#ff3f6c", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}
            >
              Clear all
            </button>
          </div>
          
          {/* Search Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Search</label>
            <input
              type="text"
              placeholder="Name, brand, category.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value="All">All categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Brand</label>
            <input
              type="text"
              placeholder="e.g. Nike, Roadster"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          {/* Price Range Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Max Price: ₹{maxPrice}</label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", marginTop: "5px" }}
            />
          </div>

          {/* Minimum Discount Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Minimum discount</label>
            <select
              value={minDiscount}
              onChange={(e) => setMinDiscount(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value={0}>Any discount</option>
              <option value={10}>10% and above</option>
              <option value={20}>20% and above</option>
              <option value={40}>40% and above</option>
              <option value={50}>50% and above</option>
            </select>
          </div>

          {/* Minimum Rating Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Minimum rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value={0}>Any rating</option>
              <option value={4}>4 Star & above</option>
              <option value={3}>3 Star & above</option>
            </select>
          </div>

          {/* Size Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Size</label>
            <input
              type="text"
              placeholder="e.g. M, L, XL"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          {/* Color Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Color</label>
            <input
              type="text"
              placeholder="e.g. Black, Blue"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          {/* Availability Filter */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value="All">All products</option>
              <option value="In Stock">In stock</option>
            </select>
          </div>

        </div>

        {/* Right Products Listing */}
        <div style={{ flex: 1 }}>
          <div
            className="items-container"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {filteredMenItems.length > 0 ? (
              filteredMenItems.map((item) => <HomeItem key={item.id} item={item} />)
            ) : (
              <h3 style={{ textAlign: "center", width: "100%", margin: "50px", color: "#717171" }}>
                No products found matching your filter!
              </h3>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Men;