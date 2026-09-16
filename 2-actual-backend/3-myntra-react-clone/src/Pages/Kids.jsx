import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const kids = () => {
  const items = useSelector((store) => store.items);

  console.log("All Store Items");

  const kidsItems = items.filter(
    (item) => item.category?.toLowerCase() === "kids",
  );

  return (
    <main>
      <h2 className="category_heading">Kids Collection</h2>

      <div className="items-container">
        {kidsItems.length === 0 ? (
          <h2>No Products Found</h2>
        ) : (
          kidsItems.map((item) => <HomeItem key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
};

export default kids;
