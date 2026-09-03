import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeItem from "../components/HomeItem";
import { DEFAULT_ITEMS } from "../data/items"; // Tumchya project madhe items data kuthun import hoto te check kara

const Wishlist = () => {
  const wishlistIds = useSelector((store) => store.wishlist);
  const items = useSelector((store) => store.items); // Jar items store madhun yet asatil tr

  const wishlistItems = items.filter((item) => wishlistIds.includes(item.id));

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Wishlist;
