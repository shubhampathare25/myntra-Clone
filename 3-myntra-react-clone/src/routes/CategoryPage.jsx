import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const items = useSelector((store) => store.items || []);

  const normalizedCategory = categoryName 
    ? categoryName.toLowerCase().replace(/[^a-z0-9]/g, "") 
    : "";

 
  const filteredItems = items.filter((item) => {
    if (!item || !item.category) return false;
    
    const normalizedItemCat = item.category.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    
    return (
      normalizedItemCat === normalizedCategory ||
      normalizedItemCat.includes(normalizedCategory) ||
      normalizedCategory.includes(normalizedItemCat)
    );
  });

  return (
    <main className="category-page-main">
      <div className="category-heading-section" style={{ padding: "20px" }}>
        <h2 className="category-main-title">
          {categoryName ? categoryName.toUpperCase().replace("-", " & ") : ""}&apos;s Collection
        </h2>
        <p className="category-count">{filteredItems.length} products found</p>
      </div>

      <div className="items-container">
        {filteredItems.length === 0 ? (
          <p className="no-products-text" style={{ padding: "20px", textAlign: "center" }}>
            No products found in &quot;{categoryName}&quot; category.
          </p>
        ) : (
          filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
};

export default CategoryPage;