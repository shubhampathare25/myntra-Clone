import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const items = useSelector((store) => store.items || []);
  const product = items.find((item) => String(item.id) === String(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
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
      
      if (viewed.length > 5) {
        viewed.pop();
      }

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

  const handleAddToCart = () => {
    dispatch(bagActions.addToBag(product.id));
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(wishlistActions.removeFromWishlist(product.id));
    } else {
      dispatch(wishlistActions.addToWishlist(product.id));
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      
      <div style={{ display: "flex", gap: "40px" }}>
        
        <div style={{ display: "flex", gap: "15px", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <img 
              src={product.image.startsWith("http") ? product.image : `/${product.image}`} 
              alt="thumb" 
              style={{ width: "70px", height: "90px", objectFit: "cover", borderRadius: "4px", border: "2px solid #ff3f6c", cursor: "pointer" }} 
            />
          </div>
          <div style={{ position: "relative", flex: 1 }}>
            <img 
              src={product.image.startsWith("http") ? product.image : `/${product.image}`} 
              alt={product.item_name} 
              style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} 
            />
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{product.company}</h2>
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
            <span style={{ float: "right", color: "#777", fontSize: "13px" }}>21 available</span>
          </div>

          <div style={{ marginTop: "5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>SELECT SIZE <span style={{ color: "#ff3f6c", fontSize: "12px", fontWeight: "normal" }}>Required</span></span>
              <span style={{ color: "#ff3f6c", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>SIZE CHART</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              {["7", "8", "9", "10"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "45px", height: "45px", borderRadius: "50%", 
                    border: selectedSize === size ? "2px solid #ff3f6c" : "1px solid #ccc",
                    background: "#fff", color: selectedSize === size ? "#ff3f6c" : "#000",
                    fontWeight: "bold", cursor: "pointer"
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "5px" }}>
            <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "8px" }}>
              SELECT COLOR: <span style={{ color: "#777" }}>{selectedColor}</span> 
              <span style={{ color: "#ff3f6c", fontSize: "12px", fontWeight: "normal", float: "right" }}>Required</span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["Black", "Grey"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: "6px 15px", borderRadius: "4px", 
                    border: selectedColor === color ? "2px solid #ff3f6c" : "1px solid #ccc",
                    background: "#fff", cursor: "pointer"
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Quantity:</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px" }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
              >-</button>
              <span style={{ padding: "0 10px", fontWeight: "bold" }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
              >+</button>
            </div>
          </div>

          <div style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
            <button
              style={{ flex: 1, padding: "14px", fontWeight: "bold", background: "#ff3f6c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              onClick={handleAddToCart}
            >
              <GrAddCircle style={{ color: "#fff" }} /> {elementFoundInBag ? "REMOVE FROM BAG" : "ADD TO CART"}
            </button>
            <button
              style={{ flex: 1, padding: "14px", fontWeight: "bold", background: "#fff", color: "#282c3f", border: "1px solid #d4d5d9", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              onClick={handleWishlistToggle}
            >
              {isWishlisted ? <AiFillHeart style={{ color: "#ff3f6c" }} /> : <AiOutlineHeart />} 
              {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
            </button>
          </div>

          <div style={{ marginTop: "15px", borderTop: "1px solid #eaeaec", paddingTop: "15px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Product Information</p>
            <p style={{ color: "#535766", margin: "0 0 5px 0" }}>Category: {product.category}</p>
            <p style={{ color: "#535766", margin: "0 0 5px 0" }}>📦 Return policy: 14 days returnable</p>
            <p style={{ color: "#535766", margin: 0 }}>🚚 Delivery: Expected by 13 Oct 2026</p>
          </div>

        </div>
      </div>

      {recentlyViewed.length > 0 && (
        <div style={{ marginTop: "50px", borderTop: "1px solid #eaeaec", paddingTop: "30px" }}>
          <h3>CONTINUE EXPLORING</h3>
          <h4 style={{ color: "#282c3f", marginBottom: "15px" }}>Recently viewed</h4>
          <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
            {recentlyViewed.map((item) => (
              <div key={item.id} style={{ minWidth: "180px", border: "1px solid #eaeaec", borderRadius: "6px", padding: "10px" }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={item.image.startsWith("http") ? item.image : `/${item.image}`} alt={item.item_name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "4px" }} />
                  <p style={{ fontWeight: "bold", margin: "8px 0 4px 0", fontSize: "13px" }}>{item.company}</p>
                  <p style={{ color: "#777", fontSize: "11px", margin: "0 0 4px 0" }}>{item.item_name}</p>
                  <p style={{ fontWeight: "bold", fontSize: "13px", margin: 0 }}>Rs {item.current_price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px", borderTop: "1px solid #eaeaec", paddingTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3>RATINGS & REVIEWS (0)</h3>
          <p style={{ color: "#777", marginTop: "5px" }}>No reviews yet.</p>
        </div>
        <span style={{ color: "#ff3f6c", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
          Log in to review after purchase
        </span>
      </div>
      
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "40px", borderTop: "1px solid #eaeaec", paddingTop: "30px" }}>
          <h3>YOU MAY ALSO LIKE</h3>
          <h4 style={{ color: "#777", marginBottom: "15px", fontWeight: "normal" }}>Related products</h4>
          <div style={{ display: "flex", gap: "20px", marginTop: "15px", overflowX: "auto" }}>
            {relatedProducts.map((item) => (
              <div key={item.id} style={{ minWidth: "200px", border: "1px solid #eaeaec", borderRadius: "6px", padding: "10px" }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={item.image.startsWith("http") ? item.image : `/${item.image}`} alt={item.item_name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px" }} />
                  <p style={{ fontWeight: "bold", margin: "10px 0 5px 0", fontSize: "14px" }}>{item.company}</p>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px 0" }}>{item.item_name}</p>
                  <p style={{ fontWeight: "bold", fontSize: "14px", margin: 0 }}>Rs {item.current_price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;