import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const handleMoveToWishlist = () => {
    dispatch(wishlistActions.addToWishlist(item.id));
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-card">
      <button
        type="button"
        className="bag-item-cross-btn"
        onClick={handleRemoveItem}
        title="Remove"
      >
        &#10005;
      </button>

      <div className="bag-item-left">
        <img className="bag-item-img" src={item.image} alt={item.item_name} />
      </div>
      
      <div className="bag-item-right">
        <div>
          <div className="bag-item-company">{item.company}</div>
          <div className="bag-item-title">{item.item_name}</div>
          
          <div className="bag-item-price-box">
            <span className="bag-current-price">Rs {item.current_price * item.quantity}</span>
            <span className="bag-original-price">Rs {item.original_price * item.quantity}</span>
            <span className="bag-discount-tag">({item.discount_percentage}% OFF)</span>
          </div>

          {/* Quantity Controls */}
          <div className="bag-quantity-box">
            <span className="bag-qty-label">Quantity:</span>
            <button 
              className="bag-qty-btn"
              onClick={() => dispatch(bagActions.decrementQuantity(item.id))}
            >
              -
            </button>
            <span className="bag-qty-value">{item.quantity}</span>
            <button 
              className="bag-qty-btn"
              onClick={() => dispatch(bagActions.incrementQuantity(item.id))}
            >
              +
            </button>
          </div>
        </div>

        {/* Action Links */}
        <div className="bag-item-actions">
          <span 
            className="bag-action-wishlist"
            onClick={handleMoveToWishlist} 
          >
            Move to Wishlist
          </span>
        </div>
      </div>
    </div>
  );
};

export default BagItem;