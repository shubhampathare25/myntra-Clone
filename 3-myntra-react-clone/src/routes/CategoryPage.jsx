import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const CategoryPage = () => {
  const { categoryName } = useParams(); // URL madhun category state bhetel
  const items = useSelector((store) => store.items);

  // Filter items matching the category name (case-insensitive)
  const filteredItems = items.filter(
    (item) => item.category && item.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <main>
      <div className="items-container">
        {filteredItems.length === 0 ? (
          <p className="no-products-text">
            No products found in "{categoryName}" category.
          </p>
        ) : (
          filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
};

export default CategoryPage;