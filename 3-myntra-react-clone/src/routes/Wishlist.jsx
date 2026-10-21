import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((store) => store.wishlist);
  const items = useSelector((store) => store.items); 

  const wishlistItems = items.filter((item) => wishlistIds.includes(item.id));

  const handleMoveToBag = (itemId) => {
    dispatch(bagActions.addToBag(itemId));
    dispatch(wishlistActions.removeFromWishlist(itemId));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(wishlistActions.removeFromWishlist(itemId));
  };

  return (
    <>
      <main>
        <div className="wishlist-page">
          <h2 className="wishlist-page-heading">
            My Wishlist ({wishlistItems.length} items)
          </h2>

          {wishlistItems.length === 0 ? (
            <p className="wishlist-empty-text">
              Your Wishlist is empty!
            </p>
          ) : (
            <div className="wishlist-items-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-card">
                  {/* Top Right Cross / Remove Icon Button */}
                  <button
                    type="button"
                    className="wishlist-cross-remove-btn"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title="Remove"
                  >
                    &#10005;
                  </button>

                  <img 
                    className="wishlist-card-image" 
                    src={item.image} 
                    alt={item.item_name}
                  />
                  
                  <div className="wishlist-card-details">
                    <div className="wishlist-company-title">
                      {item.company}
                    </div>
                    <div className="wishlist-item-desc">
                      {item.item_name}
                    </div>
                    <div className="wishlist-price-box">
                      <span className="wishlist-current-price">Rs {item.current_price} </span>
                      <span className="wishlist-original-price">Rs {item.original_price} </span>
                      <span className="wishlist-discount-tag">({item.discount_percentage}% OFF)</span>
                    </div>
                  </div>

                  {/* Myntra Styled MOVE TO BAG Button */}
                  <button
                    type="button"
                    className="wishlist-move-to-bag-btn"
                    onClick={() => handleMoveToBag(item.id)}
                  >
                    MOVE TO BAG
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