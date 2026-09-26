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
    <div className="bag-item-container" style={{ display: "flex", padding: "15px", border: "1px solid #eaeaec", backgroundColor: "#fff", marginBottom: "15px", borderRadius: "4px" }}>
      <div className="item-left-part">
        <img className="bag-item-img" src={item.image} alt={item.item_name} style={{ width: "110px", height: "148px", objectFit: "cover" }} />
      </div>
      
      <div className="item-right-part" style={{ paddingLeft: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div className="company" style={{ fontWeight: "bold", fontSize: "14px" }}>{item.company}</div>
          <div className="item-name" style={{ color: "#535766", fontSize: "14px", marginBottom: "6px" }}>{item.item_name}</div>
          
          <div className="price-container" style={{ marginBottom: "8px" }}>
            <span className="current-price" style={{ fontWeight: "bold", fontSize: "14px" }}>Rs {item.current_price * item.quantity}</span>
            <span className="original-price" style={{ textDecoration: "line-through", color: "#7e818c", fontSize: "12px", marginLeft: "5px" }}>Rs {item.original_price * item.quantity}</span>
            <span className="discount-percentage" style={{ color: "#ff905a", fontSize: "12px", marginLeft: "5px" }}>({item.discount_percentage}% OFF)</span>
          </div>

          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0", fontSize: "14px" }}>
            <span style={{ color: "#535766", fontSize: "13px" }}>Quantity:</span>
            <button 
              onClick={() => dispatch(bagActions.decrementQuantity(item.id))}
              style={{ border: "1px solid #d4d5d9", background: "#fff", width: "22px", height: "22px", cursor: "pointer", borderRadius: "2px", fontWeight: "bold" }}
            >
              -
            </button>
            <span style={{ fontWeight: "bold", padding: "0 4px" }}>{item.quantity}</span>
            <button 
              onClick={() => dispatch(bagActions.incrementQuantity(item.id))}
              style={{ border: "1px solid #d4d5d9", background: "#fff", width: "22px", height: "22px", cursor: "pointer", borderRadius: "2px", fontWeight: "bold" }}
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", fontSize: "13px", fontWeight: "bold", marginTop: "10px" }}>
          <span 
            onClick={handleMoveToWishlist} 
            style={{ color: "#282c3f", cursor: "pointer" }}
            onMouseEnter={(e) => e.target.style.color = "#ff3f6c"}
            onMouseLeave={(e) => e.target.style.color = "#282c3f"}
          >
            Move to Wishlist
          </span>
          <span style={{ color: "#d4d5d9" }}>|</span>
          <span 
            onClick={handleRemoveItem} 
            style={{ color: "#ff3f6c", cursor: "pointer" }}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default BagItem;