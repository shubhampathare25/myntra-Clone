import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Wishlist = () => {
  const wishlistIds = useSelector((store) => store.wishlist);
  const items = useSelector((store) => store.items); // Redux store madhun items get karat ahot

  const wishlistItems = items.filter((item) => wishlistIds.includes(item.id));

  return (
    <>
      <main>
        <div
          className="wishlist-page"
          style={{ padding: "40px 20px", minHeight: "400px" }}
        >
          <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
            My Wishlist ({wishlistItems.length})
          </h2>

          {wishlistItems.length === 0 ? (
            <p style={{ fontSize: "18px", color: "#717171" }}>
              Your Wishlist is empty!
            </p>
          ) : (
            <div
              className="items-container"
              style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
            >
              {wishlistItems.map((item) => (
                <HomeItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Wishlist;
