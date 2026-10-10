import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const items = useSelector((store) => store.items || []);
  const product = items.find((item) => String(item.id) === String(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(21);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const bagItems = useSelector((store) => store.bag);
  const elementFoundInBag = product ? bagItems.indexOf(product.id) >= 0 : false;

  const wishlistItems = useSelector((store) => store.wishlist);
  const isWishlisted = product ? wishlistItems.indexOf(product.id) >= 0 : false;

  useEffect(() => {
    if (product) {
      let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      viewed = viewed.filter((item) => String(item.id) !== String(product.id));
      viewed.unshift(product);
      if (viewed.length > 5) viewed.pop();
      localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
      setRecentlyViewed(viewed);
    }
  }, [product]);

  if (!product) {
    return <h2 className="product_not_found">Product not found!</h2>;
  }

  const relatedProducts = items
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <div className="product_details_container">
      <div className="product_top_section">
        
        {/* Left: Images */}
        <div className="product_image_wrapper">
          <div>
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `/${product.image}`
              }
              alt="thumb"
              className="thumbnail_img"
            />
          </div>
          <div className="main_img_container">
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `/${product.image}`
              }
              alt={product.item_name}
              className="main_product_img"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="product_info_section">
          <h2>{product.company}</h2>
          <p className="product_item_name_text">{product.item_name}</p>

          <div className="product_rating_row">
            <span className="product_rating_badge">
              {product.rating.stars} ⭐
            </span>
            <span className="product_rating_count">
              | {product.rating.count} ratings
            </span>
          </div>

          <div className="product_price_row">
            <span className="product_current_price_text">
              Rs {product.current_price}
            </span>
            <span className="product_original_price_text">
              Rs {product.original_price}
            </span>
            <span className="product_discount_text">
              ({product.discount_percentage}% OFF)
            </span>
          </div>

          <div className="product_stock_row">
            <span className="product_stock_text">In stock</span>
          </div>

          {/* Size Selector */}
          <div className="product_selector_block">
            <div className="selector_header">
              <span className="selector_title">Select size</span>
              <span className="selector_required">Required</span>
            </div>
            <div className="selector_options_row">
              {["7", "8", "9", "10"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size_btn ${selectedSize === size ? "active" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="product_selector_block">
            <div className="selector_header">
              <span className="selector_title">
                Select color: <span className="selected_color_span">{selectedColor}</span>
              </span>
              <span className="selector_required">Required</span>
            </div>
            <div className="selector_options_row">
              {["Black", "Grey"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`color_btn ${selectedColor === color ? "active" : ""}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Available */}
          <div className="quantity_section_wrapper">
            <div className="quantity_header_row">
              <span className="quantity_label_text">Quantity:</span>
              <span className="available_count_text">21 available</span>
            </div>
            <div className="quantity_box_control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty_btn"
              >
                -
              </button>
              <span className="qty_number_display">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(21, quantity + 1))}
                className="qty_btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="product_action_buttons_row">
            <button
              className="add_to_cart_btn"
              onClick={() => dispatch(bagActions.addToBag(product.id))}
            >
              <GrAddCircle className="btn_icon_white" />{" "}
              {elementFoundInBag ? "REMOVE FROM BAG" : "ADD TO CART"}
            </button>
            <button
              className="wishlist_btn"
              onClick={() =>
                isWishlisted
                  ? dispatch(wishlistActions.removeFromWishlist(product.id))
                  : dispatch(wishlistActions.addToWishlist(product.id))
              }
            >
              {isWishlisted ? (
                <AiFillHeart className="wishlist_icon_active" />
              ) : (
                <AiOutlineHeart />
              )}
              {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
            </button>
          </div>

          {/* Product Information Box */}
          <div className="product_info_box_card">
            <p className="product_info_title">Product information</p>
            <p className="product_info_item">Category: {product.category}</p>
            <p className="product_info_item">Return policy: 14 day returns</p>
            <p className="product_info_item">Delivery: 13 Oct 2026</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews_section_wrapper">
        <div>
          <span className="section_tag_title">
            VERIFIED CUSTOMER FEEDBACK
          </span>
          <h3 className="section_main_heading">
            Reviews (0)
          </h3>
          <p className="no_reviews_text">No reviews yet.</p>
        </div>
        <span className="review_login_prompt">
          Log in to review after purchase
        </span>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related_products_section">
          <span className="section_tag_title">
            YOU MAY ALSO LIKE
          </span>
          <h4 className="section_main_heading">
            Related products
          </h4>
          <div className="scrollable_cards_container">
            {relatedProducts.map((item) => {
              const isItemWishlisted = wishlistItems.includes(item.id);
              return (
                <div key={item.id} className="card_container">
                  <div className="card_img_wrapper">
                    <div
                      className="card_wishlist_icon"
                      onClick={() =>
                        isItemWishlisted
                          ? dispatch(
                              wishlistActions.removeFromWishlist(item.id),
                            )
                          : dispatch(wishlistActions.addToWishlist(item.id))
                      }
                    >
                      {isItemWishlisted ? (
                        <AiFillHeart className="card_heart_filled" />
                      ) : (
                        <AiOutlineHeart className="card_heart_outline" />
                      )}
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `/${item.image}`
                        }
                        alt={item.item_name}
                        className="card_img"
                      />
                    </Link>
                  </div>

                  {item.rating && (
                    <div className="card_rating_row">
                      <span className="card_rating_stars">
                        {item.rating.stars}
                      </span>
                      <span className="card_rating_star_icon">⭐</span>
                      <span className="card_rating_count_text">
                        | {item.rating.count}
                      </span>
                    </div>
                  )}

                  <Link
                    to={`/product/${item.id}`}
                    className="card_link_wrapper"
                  >
                    <p className="card_company_title">{item.company}</p>
                    <p className="card_item_subtitle">{item.item_name}</p>

                    <div className="card_price_section">
                      <span className="card_current_price">
                        Rs {item.current_price}
                      </span>
                      {item.original_price && (
                        <span className="card_original_price">
                          Rs {item.original_price}
                        </span>
                      )}
                      {item.discount_percentage && (
                        <span className="card_discount">
                          ({item.discount_percentage}% OFF)
                        </span>
                      )}
                    </div>
                  </Link>

                  <button
                    className="card_btn"
                    onClick={() => dispatch(bagActions.addToBag(item.id))}
                  >
                    <GrAddCircle className="card_btn_icon" /> Add to Bag
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div className="recently_viewed_section">
          <span className="section_tag_title">
            Continue Exploring
          </span>
          <h4 className="section_main_heading">
            Recently viewed
          </h4>
          <div className="scrollable_cards_container">
            {recentlyViewed.slice(0, 4).map((item) => {
              const isItemWishlisted = wishlistItems.includes(item.id);
              return (
                <div key={item.id} className="card_container">
                  <div className="card_img_wrapper">
                    <div
                      className="card_wishlist_icon"
                      onClick={() =>
                        isItemWishlisted
                          ? dispatch(
                              wishlistActions.removeFromWishlist(item.id),
                            )
                          : dispatch(wishlistActions.addToWishlist(item.id))
                      }
                    >
                      {isItemWishlisted ? (
                        <AiFillHeart className="card_heart_filled" />
                      ) : (
                        <AiOutlineHeart className="card_heart_outline" />
                      )}
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `/${item.image}`
                        }
                        alt={item.item_name}
                        className="card_img"
                      />
                    </Link>
                  </div>

                  {item.rating && (
                    <div className="card_rating_row">
                      <span className="card_rating_stars">
                        {item.rating.stars}
                      </span>
                      <span className="card_rating_star_icon">⭐</span>
                      <span className="card_rating_count_text">
                        | {item.rating.count}
                      </span>
                    </div>
                  )}

                  <Link
                    to={`/product/${item.id}`}
                    className="card_link_wrapper"
                  >
                    <p className="card_company_title">{item.company}</p>
                    <p className="card_item_subtitle">{item.item_name}</p>

                    <div className="card_price_section">
                      <span className="card_current_price">
                        Rs {item.current_price}
                      </span>
                      {item.original_price && (
                        <span className="card_original_price">
                          Rs {item.original_price}
                        </span>
                      )}
                      {item.discount_percentage && (
                        <span className="card_discount">
                          ({item.discount_percentage}% OFF)
                        </span>
                      )}
                    </div>
                  </Link>

                  <button
                    className="card_btn"
                    onClick={() => dispatch(bagActions.addToBag(item.id))}
                  >
                    <GrAddCircle className="card_btn_icon" /> Add to Bag
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;