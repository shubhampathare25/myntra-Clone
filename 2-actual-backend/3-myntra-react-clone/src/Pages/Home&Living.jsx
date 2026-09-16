import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
const HomeLiving = () => {
  const items = useSelector((store) => store.items || []);

  console.log("All Store Items");

  const HomeLivingItems = items.filter(
    (item) => item.category && item.category.toLowerCase() === "homeliving",
  );

  return (
    <main>
      <h2 className="category_heading">HomeLiving Collection</h2>
      <div
        className="items-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {HomeLivingItems.length > 0 ? (
          HomeLivingItems.map((item) => <HomeItem key={item.id} item={item} />)
        ) : (
          <h3 style={{ textAlign: "center", width: "100%", margin: "50px" }}>
            No products found for HomeLiving!
          </h3>
        )}
      </div>
    </main>
  );
};

export default HomeLiving;
