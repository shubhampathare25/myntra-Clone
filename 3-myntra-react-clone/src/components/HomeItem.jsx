import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice"; 
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai"; 
import { Link } from "react-router-dom"; 

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

  // Image path la root pasun load karnyasathi leading '/' ensure करतो
  const imagePath = item.image.startsWith('/') ? item.image : `/${item.image}`;

  return (
    <div className="item-container">
      <div className="item-image-wrapper">
        <Link to={`/product/${item.id}`}>
          <img 
            className="item-image" 
            src={imagePath} 
            alt={item.item_name} 
          />
        </Link>
        
        <div className="item-wishlist-icon" onClick={handleToggleWishlist}>
          {isWishlisted ? (
            <AiFillHeart className="wishlist-icon-filled" />
          ) : (
            <AiOutlineHeart className="wishlist-icon-outline" />
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