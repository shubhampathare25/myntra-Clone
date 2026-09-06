import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
const Men = () => {
  const items = useSelector((store) => store.items || []);

  console.log("All Store Items");

  const menItems = items.filter(
    (item) => item.category && item.category.toLowerCase() === "men",
  );

  return (
    <main>
      <h2 className="category_heading">Men's Collection</h2>
      <div
        className="items-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {menItems.length > 0 ? (
          menItems.map((item) => <HomeItem key={item.id} item={item} />)
        ) : (
          <h3 style={{ textAlign: "center", width: "100%", margin: "50px" }}>
            No products found for Men!
          </h3>
        )}
      </div>
    </main>
  );
};

export default Men;
