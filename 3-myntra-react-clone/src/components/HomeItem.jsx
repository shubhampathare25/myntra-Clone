import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice"; 
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai"; 

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  const bagItems = useSelector((store) => store.bag);
  const elementFoundInBag = bagItems.indexOf(item.id) >= 0;

  const wishlistItems = useSelector((store) => store.wishlist);
  const isWishlisted = wishlistItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(wishlistActions.removeFromWishlist(item.id));
    } else {
      dispatch(wishlistActions.addToWishlist(item.id));
    }
  };

  return (
    <div className="item-container">
      <div style={{ position: "relative", width: "100%" }}>
        <img className="item-image" src={item.image} alt="item image" style={{ width: "100%", display: "block" }} />
        
        <div 
          onClick={handleToggleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          {isWishlisted ? (
            <AiFillHeart style={{ fontSize: "18px", color: "#ff3f6c" }} />
          ) : (
            <AiOutlineHeart style={{ fontSize: "18px", color: "#282c3f" }} />
          )}
        </div>
      </div>

      <div className="rating">
        {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
        <span className="current-price">Rs {item.current_price}</span>
        <span className="original-price">Rs {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>

      {elementFoundInBag ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemoveFromBag}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default HomeItem;