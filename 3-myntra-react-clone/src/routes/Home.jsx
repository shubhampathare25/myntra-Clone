import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
import HomeCategory from "../components/HomeCategory";

const Home = () => {
  const items = useSelector((store) => store.items);
  const searchQuery = useSelector((store) => store.search || "");

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.item_name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

  return (
    <main>
      {/* Search active nasel tevha fukt Shop by Category section disel */}
      {!searchQuery && <HomeCategory />}

      {/* Featured Products / Filtered Items Grid */}
      <div className="items-container">
        {filteredItems.length === 0 ? (
          <p className="no-products-text">
            No product found matching "{searchQuery}"
          </p>
        ) : (
          filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
};

export default Home;