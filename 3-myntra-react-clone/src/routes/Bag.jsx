import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  
  const finalItems = bagItems.map((bagItem) => {
    const item = items.find((i) => i.id === bagItem.id);
    return { ...item, quantity: bagItem.quantity };
  }).filter(item => item.id);

  const totalItemsCount = finalItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main>
      <div className="bag-custom-page">
        
        <div className="bag-custom-header">
          <div className="bag-custom-title">
            Cart ({totalItemsCount} items)
          </div>
        </div>

        <div className="bag-custom-container">
          <div style={{ flex: "1.5" }}>
            {finalItems.map((item) => (
              <BagItem key={item.id} item={item} />
            ))}
          </div>

          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <Link to="/" style={{ textDecoration: "none", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-continue-shopping" >
                Continue Shopping
              </button>
            </Link>

            <BagSummary finalItems={finalItems} />
          </div>
        </div>

      </div>
    </main>
  );
};

export default Bag;