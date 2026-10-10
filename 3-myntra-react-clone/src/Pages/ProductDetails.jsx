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
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product not found!</h2>;
  }

  const relatedProducts = items.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  return (
    <div className="product_details_container">
      <div className="product_top_section">
        
        {/* Left: Images */}
        <div className="product_image_wrapper">
          <div>
            <img 
              src={product.image.startsWith("http") ? product.image : `/${product.image}`} 
              alt="thumb" 
              className="thumbnail_img" 
            />
          </div>
          <div className="main_img_container">
            <img 
              src={product.image.startsWith("http") ? product.image : `/${product.image}`} 
              alt={product.item_name} 
              className="main_product_img" 
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="product_info_section">
          <h2>{product.company}</h2>
          <p style={{ fontSize: "18px", color: "#535766", margin: 0 }}>{product.item_name}</p>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #eaeaec", paddingBottom: "10px" }}>
            <span style={{ background: "#f5f5f6", padding: "4px 8px", fontWeight: "bold", borderRadius: "4px" }}>
              {product.rating.stars} ⭐
            </span>
            <span style={{ color: "#777" }}>| {product.rating.count} ratings</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>Rs {product.current_price}</span>
            <span style={{ fontSize: "18px", color: "#7e818c", textDecoration: "line-through" }}>Rs {product.original_price}</span>
            <span style={{ fontSize: "18px", color: "#ff905a", fontWeight: "bold" }}>({product.discount_percentage}% OFF)</span>
          </div>

          <p style={{ color: "#03a685", fontWeight: "bold", margin: 0 }}>inclusive of all taxes</p>

          <div>
            <span style={{ color: "#03a685", fontWeight: "bold", fontSize: "15px" }}>In stock</span>
          </div>

          {/* Size Selector */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>Select size</span>
              <span style={{ color: "#ff3f6c", fontSize: "12px", fontWeight: "500" }}>Required</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
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
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                Select color: <span style={{ color: "#777", fontWeight: "normal" }}>{selectedColor}</span>
              </span>
              <span style={{ color: "#ff3f6c", fontSize: "12px", fontWeight: "500" }}>Required</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
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

{/* Quantity & Available in Single Line */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "12px" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Quantity:</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px" }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                style={{ padding: "5px 14px", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
              >
                -
              </button>
              <span style={{ padding: "0 12px", fontWeight: "bold", fontSize: "14px" }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(21, quantity + 1))} 
                style={{ padding: "5px 14px", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
              >
                +
              </button>
            </div>
            <span style={{ color: "#777", fontSize: "13px" }}>21 available</span>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <button className="add_to_cart_btn" onClick={() => dispatch(bagActions.addToBag(product.id))}>
              <GrAddCircle style={{ color: "#fff" }} /> {elementFoundInBag ? "REMOVE FROM BAG" : "ADD TO CART"}
            </button>
            <button className="wishlist_btn" onClick={() => isWishlisted ? dispatch(wishlistActions.removeFromWishlist(product.id)) : dispatch(wishlistActions.addToWishlist(product.id))}>
              {isWishlisted ? <AiFillHeart style={{ color: "#ff3f6c" }} /> : <AiOutlineHeart />} 
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
      <div style={{ marginTop: "40px", borderTop: "1px solid #eaeaec", paddingTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ color: "#ff3f6c", fontSize: "15px", fontWeight: "bold", letterSpacing: "0.5px" }}>
            VERIFIED CUSTOMER FEEDBACK
          </span>
          <h3 style={{ margin: "4px 0 0 0", color: "#282c3f", fontSize: "22px", fontWeight: "bold" }}>Reviews (0)</h3>
          <p style={{ color: "#777", marginTop: "5px" }}>No reviews yet.</p>
        </div>
        <span style={{ color: "#ff3f6c", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
          Log in to review after purchase
        </span>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "40px", borderTop: "1px solid #eaeaec", paddingTop: "30px" }}>
          <span style={{ color: "#ff3f6c", fontSize: "15px", fontWeight: "bold", letterSpacing: "0.5px" }}>
            YOU MAY ALSO LIKE
          </span>                                  
          <h4 style={{ margin: "4px 0 0 0", color: "#282c3f", fontSize: "22px", fontWeight: "bold" }}>Related products</h4>
          <div style={{ display: "flex", gap: "20px", marginTop: "15px", overflowX: "auto", paddingBottom: "10px" }}>
            {relatedProducts.map((item) => {
              const isItemWishlisted = wishlistItems.includes(item.id);
              return (
                <div key={item.id} className="card_container">
                  <div className="card_img_wrapper">
                    <div 
                      className="card_wishlist_icon" 
                      onClick={() => isItemWishlisted ? dispatch(wishlistActions.removeFromWishlist(item.id)) : dispatch(wishlistActions.addToWishlist(item.id))}
                    >
                      {isItemWishlisted ? (
                        <AiFillHeart style={{ fontSize: "18px", color: "#ff3f6c" }} />
                      ) : (
                        <AiOutlineHeart style={{ fontSize: "18px", color: "#282c3f" }} />
                      )}
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image.startsWith("http") ? item.image : `/${item.image}`} alt={item.item_name} className="card_img" />
                    </Link>
                  </div>
                  
                  {item.rating && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", marginTop: "6px" }}>
                      <span style={{ fontWeight: "bold" }}>{item.rating.stars}</span>
                      <span style={{ color: "#149544" }}>⭐</span>
                      <span style={{ color: "#777" }}>| {item.rating.count}</span>
                    </div>
                  )}

                  <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <p style={{ fontWeight: "bold", margin: "4px 0 2px 0", fontSize: "14px" }}>{item.company}</p>
                    <p style={{ color: "#777", fontSize: "12px", margin: "0 0 4px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.item_name}</p>
                    
                    <div className="card_price_section">
                      <span className="card_current_price">Rs {item.current_price}</span>
                      {item.original_price && (
                        <span className="card_original_price">Rs {item.original_price}</span>
                      )}
                      {item.discount_percentage && (
                        <span className="card_discount">({item.discount_percentage}% OFF)</span>
                      )}
                    </div>
                  </Link>

                  <button className="card_btn" onClick={() => dispatch(bagActions.addToBag(item.id))}>
                    <GrAddCircle style={{ color: "#fff", fontSize: "15px" }} /> Add to Bag
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div style={{ marginTop: "50px", borderTop: "1px solid #eaeaec", paddingTop: "30px" }}>
          <span style={{ color: "#ff3f6c", fontSize: "15px", fontWeight: "bold", letterSpacing: "0.5px" }}>
            Continue Exploring
          </span>
          <h4 style={{ margin: "4px 0 0 0", color: "#282c3f", fontSize: "22px", fontWeight: "bold" }}>Recently viewed</h4>
          <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "10px" }}>
            {recentlyViewed.slice(0, 4).map((item) => {
              const isItemWishlisted = wishlistItems.includes(item.id);
              return (
                <div key={item.id} className="card_container">
                  <div className="card_img_wrapper">
                    <div 
                      className="card_wishlist_icon" 
                      onClick={() => isItemWishlisted ? dispatch(wishlistActions.removeFromWishlist(item.id)) : dispatch(wishlistActions.addToWishlist(item.id))}
                    >
                      {isItemWishlisted ? (
                        <AiFillHeart style={{ fontSize: "18px", color: "#ff3f6c" }} />
                      ) : (
                        <AiOutlineHeart style={{ fontSize: "18px", color: "#282c3f" }} />
                      )}
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image.startsWith("http") ? item.image : `/${item.image}`} alt={item.item_name} className="card_img" />
                    </Link>
                  </div>
                  
                  {item.rating && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", marginTop: "6px" }}>
                      <span style={{ fontWeight: "bold" }}>{item.rating.stars}</span>
                      <span style={{ color: "#149544" }}>⭐</span>
                      <span style={{ color: "#777" }}>| {item.rating.count}</span>
                    </div>
                  )}

                  <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <p style={{ fontWeight: "bold", margin: "4px 0 2px 0", fontSize: "14px" }}>{item.company}</p>
                    <p style={{ color: "#777", fontSize: "12px", margin: "0 0 4px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.item_name}</p>
                    
                    <div className="card_price_section">
                      <span className="card_current_price">Rs {item.current_price}</span>
                      {item.original_price && (
                        <span className="card_original_price">Rs {item.original_price}</span>
                      )}
                      {item.discount_percentage && (
                        <span className="card_discount">({item.discount_percentage}% OFF)</span>
                      )}
                    </div>
                  </Link>

                  <button className="card_btn" onClick={() => dispatch(bagActions.addToBag(item.id))}>
                    <GrAddCircle style={{ color: "#fff", fontSize: "15px" }} /> Add to Bag
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