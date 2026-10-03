import { useState } from "react";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Men = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const filteredMenItems = items.filter((item) => {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenItems.length / itemsPerPage);

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
    setCurrentPage(1);
  };

  return (
    <main style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ff3f6c", letterSpacing: "1px", marginBottom: "5px", textTransform: "uppercase" }}>
          Myntra Catalogue
        </p>
        <h2 className="category_heading" style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#282c3f" }}>
          Men's Collection
        </h2>
        <p style={{ fontSize: "14px", color: "#535766", marginTop: "5px" }}>
          {filteredMenItems.length} products found
        </p>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
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
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Search</label>
            <input
              type="text"
              placeholder="Name, brand, category.."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value="All">All categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="HomeLiving">HomeLiving</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Brand</label>
            <input
              type="text"
              placeholder="e.g. Nike, Roadster"
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Min price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(Number(e.target.value)); setCurrentPage(1); }}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Max price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)); setCurrentPage(1); }}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Minimum discount</label>
            <select
              value={minDiscount}
              onChange={(e) => { setMinDiscount(Number(e.target.value)); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value={0}>Any discount</option>
              <option value={10}>10% and above</option>
              <option value={20}>20% and above</option>
              <option value={40}>40% and above</option>
              <option value={50}>50% and above</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Minimum rating</label>
            <select
              value={minRating}
              onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value={0}>Any rating</option>
              <option value={4}>4 Star & above</option>
              <option value={3}>3 Star & above</option>
              <option value={2}>2 Star & above</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Size</label>
            <input
              type="text"
              placeholder="e.g. M, L, XL"
              value={selectedSize}
              onChange={(e) => { setSelectedSize(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Color</label>
            <input
              type="text"
              placeholder="e.g. Black, Blue"
              value={selectedColor}
              onChange={(e) => { setSelectedColor(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "13px", fontWeight: "bold", color: "#282c3f" }}>Availability</label>
            <select
              value={availability}
              onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #d4d5d9", fontSize: "14px", background: "white" }}
            >
              <option value="All">All products</option>
              <option value="In Stock">In stock</option>
              <option value="Out of stock">Out of stock</option>
            </select>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div
            className="items-container"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {currentItems.length > 0 ? (
              currentItems.map((item) => <HomeItem key={item.id} item={item} />)
            ) : (
              <h3 style={{ textAlign: "center", width: "100%", margin: "50px", color: "#717171" }}>
                No products found matching your filter!
              </h3>
            )}
          </div>

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "40px", marginBottom: "20px" }}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid #d4d5d9",
                  background: currentPage === 1 ? "#f5f5f6" : "white",
                  color: currentPage === 1 ? "#94969f" : "#282c3f",
                  fontWeight: "bold",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>

              <span style={{ fontSize: "14px", fontWeight: "600", color: "#282c3f" }}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid #d4d5d9",
                  background: currentPage === totalPages ? "#f5f5f6" : "white",
                  color: currentPage === totalPages ? "#94969f" : "#282c3f",
                  fontWeight: "bold",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
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

export default Men;