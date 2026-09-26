import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((store) => store.wishlist);
  const items = useSelector((store) => store.items); 

  const wishlistItems = items.filter((item) => wishlistIds.includes(item.id));

  const handleMoveToCart = (itemId) => {
    dispatch(bagActions.addToBag(itemId));
    dispatch(wishlistActions.removeFromWishlist(itemId));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(wishlistActions.removeFromWishlist(itemId));
  };

  return (
    <>
      <main>
        <div
          className="wishlist-page"
          style={{ padding: "40px 20px", minHeight: "400px", maxWidth: "1200px", margin: "0 auto" }}
        >
          <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
            My Wishlist ({wishlistItems.length} items)
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
                <div 
                  key={item.id} 
                  className="item-container"
                  style={{
                    width: "220px",
                    border: "1px solid #eaeaec",
                    borderRadius: "4px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    position: "relative"
                  }}
                >
                  <img 
                    className="item-image" 
                    src={item.image} 
                    alt={item.item_name}
                    style={{ width: "100%", height: "260px", objectFit: "cover" }} 
                  />
                  
                  <div className="company-name" style={{ fontWeight: "bold", fontSize: "14px", marginTop: "10px" }}>
                    {item.company}
                  </div>
                  <div className="item-name" style={{ color: "#535766", fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.item_name}
                  </div>
                  <div className="price" style={{ marginTop: "5px", marginBottom: "10px" }}>
                    <span className="current-price" style={{ fontWeight: "bold", fontSize: "14px" }}>Rs {item.current_price} </span>
                    <span className="original-price" style={{ textDecoration: "line-through", color: "#7e818c", fontSize: "12px", marginLeft: "5px" }}>Rs {item.original_price} </span>
                    <span className="discount" style={{ color: "#ff905a", fontSize: "12px", marginLeft: "5px" }}>({item.discount_percentage}% OFF)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item.id)}
                    style={{
                      width: "100%",
                      backgroundColor: "#03a685",
                      color: "#fff",
                      border: "none",
                      padding: "10px 0",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginBottom: "8px"
                    }}
                  >
                    Move to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff5f7";
                      e.currentTarget.style.borderColor = "#ff3f6c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.borderColor = "#d4d5d9";
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      color: "#ff3f6c",
                      border: "1px solid #d4d5d9",
                      padding: "8px 0",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background-color 0.2s, border-color 0.2s"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Wishlist;