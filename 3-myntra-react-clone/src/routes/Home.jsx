import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";

const Home = () => {
  const items = useSelector((store) => store.items);
  const searchQuery = useSelector((store) => store.search || "");

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.item_name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  return (
    <main>
      <div className="items-container">
        {filteredItems.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "18px",
              color: "#717171",
              padding: "40px",
            }}
          >
            No product found matcing "{searchQuery}"
          </p>
        ) : (
          filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
};

export default Home;
