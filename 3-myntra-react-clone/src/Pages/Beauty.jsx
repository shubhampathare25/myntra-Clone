import { useState } from "react";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Beauty = () => {
  const items = useSelector((store) => store.items || []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [availability, setAvailability] = useState("All");

  const [sortBy, setSortBy] = useState("Recommended");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const filteredBeautyItems = items.filter((item) => {
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
      item.current_price >= minPrice && 
      (maxPrice === "" || item.current_price <= Number(maxPrice));

    const matchesDiscount = 
      (item.discount_percentage || 0) >= minDiscount;

    const matchesRating = 
      (item.rating?.stars || 0) >= minRating;

    const matchesSize = 
      !selectedSize || (item.sizes && item.sizes.includes(selectedSize));

    const matchesColor = 
      !selectedColor || (item.color && item.color.toLowerCase().includes(selectedColor.toLowerCase()));

    const matchesAvailability = 
      availability === "All" || 
      (availability === "In Stock" ? (item.inStock === true || item.inStock === undefined) : item.inStock === false);

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

  const sortedBeautyItems = [...filteredBeautyItems].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return a.current_price - b.current_price;
    } else if (sortBy === "Price: High to Low") {
      return b.current_price - a.current_price;
    } else if (sortBy === "Highest Rated") {
      return (b.rating?.stars || 0) - (a.rating?.stars || 0);
    } else if (sortBy === "Biggest Discount") {
      return (b.discount_percentage || 0) - (a.discount_percentage || 0);
    } else if (sortBy === "Newest") {
      return new Date(b.createdTime || 0) - new Date(a.createdTime || 0);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBeautyItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBeautyItems.length / itemsPerPage);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrand("");
    setMinPrice(0);
    setMaxPrice("");
    setMinDiscount(0);
    setMinRating(0);
    setSelectedSize("");
    setSelectedColor("");
    setAvailability("All");
    setSortBy("Recommended");
    setCurrentPage(1);
  };

  return (
    <main className="catalogue_main">
      <div className="catalogue_header_row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
        <div className="catalogue_header">
          <p className="catalogue_tag">Myntra Catalogue</p>
          <h2 className="category_heading">Beauty Collection</h2>
          <p className="product_count">{filteredBeautyItems.length} products found</p>
        </div>

        <div className="sort_container" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500" }}>
          <label>Sort by </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort_select"
            style={{ padding: "8px 12px", border: "1px solid #d4d5d9", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
          >
            <option value="Recommended">Recommended</option>
            <option value="Newest">Newest</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Highest Rated">Highest Rated</option>
            <option value="Biggest Discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="catalogue_container">
        <div className="filter_sidebar">
          <div className="filter_heading_box">
            <h4 className="filter_title">Filters</h4>
            <button onClick={clearAllFilters} className="clear_filter_btn">
              Clear all
            </button>
          </div>
          
          <div className="filter_group">
            <label className="filter_label">Search</label>
            <input
              type="text"
              placeholder="Name, brand, category.."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="filter_input"
            />
          </div>

          <div className="filter_group">
            <label className="filter_label">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="filter_select"
            >
              <option value="All">All categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="HomeLiving">HomeLiving</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div className="filter_group">
            <label className="filter_label">Brand</label>
            <input
              type="text"
              placeholder="e.g. Lakme, Nykaa"
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              className="filter_input"
            />
          </div>

          <div className="filter_group price_group">
            <div className="price_box">
              <label className="filter_label">Min price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(Number(e.target.value)); setCurrentPage(1); }}
                className="filter_input"
              />
            </div>
            <div className="price_box">
              <label className="filter_label">Max price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)); setCurrentPage(1); }}
                className="filter_input"
              />
            </div>
          </div>

          <div className="filter_group">
            <label className="filter_label">Minimum discount</label>
            <select
              value={minDiscount}
              onChange={(e) => { setMinDiscount(Number(e.target.value)); setCurrentPage(1); }}
              className="filter_select"
            >
              <option value={0}>Any discount</option>
              <option value={10}>10% and above</option>
              <option value={20}>20% and above</option>
              <option value={40}>40% and above</option>
              <option value={50}>50% and above</option>
            </select>
          </div>

          <div className="filter_group">
            <label className="filter_label">Minimum rating</label>
            <select
              value={minRating}
              onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
              className="filter_select"
            >
              <option value={0}>Any rating</option>
              <option value={4}>4 Star & above</option>
              <option value={3}>3 Star & above</option>
              <option value={2}>2 Star & above</option>
            </select>
          </div>

          <div className="filter_group">
            <label className="filter_label">Size</label>
            <input
              type="text"
              placeholder="e.g. 50ml, 100ml"
              value={selectedSize}
              onChange={(e) => { setSelectedSize(e.target.value); setCurrentPage(1); }}
              className="filter_input"
            />
          </div>

          <div className="filter_group">
            <label className="filter_label">Color</label>
            <input
              type="text"
              placeholder="e.g. Red, Pink"
              value={selectedColor}
              onChange={(e) => { setSelectedColor(e.target.value); setCurrentPage(1); }}
              className="filter_input"
            />
          </div>

          <div className="filter_group">
            <label className="filter_label">Availability</label>
            <select
              value={availability}
              onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}
              className="filter_select"
            >
              <option value="All">All products</option>
              <option value="In Stock">In stock</option>
              <option value="Out of stock">Out of stock</option>
            </select>
          </div>
        </div>

        <div className="products_wrapper">
          <div className="items-container">
            {currentItems.length > 0 ? (
              currentItems.map((item) => <HomeItem key={item.id} item={item} />)
            ) : (
              <h3 className="no_products_msg">
                No products found matching your filter!
              </h3>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination_container">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`page_btn ${currentPage === 1 ? "disabled" : ""}`}
              >
                Previous
              </button>

              <span className="page_info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`page_btn ${currentPage === totalPages ? "disabled" : ""}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Beauty;