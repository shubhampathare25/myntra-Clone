import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice"; // 1. Wishlist actions import kara
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillHeart } from "react-icons/ai"; // 2. AiFillHeart icon import kara

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  // Bag (Cart) state
  const bagItems = useSelector((store) => store.bag);
  const elementFoundInBag = bagItems.indexOf(item.id) >= 0;

  // Wishlist state (navin state Redux madhun)
  const wishlistItems = useSelector((store) => store.wishlist);
  const isWishlisted = wishlistItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  // Wishlist toggle function (Add/Remove logic)
  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(wishlistActions.removeFromWishlist(item.id));
    } else {
      dispatch(wishlistActions.addToWishlist(item.id));
    }
  };

  return (
    <div className="item-container">
      <img className="item-image" src={item.image} alt="item image" />
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

      {/* Add to Bag / Remove Button (Already implemented) */}
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

      {/* Wishlist Button (Screenshot sarakha disnyasathi) */}
      <button
        type="button"
        className="btn"
        onClick={handleToggleWishlist}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "8px 16px",
          // Rang change logic: wishlisted asel tar red, nasel tar white
          backgroundColor: isWishlisted ? "#f15b6c" : "#ffffff",
          color: isWishlisted ? "#ffffff" : "#282c3f",
          border: isWishlisted ? "none" : "1px solid #d4d5d9",
          borderRadius: "4px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <AiFillHeart style={{ color: isWishlisted ? "#ffffff" : "#ff3f6c" }} />
        {isWishlisted ? "Remove Wishlist" : "Wishlist"}
      </button>
    </div>
  );
};

export default HomeItem;
