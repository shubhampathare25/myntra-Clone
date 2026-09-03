import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice"; // Wishlist action import keli
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Heart icons import kele

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  // Bag state
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;

  // Wishlist state (Wishlist store madhun data ghenyasathi)
  const wishlistItems = useSelector((store) => store.wishlist);
  const isWishlisted = wishlistItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  // Wishlist toggle function
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

      {/* Add to Bag / Remove Button */}
      {elementFound ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemove}
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

      {/* Wishlist Button (Add to Bag chya exactly khali) */}
      <button
        type="button"
        className="btn btn-wishlist"
        onClick={handleToggleWishlist}
        style={{
          marginTop: "8px",
          backgroundColor: "white",
          border: "1px solid #d4d5d9",
          color: "#282c3f",
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        {isWishlisted ? (
          <>
            <AiFillHeart style={{ color: "#ff3f6c", fontSize: "18px" }} />{" "}
            Wishlisted
          </>
        ) : (
          <>
            <AiOutlineHeart style={{ fontSize: "18px" }} /> Wishlist
          </>
        )}
      </button>
    </div>
  );
};

export default HomeItem;
